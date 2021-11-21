import styled from "styled-components";
import React from "react";
import palette from "../../styles/palette";

const Container = styled.button`
  width: 100%;
  height: 48px;
  border: 0;
  border-radius: 4px;
  background-color: ${palette.bittersweet};
  color: white;
  font-size: 16px;
  font-weight: 800;
  outline: none;
  cursor: pointer;
`;

interface ButtonType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

function Button({children, ...props}: ButtonType) {
    return <Container {...props}>{children}</Container>;
}

export default Button;