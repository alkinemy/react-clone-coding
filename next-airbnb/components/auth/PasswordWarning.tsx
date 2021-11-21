import styled from "styled-components";
import palette from "../../styles/palette";
import RedXIcon from "../../public/static/svg/auth/red_x_icon.svg";
import GreenCheckIcon from "../../public/static/svg/auth/green_check_icon.svg";
import React from "react";


const Container = styled.p<{ isValid: boolean }>`
  color: ${({ isValid }) =>
    isValid ? palette.green : palette.davidson_orange};
  display: flex;
  align-items: center;
  svg {
    margin-right: 8px;
  }
`;

interface IProps {
    isValid: boolean;
    text: string;
}

const PasswordWarning: React.FC<IProps> = ({ isValid, text }) => {
    return (
        <Container isValid={isValid}>
            {isValid ? <GreenCheckIcon/> : <RedXIcon/>}
            {text}
        </Container>
    );
}

export default PasswordWarning;