package de.dhuning.dlq

import com.fasterxml.jackson.databind.ObjectMapper
import org.slf4j.LoggerFactory
import org.springframework.messaging.Message
import org.springframework.web.socket.CloseStatus
import org.springframework.web.socket.TextMessage
import org.springframework.web.socket.WebSocketSession
import org.springframework.web.socket.handler.TextWebSocketHandler
import java.util.concurrent.CopyOnWriteArrayList


class WebSocketHandler(private val objectMapper: ObjectMapper) : TextWebSocketHandler() {

    private val sessions = CopyOnWriteArrayList<WebSocketSession>()


    override fun afterConnectionEstablished(session: WebSocketSession) {
        logger.debug("Opened new session in instance {}", session)
        sessions.add(session)
    }

    @Throws(Exception::class)
    override fun afterConnectionClosed(session: WebSocketSession?, status: CloseStatus?) {
        sessions.remove(session)
        logger.debug("Removed new session in instance {}", this)
    }

    @Throws(Exception::class)
    override fun handleTextMessage(session: WebSocketSession, message: TextMessage) {
        logger.debug(message.toString())
    }

    @Throws(Exception::class)
    override fun handleTransportError(session: WebSocketSession, exception: Throwable) {
        session.close(CloseStatus.SERVER_ERROR)
    }

    companion object {
        private val logger = LoggerFactory.getLogger(WebSocketHandler::class.java)
    }

    fun broadcastMessage(message: Message<*>) {
        sessions.forEach {
            it.sendMessage(TextMessage(objectMapper.writeValueAsString(message)))
        }
    }

}
