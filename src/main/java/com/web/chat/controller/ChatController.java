package com.web.chat.controller;

import com.web.chat.entities.Message;
import com.web.chat.entities.Room;
import com.web.chat.payload.MessageRequest;
import com.web.chat.repo.RoomRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@CrossOrigin("http://localhost:5173")
public class ChatController
{
    @Autowired
    private RoomRepo roomRepo;

    @MessageMapping("/sendMessage/{roomId}")
    @SendTo("/topic/room/{roomId}")
    public Message sendMessage(
            @DestinationVariable String roomId,
            @RequestBody MessageRequest request
            )
    {
        Room room = roomRepo.findByRoomId(roomId);
        Message message = new Message();
        message.setSender(request.getSender());
        message.setContent(request.getContent());
        message.setTime(LocalDateTime.now());

        if(room != null)
        {
            room.getMessages().add(message);
            roomRepo.save(room);
        }
        else
        {
            throw new RuntimeException("Room not found!!");
        }

        return message;
    }
}
