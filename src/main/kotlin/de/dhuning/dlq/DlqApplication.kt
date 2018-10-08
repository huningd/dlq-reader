package de.dhuning.dlq

import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.SerializationFeature
import com.fasterxml.jackson.databind.util.ISO8601DateFormat
import org.slf4j.LoggerFactory
import org.springframework.amqp.rabbit.annotation.RabbitListener
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.http.converter.HttpMessageConverter
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter
import org.springframework.messaging.Message
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.web.bind.annotation.*
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.util.*
import java.util.concurrent.ConcurrentHashMap


@SpringBootApplication
@RestController
@EnableWebSecurity
@CrossOrigin
class DlqApplication(private val handler: WebSocketHandler) : WebMvcConfigurer {

    internal var deadLetters: MutableMap<UUID, Message<*>> = ConcurrentHashMap()
    val log = LoggerFactory
            .getLogger(DlqApplication::class.java!!)

    @RabbitListener(queues = arrayOf("#{'\${dlq.names}'.split(',')}"))
    fun handleDlq(message: Message<*>) {
        log.info("recover " + message)
        deadLetters.put(message.headers.id, message)
        handler.broadcastMessage(message)
    }

    @GetMapping(path = arrayOf("/dlqs"))
    fun getMessages(): Flux<Message<*>> {
        log.debug("DlqApplication.getMessages")
        return Flux.fromArray(deadLetters.values.toTypedArray())
    }

    @DeleteMapping(path = arrayOf("/dlqs/{id}"))
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun delete(
            @PathVariable("id") uuid: UUID): Mono<ResponseEntity<Message<*>>> {
        log.debug("DlqApplication.delete: {}", uuid)
        deadLetters.remove(uuid)
        return Mono.just(ResponseEntity.noContent().build())
    }

    override fun configureMessageConverters(converters: MutableList<HttpMessageConverter<*>>?) {
        val builder = Jackson2ObjectMapperBuilder()
        builder.failOnUnknownProperties(true)
        builder.featuresToDisable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS,
                SerializationFeature.WRITE_NULL_MAP_VALUES)
        builder.serializationInclusion(JsonInclude.Include.NON_NULL)
        builder.serializationInclusion(JsonInclude.Include.NON_EMPTY)
        builder.dateFormat(ISO8601DateFormat())
        builder.featuresToDisable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS,
                SerializationFeature.WRITE_NULL_MAP_VALUES)
        converters!!.add(MappingJackson2HttpMessageConverter(builder.build<ObjectMapper>()))
    }

}

fun main(args: Array<String>) {
    SpringApplication.run(DlqApplication::class.java, *args)
}



