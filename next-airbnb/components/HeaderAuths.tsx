import React from "react";
import { useDispatch } from "react-redux";
import useModal from "../hooks/useModal";
import { authActions } from "../store/auth";
import AuthModal from "./auth/AuthModal";


const HeaderAuths: React.FC = () => {
    const dispatch = useDispatch();
    const {openModal, ModalPortal, closeModal} = useModal();

    return (
        <>
            <div className="header-auth-buttons">
                <button
                    type="button"
                    className="header-sign-up-button"
                    onClick={() => {
                        dispatch(authActions.setAuthMode("signup"));
                        openModal();
                    }}
                >
                    회원가입
                </button>
                <button
                    type="button"
                    className="header-login-button"
                    onClick={() => {
                        dispatch(authActions.setAuthMode("login"));
                        openModal();
                    }}
                >
                    로그인
                </button>
                <ModalPortal>
                    <AuthModal closeModal={closeModal}/>
                </ModalPortal>
            </div>
        </>
    );
};

export default HeaderAuths;