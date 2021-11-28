import {readFileSync, writeFileSync} from "fs";
import {StoredReservation} from "../../types/reservation";


const getList = () => {
    const reservationsBuffer = readFileSync("data/reservations.json");
    const reservationsString = reservationsBuffer.toString();
    if (!reservationsString) {
        return [];
    }
    const reservations: StoredReservation[] = JSON.parse(reservationsString);
    return reservations;
}

const exist = (reservationId: number) => {
    const reservations = getList();
    return reservations.some((room) => room.id === reservationId);
};

const find = (reservationId: number) => {
    const reservations = getList();
    return reservations.find((room) => room.id === reservationId);
};

const write = (reservations: StoredReservation[]) => {
    writeFileSync("data/reservations.json", JSON.stringify(reservations));
};

export default {getList, exist, write, find};