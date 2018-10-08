package de.dhuning.dlq.config

import com.fasterxml.jackson.databind.ObjectMapper
import de.dhuning.dlq.WebSocketHandler
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.socket.config.annotation.EnableWebSocket
import org.springframework.web.socket.config.annotation.WebSocketConfigurer
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor


@Configuration
@EnableWebSocket
class WebSocketConfig {

    @Bean
    fun webSocketConfigurer(echoWebSocketHandler: WebSocketHandler): WebSocketConfigurer {
        return WebSocketConfigurer { registry -> registry.addHandler(echoWebSocketHandler, "/ws/dlq-messages").addInterceptors(HttpSessionHandshakeInterceptor()).setAllowedOrigins("*"); }
    }

    @Bean
    fun echoWebSocketHandler(objectMapper: ObjectMapper): WebSocketHandler {
        return WebSocketHandler(objectMapper)
    }

}
