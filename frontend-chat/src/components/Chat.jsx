import React, { useEffect, useRef, useState } from 'react'
import { MdExitToApp, MdSend } from 'react-icons/md';
import useChatContext from "../context/ChatContext";
import { useNavigate } from 'react-router';
import SockJS from 'sockjs-client';
import { baseURL } from '../config/AxiosHelper';
import { Stomp } from '@stomp/stompjs';
import toast from 'react-hot-toast';
import { getMessagesApi } from '../services/RoomService';
import { timeAgo } from '../config/helper';


const Chat = () => {

    const {
        roomId,
        currentUser,
        connection,
        setConnection,
        setRoomId,
        setCurrentUser,
      } = useChatContext();


    const navigate = useNavigate();
    useEffect(() => {
        if(!connection) 
            navigate('/');
        
    }, [connection, roomId, currentUser]);

    useEffect(() => {
        async function loadMessages() {
            try {
                const messages = await getMessagesApi(roomId);
                //console.log("Messages: ", messages);
                setMessage(messages);
            } catch (error) {
                
            }
        
        }

        if(connection)
        {
            loadMessages();
        }

    }, []);


const [message, setMessage] = useState([]);
const [input, setInput] = useState("");
const inputMessage = useRef(null);
const chatBoxMessage = useRef(null);
const [stompClient, setStompClient] = useState(null);


///Subcribing messages/chat messages
useEffect(() => {
    const connectWebSocket = () => {
        const sock = new SockJS(`${baseURL}/chat`);
        const client = Stomp.over(sock);
    
        client.connect({}, () => {
            setStompClient(client);
            console.log(roomId);
            client.subscribe(`/topic/room/${roomId}`, (message) => 
                { ///Will Connect to backend on ChatController(@SendTo).
                
                console.log("Received message: ", message);
                const newMessage = JSON.parse(message.body);
                if (newMessage && newMessage.sender && newMessage.content) {
                    setMessage((prev) => [...prev, newMessage]);
                } else {
                    console.error("Invalid message format:", newMessage);
                    toast.error("Invalid message format!");
                }
            });
        });
    };
    if (connection) {
        connectWebSocket();
      }
},[roomId]);


useEffect(() => {
    // Scroll to bottom whenever messages change
    if (chatBoxMessage.current) {
      chatBoxMessage.current.scrollTop = chatBoxMessage.current.scrollHeight;
    }
  }, [message]);
//Send Message

const sendMessage = async () => {
    if(stompClient && input.trim())
    {
        console.log(input);

        const message = {
            sender: currentUser,
            content: input,
            roomId: roomId
        }
        
        stompClient.send(`/app/sendMessage/${roomId}`,{}, JSON.stringify(message));
        setInput("");
    }
}; 


function handleLogout()
{
    stompClient.disconnect();
    setConnection(false);
    setRoomId('');
    setCurrentUser('');
    toast.error("Disconnected");
    navigate('/');
}


  return (
    <div className="">

            <header className="flex justify-around py-5 fixed w-full dark:bg-slate-900 dark:border-gray-900 border">
                {/* Room ID */}
                <div>
                    <h1 className="text-xl font-semibold">
                        Room Id : <span>{roomId}</span>
                    </h1>
                </div>

                {/* User - Name */}
                <div>
                    <h1 className="text-xl font-semibold">
                        User Name : <span>{currentUser}</span>
                    </h1>
                </div>

                {/* Leave Room - Button */}
                <div className="">
                    <button onClick={handleLogout} className="dark:bg-red-900 dark:hover:bg-red-700 px-3  py-2 rounded-md cursor-not-allowed">
                        < MdExitToApp size={20}/>
                    </button>
                </div>
            </header>

            <main ref={chatBoxMessage} className="py-20 px-10 w-2/3 dark:bg-gray-800 mx-auto h-screen overflow-auto">
                {
                    message.map((message, index) => (
                        <div key={index} className={
                            `flex ${message.sender === currentUser ? "justify-end" : "justify-start"}`
                        }>
                            <div className={` dark:text-white my-2 ${message.sender === currentUser ? "bg-blue-900" : "bg-black"} max-w-xs rounded p-2 `}>
                                <p className="text-sm dark:text-gray-400 font-bold">{message.sender}</p>
                                <hr />
                                <p >{message.content} </p>
                                <p className="text-xs dark:text-gray-400 font-semibold">{timeAgo(message.time)}</p>  {/* Display time */}
                            </div>
                        </div>
                        
                    ))
                }
            </main>

        <div className="fixed bottom-2 w-full h-16 ">
            <div className="h-full px-10 w-2/3 gap-5 flex items-center justify-between bg-slate-900 rounded mx-auto">
                <input type="text" name="message"
                value = {input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={(e) => 
                    {
                        if(e.key === "Enter")
                        {
                            sendMessage();
                        }
                    }}
                placeholder="Type your message here...."
                className="focus:outline-none w-full dark:bg-gray-900 px-1 py-2 h-full"/>

                <button onClick={sendMessage} className="dark:bg-green-900 px-3 py-3 mx-auto rounded" name="sendMessage">
                    <MdSend size={20}/>
                </button>
            </div>
        </div>
    </div>
  );
};

export default Chat;