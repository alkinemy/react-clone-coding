import {NextApiRequest, NextApiResponse} from "next";
import Data from "../../../lib/data";
import isEmpty from "lodash/isEmpty";
import {StoredRoomType} from "../../../types/room";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        const {
            checkInDate,
            checkOutDate,
            adultCount,
            childrenCount,
            latitude,
            longitude,
            limit,
            page = "1",
        } = req.query;
        try {
            const rooms = Data.room.getList();
            const filteredRooms = rooms.filter((room) => {
                if (latitude && latitude !== "0" && longitude && longitude !== "0") {
                    if (!(
                        Number(latitude) - 0.5 < room.latitude &&
                        room.latitude < Number(latitude) + 0.05 &&
                        Number(longitude) - 0.5 < room.longitude &&
                        room.longitude < Number(longitude) + 0.05
                    )) {
                        return false;
                    }
                }
                if (checkInDate) {
                    if (
                        new Date(checkInDate as string) < new Date(room.startDate) ||
                        new Date(checkInDate as string) > new Date(room.endDate)
                    ) {
                        return false;
                    }
                }

                if (checkOutDate) {
                    if (
                        new Date(checkOutDate as string) < new Date(room.startDate) ||
                        new Date(checkOutDate as string) > new Date(room.endDate)
                    ) {
                        return false;
                    }
                }
                if (
                    room.maximumGuestCount < Number(adultCount as string)
                    + (Number(childrenCount as string) * 0.5 || 0)
                ) {
                    return false;
                }
                return true;
            });
            const limitedRooms = filteredRooms.splice((Number(page) - 1) * Number(limit), Number(limit));
            const roomsWithHost = await Promise.all(
                limitedRooms.map(async (room) => {
                    const host = Data.user.find({id: room.hostId});
                    return {...room, host};
                })
            );
            res.statusCode = 200;
            return res.send(roomsWithHost);
        } catch(e) {
            console.log(e);
        }
    }
    if (req.method === "POST") {
        try {
            const {
                largeBuildingType, buildingType, roomType, isSetUpForGuest, maximumGuestCount,
                bedroomCount, bedCount, bedList, publicBedList, bathroomCount, bathroomType,
                latitude, longitude, country, city, district, streetAddress, detailAddress,
                postcode, amenities, conveniences, photos, description, title, price,
                startDate, endDate, hostId,
            } = req.body;
            if (
                !largeBuildingType
                || !buildingType
                || !roomType
                || isSetUpForGuest  === null
                || !maximumGuestCount
                || !bedroomCount
                || !bedCount
                || !bedList
                || !publicBedList
                || !bathroomCount
                || bathroomType === null
                || !latitude
                || !longitude
                || !country
                || !city
                || !district
                || !streetAddress
                || (detailAddress !== "" && !detailAddress)
                || !postcode
                || !amenities
                || !conveniences
                || !photos
                || !description
                || !title
                || !price
                || !startDate
                || !endDate
                || !hostId
            ) {
                res.statusCode = 400;
                return res.send("필수 값이 없습니다.");
            }
            const rooms = Data.room.getList();
            if (isEmpty(rooms)) {
                const newRoom: StoredRoomType = {
                    id: 1,
                    ...req.body,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };
                Data.room.write([newRoom]);
                res.statusCode = 201;
                return res.end();
            }

            const newRoom: StoredRoomType = {
                id: rooms[rooms.length - 1].id + 1,
                ...req.body,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            Data.room.write([...rooms, newRoom]);
            res.statusCode = 201;
            return res.end();
        } catch (e) {
            console.log(e);
            return res.send(e.message);
        }
    }
    res.statusCode = 405;
    return res.end();
}