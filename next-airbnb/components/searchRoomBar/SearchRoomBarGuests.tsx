import styled from "styled-components";
import palette from "../../styles/palette";
import React, {useState} from "react";
import {useSelector} from "../../store";
import OutsideClickHandler from "react-outside-click-handler";
import Counter from "../common/Counter";
import SearchRoomButton from "./SearchRoomButton";
import {useDispatch} from "react-redux";
import {searchRoomActions} from "../../store/searchRoom";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 70px;
  border: 2px solid transparent;
  border-radius: 12px;
  cursor: pointer;
  &:hover {
    border-color: ${palette.gray_dd};
  }
  > div {
    width: 100%;
    height: 100%;
  }
  .search-room-bar-guests-texts {
    position: absolute;
    width: calc(100% - 114px);
    top: 16px;
    left: 20px;
  }
  .search-room-bar-guests-label {
    font-size: 10px;
    font-weight: 800;
    margin-bottom: 4px;
  }
  .search-room-bar-guests-popup {
    position: absolute;
    width: 394px;
    top: 78px;
    right: 0;
    padding: 16px 32px;
    background-color: white;
    border-radius: 32px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 6px 20px;
    cursor: default;
  }
  .search-room-bar-guests-counter-wrapper {
    padding: 16px 0;
    border-bottom: 1px solid ${palette.gray_eb};
    &:last-child {
      border: 0;
    }
  }
  .search-room-bar-guests-text {
    font-size: 14px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .search-room-bar-button-wrapper {
    position: absolute;
    right: 0;
    top: 12px;
    right: 12px;
  }
`;


const SearchRoomBarGuests: React.FC = () => {
    const [popupOpened, setPopupOpened] = useState(false);
    const adultCount = useSelector((state) => state.searchRoom.adultCount);
    const childrenCount = useSelector((state) => state.searchRoom.childrenCount);
    const infantsCount = useSelector((state) => state.searchRoom.infantsCount);
    const dispatch = useDispatch();
    const setAdultDispatch = (value: number) => {
        dispatch(searchRoomActions.setAdultCount(value));
    }
    const setChildrenCount = (value: number) => {
        dispatch(searchRoomActions.setChildrenCount(value));
    }
    const setInfantsCount = (value: number) => {
        dispatch(searchRoomActions.setInfantsCount(value));
    }
    return (
        <Container onClick={() => setPopupOpened(true)}>
            <OutsideClickHandler onOutsideClick={() => setPopupOpened(false)}>
                <div className="search-room-bar-guests-texts">
                    <p className="search-room-bar-guest-label">인원</p>
                    <p className="search-room-bar-guest-test">
                        성인 {adultCount}명
                        {(childrenCount !== 0) && (
                            <>
                                <br/>어린이 {childrenCount}명
                            </>
                        )}
                        {(infantsCount !== 0) && (
                            <>
                                <br/>유아 {infantsCount}명
                            </>
                        )}
                    </p>
                </div>
                <div className="search-room-bar-button-wrapper">
                    <SearchRoomButton/>
                </div>
                {popupOpened && (
                    <div className="search-room-bar-guests-popup">
                        <div className="search-room-bar-guests-counter-wrapper">
                            <Counter
                                label="성인"
                                description="만 13세 이상"
                                minValue={1}
                                value={adultCount}
                                onChange={(count) => setAdultDispatch(count)}
                            />
                        </div>
                        <div className="search-room-bar-guests-counter-wrapper">
                            <Counter
                                label="어린이"
                                description="2~12세"
                                value={childrenCount}
                                onChange={(count) => setChildrenCount(count)}
                            />
                        </div>
                        <div className="search-room-bar-guests-counter-wrapper">
                            <Counter
                                label="유아"
                                description="2세 미만"
                                value={infantsCount}
                                onChange={(count) => setInfantsCount(count)}
                            />
                        </div>
                    </div>
                )}
            </OutsideClickHandler>
        </Container>
    );
};

export default SearchRoomBarGuests;