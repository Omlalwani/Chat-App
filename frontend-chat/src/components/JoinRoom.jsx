import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { createRoomApi, joinRoomApi } from '../services/RoomService';
import useChatContext from '../context/ChatContext';
import { useNavigate } from 'react-router';
const JoinRoom = () => {

  const [detail, setDetail] = useState({
    roomId : "",
    userName : ""
  });

  const {roomId, userName, connection, setRoomId, setCurrentUser, setConnection} = useChatContext();
  const navigate = useNavigate();  
  
    function handleForm(event) {
      setDetail({
        ...detail, 
        [event.target.name] : event.target.value,
      });
    }

  function validateForm() {
    if(detail.userName === "" || detail.roomId === ""){
      toast.error("Please enter Name and room id!");
      return false;
    }
    return true;
  }
  
  async function joinRoom(){
    // API call to join room
    if(validateForm())
      {
        try {
          const room = await joinRoomApi(detail.roomId);
          toast.success("Connected to room!");
          setCurrentUser(detail.userName);
          setRoomId(detail.roomId);
          setConnection(true);
          navigate('/chat');
        } catch (error) {
          if(error.status === 400)
          {
            toast.error(error.response.data);
          }
          console.log(error);
        }
      }
    console.log("Joining room : ", detail.roomId);
  }

  async function createRoom(){
    // API call to join room
    if(validateForm())
    {
      console.log(detail);
      try {
        const response = await createRoomApi(detail.roomId);
        toast.success("Room created successfully!");
        console.log(response);

        setCurrentUser(detail.userName);
        setRoomId(response.roomId);
        setConnection(true);
        navigate('/chat');
        joinRoom();
      } catch (error) {
        if(error.status === 400)
          toast.error("Room already exists!");
        else if(error.status === 403)
        toast.error("Error creating room");
      }
    }
  
    console.log("Creating room : ", detail.roomId);
    // API call to join room
  }

  return (
    <div className="min-h-screen flex items-center justify-center  text-2xl">
      <div className="p-12 w-full flex flex-col gap-5 max-w-md rounded-lg dark:bg-gray-800 dark:border-gray-600 border shadow-2xl">
        <h1 className = "text-3xl font-semibold text-center dark:text-slate-500">
          Join / Create Room</h1>
          <hr></hr>

        {/* Name input */}
        <div className="">
          <label htmlFor="name" className = "block font-medium text-lg mb-2">
            Your Name
          </label>
          <input 
          onChange={handleForm} value={detail.userName}
            type="text"  name="userName" 
            className="p-3 w-full text-xl border rounded-md focus:outline-none focus:ring-2 focus:outline-blue-900 focus:rounded-xl dark:bg-gray-800" />
          </div>

          {/* Room Id input */}
          <div className="">
              <label htmlFor="roomId" className = "block font-medium text-lg mb-2">
                Room Id
              </label>
              <input 
               onChange={handleForm} value={detail.roomId}
              type="text" id="roomId" name="roomId" 
              className="p-3 w-full text-lg border rounded-md focus:outline-none focus:ring-2 focus:outline-blue-900 focus:rounded-xl dark:bg-gray-800" />
            </div>

          {/* Join button */}
          <div className="flex justify-center gap-3 mt-4">
            <button
            onClick={joinRoom}
            className="w-full px-3 py-2 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:outline-blue-900 focus:rounded-xl dark:bg-blue-700">
              Join Room
            </button>

            {/* Create button */}
            <button onClick={createRoom}
            className="w-full px-3 py-2 text-lg font-semibold text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:outline-green-500 focus:rounded-xl dark:bg-green-700">
              Create Room
            </button>
          </div>
      </div>   
    </div>
  )
}

export default JoinRoom;