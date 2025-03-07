package com.web.chat.entities;


import java.time.LocalDateTime;

public class Message
{
    private String sender;
    private String content;
    private LocalDateTime time;

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    public Message(String sender, String content) {
        this.sender = sender;
        this.content = content;
        this.time = LocalDateTime.now();
    }

    public Message() {
        this.time = LocalDateTime.now();
    }
}
