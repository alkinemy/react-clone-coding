import {readFileSync, writeFileSync} from "fs";
import {StoredRoomType} from "../../types/room";


const getList = () => {
    const roomsBuffer = readFileSync("data/rooms.json");
    const roomsString = roomsBuffer.toString();
    if (!roomsString) {
        return [];
    }
    const rooms: StoredRoomType[] = JSON.parse(roomsString);
    return rooms;
}

const exist = (roomId: number) => {
    const rooms = getList();
    return rooms.some((room) => room.id === roomId);
};

const find = (roomId: number) => {
    const rooms = getList();
    return rooms.find((room) => room.id === roomId);
};

const write = (rooms: StoredRoomType[]) => {
    writeFileSync("data/rooms.json", JSON.stringify(rooms));
};

export default {getList, exist, write, find};