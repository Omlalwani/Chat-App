
import {httpClient} from "../config/AxiosHelper";

export const createRoomApi = async (roomDetail) => 
{
    const response = await httpClient.post('/api/rooms/createRoom', roomDetail, {headers: {"Content-Type": "text/plain"}});

    return response.data;
}

export const joinRoomApi = async (roomId) => {
    const response = await httpClient.get(`/api/rooms/joinRoom/${roomId}`);
    return response.data;
}

export const getMessagesApi = async (roomId, size=50, page=0) => {
    const response = await httpClient.get(`/api/rooms/messages/${roomId}?size=${size}&page=${page}`);
    return response.data;
}