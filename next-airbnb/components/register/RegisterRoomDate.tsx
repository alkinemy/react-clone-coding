import styled from "styled-components";
import palette from "../../styles/palette";
import React from "react";
import DatePicker from "../common/DatePicker";
import {useSelector} from "../../store";
import {useDispatch} from "react-redux";
import {registerRoomActions} from "../../store/registerRoom";

const Container = styled.div`
  padding: 62px 30px 100px;
  h2 {
    font-size: 19px;
    font-weight: 800;
    margin-bottom: 56px;
  }
  h3 {
    font-weight: bold;
    color: ${palette.gray_76};
    margin-bottom: 6px;
  }
  label {
    span {
      display: block;
      margin-bottom: 8px;
    }
  }
  input {
    display: block;
    position: relative;
    width: 100%;
    height: 46px;
    padding: 0 11px;
    border: 1px solid ${palette.gray_eb};
    border-radius: 4px;
    font-size: 16px;
    outline: none;
    & ::placeholder {
      color: ${palette.gray_76};
    }
    & :focus {
      border-color: ${palette.dark_cyan};
    }
  }
  .register-room-date-wrapper {
    display: flex;
    align-items: center;
    .register-room-start-date {
      margin-right: 20px;
    }
    .register-room-end-date {
      margin-left: 20px;
    }
  }
`;


const RegisterRoomDate: React.FC = () => {
    const startDate = useSelector((state) => state.registerRoom.startDate);
    const endDate = useSelector((state) => state.registerRoom.endDate);
    const dateStartDate = startDate ? new Date(startDate) : null;
    const dateEndDate = endDate ? new Date(endDate) : null;
    const dispatch = useDispatch();

    const onChangeStartDate = (date: Date | null) => {
        console.log(date);
        dispatch(registerRoomActions.setStartDate(date ? date.toISOString() : null));
    };
    const onChangeEndDate = (date: Date | null) => {
        console.log(date);
        dispatch(registerRoomActions.setEndDate(date ? date.toISOString() : null));
    };
    return (
        <Container>
            <h2>예약 가능 여부 설정하기</h2>
            <h3>11단계</h3>
            <div className="register-room-date-wrapper">
                <div className="register-room-start-date">
                    <label>
                        <span>예약 시작일</span>
                        <DatePicker
                            selected={startDate ? new Date(startDate) : null}
                            onChange={onChangeStartDate}
                            monthsShown={2}
                            selectsStart
                            startDate={dateStartDate}
                            endDate={dateEndDate}
                            minDate={new Date()}
                        />
                    </label>
                </div>
                <div className="register-room-end-date">
                    <label>
                        <span>예약 마감일</span>
                        <DatePicker
                            selected={endDate ? new Date(endDate) : null}
                            onChange={onChangeEndDate}
                            monthsShown={2}
                            startDate={dateStartDate}
                            endDate={dateEndDate}
                            minDate={dateStartDate}
                        />
                    </label>
                </div>
            </div>
        </Container>
    );
};

export default RegisterRoomDate;