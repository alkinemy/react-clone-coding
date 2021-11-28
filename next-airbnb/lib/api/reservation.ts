import axios from "./index";

type MakeReservationAPIBody = {
    userId: number;
    checkInDate: string;
    checkOutDate: string;
    adultCount: number;
    childrenCount: number;
    infantsCount: number;
}

export const makeReservationAPI = (body: MakeReservationAPIBody) => axios.post("/api/reservations", body);