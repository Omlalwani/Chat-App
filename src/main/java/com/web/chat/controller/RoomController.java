package com.web.chat.controller;

import com.web.chat.entities.Message;
import com.web.chat.entities.Room;
import com.web.chat.repo.RoomRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/api/rooms")
@CrossOrigin("http://localhost:5173")
public class RoomController
{
    @Autowired
    private RoomRepo roomRepo;

    /*public RoomController(RoomRepo roomRepo)
    {
        this.roomRepo = roomRepo;
    }*/

    @PostMapping("/createRoom")
    public ResponseEntity<?> createRoom(@RequestBody String roomId)
    {
        if(roomRepo.findByRoomId(roomId) != null)
        {
            return ResponseEntity.badRequest().body("Room already exists...");
        }

        Room room = new Room();
        room.setRoomId(roomId);

        Room savedRoom = roomRepo.save(room);
        return ResponseEntity.status(HttpStatus.CREATED).body(room);
    }

    @GetMapping("/joinRoom/{roomId}")
    public ResponseEntity<?> joinRoom(@PathVariable String roomId)
    {
        Room room = roomRepo.findByRoomId(roomId);
        if(room == null)
        {
            return ResponseEntity.badRequest().body("Room not found....");
        }

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(roomId + " Joined Successfully....");
    }

    @PostMapping("/sendMessage/{roomId}")
    public ResponseEntity<Room> sendMessage(@PathVariable String roomId)
    {
        List<Message> message = new ArrayList<>();
        Room room = roomRepo.findByRoomId(roomId);
        if(room == null)
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }


        room.getMessages().addAll(message);
        roomRepo.save(room);

        return ResponseEntity.ok(room);
    }


    @GetMapping("/messages/{roomId}")
    public ResponseEntity<List<Message>> getMessages
            (
                    @PathVariable String roomId,
                    @RequestParam(value = "page", defaultValue = "0", required = false) int page,
                    @RequestParam(value = "size", defaultValue = "20", required = false) int size)
    {
        Room room = roomRepo.findByRoomId(roomId);
        if(room == null)
        {
            return ResponseEntity.badRequest().build();
        }

        List<Message> messages = room.getMessages();


        int start = Math.max(0, messages.size() - (page+1)*size);
        int end = Math.min(messages.size(), start+size);

        List<Message> paginatedMessages = new ArrayList<>();
        paginatedMessages = messages.subList(start, end);
        return ResponseEntity.ok(paginatedMessages);
    }
}
