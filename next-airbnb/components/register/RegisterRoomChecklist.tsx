import styled from "styled-components";
import React, {useMemo} from "react";
import {useSelector} from "../../store";
import isEmpty from "lodash/isEmpty";
import RegisterRoomCheckStep from "./RegisterRoomCheckStep";
import RegisterRoomFooter from "./RegisterRoomFooter";
import RegisterRoomSubmitFooter from "./RegisterRoomSubmitFooter";

const Container = styled.div`
  padding: 62px 30px 100px;
  min-height: 100vh;
  .register-room-checklist-info {
    margin-bottom: 39px;
  }
  ul {
    display: inline-flex;
    flex-direction: column;
  }
`;

const RegisterRoomChecklist: React.FC = () => {
    const registerRoom = useSelector((state) => state.registerRoom);

    const isBuildingTypeActivated = useMemo(() => {
        const {
            largeBuildingType,
            buildingType,
            roomType,
            isSetUpForGuest,
        } = registerRoom;
        if (!largeBuildingType || !buildingType || !roomType || !isSetUpForGuest) {
            return false;
        }
        return true;
    }, []);

    const isRoomTypeActivated = useMemo(() => {
        const {
            maximumGuestCount,
            bedroomCount,
            bedCount,
            bedList,
            publicBedList,
        } = registerRoom;
        if (!isBuildingTypeActivated || !maximumGuestCount || !bedroomCount || !bedCount) {
            return false;
        }
        return true;
    }, []);

    const isBathroomActivated = useMemo(() => {
        const {bathroomCount, bathroomType} = registerRoom;
        if (!isRoomTypeActivated || !bathroomCount || bathroomType === null) {
            return false;
        }
        return true;
    }, []);

    const isLocationActivated = useMemo(() => {
        const {
            latitude,
            longitude,
            country,
            city,
            district,
            streetAddress,
            detailAddress,
            postcode,
        } = registerRoom;
        if (!isBathroomActivated || !latitude || !longitude || !country || !city || !district || !streetAddress || !postcode) {
            return false;
        }
        return true;
    }, []);

    const isAmenitiesActivated = useMemo(() => {
        const {amenities} = registerRoom;
        if (!isLocationActivated) {
            return false;
        }
        return true;
    }, []);

    const isConveniencesActivated = useMemo(() => {
        if (!isAmenitiesActivated) {
            return false;
        }
        return true;
    }, []);

    const isPhotoActivated = useMemo(() => {
        const {photos} = registerRoom;
        if (!isConveniencesActivated || isEmpty(photos)) {
            return false;
        }
        return true;
    }, []);

    const isDescriptionActivated = useMemo(() => {
        const {description} = registerRoom;
        if (!isPhotoActivated || !description) {
            return false;
        }
        return true;
    }, []);

    const isTitleActivated = useMemo(() => {
        const {title} = registerRoom;
        if (!isDescriptionActivated || !title) {
            return false;
        }
        return true;
    }, []);

    const isPriceActivated = useMemo(() => {
        const {price} = registerRoom;
        if (!isTitleActivated || !price) {
            return false;
        }
        return true;
    }, []);

    const isDateActivated = useMemo(() => {
        const {startDate, endDate} = registerRoom;
        if (!isPriceActivated || !startDate || !endDate) {
            return false;
        }
        return true;
    }, []);

    const stepInProgress = useMemo(() => {
        if (!isBuildingTypeActivated) {
            return "building";
        }
        if (!isRoomTypeActivated) {
            return "bedrooms";
        }
        if (!isBathroomActivated) {
            return "bathroom";
        }
        if (!isLocationActivated) {
            return "location";
        }
        if (!isAmenitiesActivated) {
            return "amenities";
        }
        if (!isConveniencesActivated) {
            return "conveniences";
        }
        if (!isPhotoActivated) {
            return "photo";
        }
        if (!isDescriptionActivated) {
            return "description";
        }
        if (!isTitleActivated) {
            return "title";
        }
        if (!isPriceActivated) {
            return "price";
        }
        if (!isDateActivated) {
            return "date";
        }
        return "";
    }, []);

    return (
        <Container>
            <p className="register-room-checklist-info">
                ????????? ????????? ??? ????????? ????????? ????????? ??? ????????????.
            </p>
            <ul>
                <RegisterRoomCheckStep
                    step="?????? ??????"
                    href="/room/register/building"
                    disabled={!isBuildingTypeActivated}
                    inProgress={stepInProgress === "building"}
                />
                <RegisterRoomCheckStep
                    step="?????? ??????"
                    href="/room/register/bedrooms"
                    disabled={!isRoomTypeActivated}
                    inProgress={stepInProgress === "bedrooms"}
                />
                <RegisterRoomCheckStep
                    step="??????"
                    href="/room/register/bathroom"
                    disabled={!isBathroomActivated}
                    inProgress={stepInProgress === "bathroom"}
                />
                <RegisterRoomCheckStep
                    step="??????"
                    href="/room/register/location"
                    disabled={!isLocationActivated}
                    inProgress={stepInProgress === "location"}
                />
                <RegisterRoomCheckStep
                    step="?????? ??????"
                    href="/room/register/amenities"
                    disabled={!isAmenitiesActivated}
                    inProgress={stepInProgress === "amenities"}
                />
                <RegisterRoomCheckStep
                    step="????????????"
                    href="/room/register/conveniences"
                    disabled={!isConveniencesActivated}
                    inProgress={stepInProgress === "conveniences"}
                />
                <RegisterRoomCheckStep
                    step="??????"
                    href="/room/register/photo"
                    disabled={!isPriceActivated}
                    inProgress={stepInProgress === "photo"}
                />
                <RegisterRoomCheckStep
                    step="??????"
                    href="/room/register/description"
                    disabled={!isDescriptionActivated}
                    inProgress={stepInProgress === "description"}
                />
                <RegisterRoomCheckStep
                    step="??????"
                    href="/room/register/title"
                    disabled={!isTitleActivated}
                    inProgress={stepInProgress === "title"}
                />
                <RegisterRoomCheckStep
                    step="??????"
                    href="/room/register/price"
                    disabled={!isPriceActivated}
                    inProgress={stepInProgress === "price"}
                />
                <RegisterRoomCheckStep
                    step="?????? ??????"
                    href="/room/register/date"
                    disabled={!isDateActivated}
                    inProgress={stepInProgress === "date"}
                />
            </ul>
            {isDateActivated ? (
                <RegisterRoomSubmitFooter/>
            ) : (
                <RegisterRoomFooter
                    prevHref="/room/register/date"
                    nextHref={`/room/register/${stepInProgress}`}
                />
            )}
        </Container>
    );
};

export default RegisterRoomChecklist;