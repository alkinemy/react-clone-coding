import styled, { css } from "styled-components";
import React from "react";
import palette from "../../styles/palette";

const getButtonSize = (size: "small" | "medium") => {
    switch (size) {
        case "medium":
            return css`
                height: 48px;
            `;
        case "small":
            return css`
                font-size: 14px;
              height: 36px;
            `
        default:
            return "";
    }
};

const getButtonColor = (color: string, colorReverse: boolean) => {
    if (colorReverse) {
        switch (color) {
            case "dark_cyan":
                return css`
                    background-color: white;
                    color: ${palette.dark_cyan};
                    border: 2px solid ${palette.dark_cyan};
                `;
            default:
                return css`
                    background-color: white;
                    border: 2px solid ${palette.bittersweet};
                    color: ${palette.bittersweet};
                `;
        }
    }
    switch (color) {
        case "dark_cyan":
            return css`
                background-color: ${palette.dark_cyan};
                color: white;
            `;
        case "bittersweet":
            return css`
                background-color: ${palette.bittersweet};
                color: white;
            `;
        case "amaranth":
            return css`
                background-color: ${palette.amaranth};
                color: white;
            `;
        default:
            return css`
                background-color: white;
                color: ${palette.black};
                border: 1px solid ${palette.gray_c4};
            `;
    }
};


interface StyledButtonProps {
    width: string | undefined;
    colorReverse: boolean;
    size: "small" | "medium";
}


const Container = styled.button<StyledButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.width};
  height: 48px;
  padding: 0 15px;
  border: 0;
  border-radius: 4px;
  font-size: 18px;
  font-weight: 700;
  outline: none;
  cursor: pointer;
  ${(props) => getButtonColor(props.color || "", !!props.colorReverse)}
  ${(props) => getButtonSize(props.size)}
  svg {
    margin-right: 12px;
  }
`;


interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    color?: "dark_cyan" | "white" | "bittersweet";
    width?: string;
    colorReverse?: boolean;
    icon?: JSX.Element;
    size?: "small" | "medium";
}

const Button: React.FC<IProps> = ({
    children,
    color,
    width,
    colorReverse = false,
    icon,
    size = "medium",
    ...props
}) => {
    return (
        <Container
            {...props}
            color={color}
            width={width}
            colorReverse={colorReverse}
            size={size}
        >
            {icon}
            {children}
        </Container>
    );
}

export default React.memo(Button);