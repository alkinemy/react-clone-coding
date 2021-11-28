import {NextPage} from "next";
import RoomListPage from "../../components/room/main/RoomListPage";
import {getRoomListAPI} from "../../lib/api/room";
import {wrapper} from "../../store";
import {roomActions} from "../../store/room";

const index: NextPage = () => {
    return <RoomListPage/>;
}


index.getInitialProps = wrapper.getInitialPageProps((store) => async ({query}) => {
    const {
        checkInDate,
        checkOutDate,
        adultCount,
        childrenCount,
        latitude,
        longitude,
        limit,
        page = "1",
    } = query;
    try {
        const {data} = await getRoomListAPI({
            checkInDate,
            checkOutDate,
            adultCount,
            childrenCount,
            latitude,
            longitude,
            limit: limit || "20",
            page: page || "1",
            location: query.location ? encodeURI(query.location as string) : undefined,
        });
        store.dispatch(roomActions.setRooms(data))
    } catch (e) {
        console.log(e);
    }
});

export default index;