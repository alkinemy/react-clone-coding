import axios from "./index";
import { Coordinates } from "../../types/map";

type GetLocationInfoAPIResponse = {
    country: string;
    city: string;
    district: string;
    streetAddress: string;
    detailAddress: string;
    postcode: string;
    latitude: number;
    longitude: number;
};

export const getLocationInfoAPI = async ({latitude, longitude}: Coordinates) =>
    axios.get<GetLocationInfoAPIResponse>(`/api/maps/location?latitude=${latitude}&longitude=${longitude}`)