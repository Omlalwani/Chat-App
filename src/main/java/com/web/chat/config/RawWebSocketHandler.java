package com.web.chat.config;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
public class RawWebSocketHandler extends TextWebSocketHandler {

    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
        session.sendMessage(new TextMessage("Server received: " + message.getPayload()));
    }
}
