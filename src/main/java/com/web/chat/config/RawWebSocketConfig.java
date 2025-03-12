package com.web.chat.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class RawWebSocketConfig implements WebSocketConfigurer
{

    @Bean
    public RawWebSocketHandler rawWebSocketHandler() {
        return new RawWebSocketHandler();
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
            registry.addHandler(rawWebSocketHandler(), "/ws-test")
                    .setAllowedOrigins("*");

    }
}
