import dynamic from "next/dynamic";
import { NextPage } from "next";


const RegisterRoomGeometry = dynamic(
    import("../../../components/register/RegisterRoomGeometry"),
    { ssr: false }
);

const geometry: NextPage = () => {
    return <RegisterRoomGeometry/>;
}

export default geometry;