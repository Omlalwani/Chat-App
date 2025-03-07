import { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const ChatProvider = ({children}) => {
    const [roomId, setRoomId] = useState("");
    const [currentUser, setCurrentUser] = useState("");
    const [connection, setConnection] = useState(false);

    return (
        <ChatContext.Provider value={{ roomId, currentUser, connection,setRoomId, setCurrentUser, setConnection }}>
            {children}
        </ChatContext.Provider>
    );
};

const useChatContext = () => useContext(ChatContext);

export default useChatContext;