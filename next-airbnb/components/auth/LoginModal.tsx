import styled from "styled-components";
import palette from "../../styles/palette";
import React, { useEffect, useState } from "react";
import CloseXIcon from "../../public/static/svg/modal/modal_close_x_icon.svg";
import ClosedEyeIcon from "../../public/static/svg/auth/closed_eye.svg";
import MailIcon from "../../public/static/svg/auth/mail.svg";
import OpenedEyeIcon from "../../public/static/svg/auth/opened_eye.svg";
import Input from "../common/Input";
import Button from "../common/Button";
import { loginAPI } from "../../lib/api/auth";
import useValidateMode from "../../hooks/useValidateMode";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user";


const Container = styled.form`
  width: 568px;
  padding: 32px;
  background-color: white;
  z-index: 11;
  .modal-close-x-icon {
    cursor: pointer;
    display: block;
    margin: 0 0 40px auto;
  }
  .login-input-wrapper {
    position: relative;
    margin-bottom: 16px;
  }
  .login-password-input-wrapper {
    svg {
      cursor: pointer;
    }
  }
  .login-modal-submit-button-wrapper {
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid ${palette.gray_eb};
  }
  .login-modal-set-signup {
    color: ${palette.dark_cyan};
    margin-left: 8px;
    cursor: pointer;
  }
`;

interface IProps {
    closeModal: () => void;
}

const LoginModal: React.FC<IProps> = ({closeModal}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hidePassword, setHidePassword] = useState(true);
    const {setValidateMode} = useValidateMode();
    const dispatch = useDispatch();

    const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };
    const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };
    const toggleHidePassword = () => {
        setHidePassword(!hidePassword);
    };

    const onSubmitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setValidateMode(true);
        if (!email || !password) {
            alert("???????????? ??????????????? ??????????????????.");
        } else {
            const loginBody = {email, password};
            try {
                const {data} = await loginAPI(loginBody);
                dispatch(userActions.setLoggedUser(data));
                closeModal();
            } catch (e) {
                console.log(e);
            }
        }
    };

    useEffect(() => {
        return () => {
            setValidateMode(false);
        }
    }, []);

    return (
        <Container onSubmit={onSubmitLogin}>
            <CloseXIcon className="modal-close-x-icon" onClick={closeModal}/>
            <div className="login-input-wrapper">
                <Input
                    placeholder="????????? ??????"
                    name="email"
                    type="email"
                    value={email}
                    onChange={onChangeEmail}
                    isValid={email !== ""}
                    errorMessage="???????????? ???????????????."
                    icon={<MailIcon/>}
                />
            </div>
            <div className="login-input-wrapper login-password-input-wrapper">
                <Input
                    placeholder="???????????? ????????????"
                    name="password"
                    type={hidePassword ? "password" : "text"}
                    value={password}
                    onChange={onChangePassword}
                    isValid={password !== ""}
                    errorMessage="??????????????? ???????????????."
                    icon={
                        hidePassword ? (
                            <ClosedEyeIcon onClick={toggleHidePassword}/>
                        ) : (
                            <OpenedEyeIcon onClick={toggleHidePassword}/>
                        )
                    }
                />
            </div>
            <div className="login-modal-submit-button-wrapper">
                <Button color={"bittersweet"} type="submit">?????????</Button>
            </div>
            <p>
                ?????? ??????????????? ????????? ??????????
                <span className="login-modal-set-signup">????????????</span>
            </p>
        </Container>
    );
};

export default LoginModal;