import Link from "next/link";
import palette from "../styles/palette";
import styled from "styled-components";
import AirBnbLogoIcon from "../public/static/svg/logo/logo.svg"
import AirBnbLogoTextIcon from "../public/static/svg/logo/logo_text.svg"
import HamburgerIcon from "../public/static/svg/header/hamburger.svg"
import React, { useState } from "react";
import useModal from "../hooks/useModal";
import { useSelector } from "../store";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import AuthModal from "./auth/AuthModal";
import OutsideClickHandler from "react-outside-click-handler";
import { logoutAPI } from "../lib/api/auth";
import { userActions } from "../store/user";

const Container = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 80px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px !important;
  z-index: 10;
  .header-logo-wrapper {
    display: flex;
    align-items: center;
    .header-logo {
      margin-right: 6px;
    }
    h1 {
      font-size: 21px;
      font-weight: bold;
      color: ${palette.main_pink};
    }
  }
  .header-auth-buttons {
    .header-sign-up-button {
      height: 42px;
      margin-right: 8px;
      padding: 0 16px;
      border: 0;
      border-radius: 21px;
      background-color: white;
      cursor: pointer;
      outline: none;
      &:hover {
        background-color: ${palette.gray_f7};
      }
    }
    .header-login-button {
      height: 42px;
      padding: 0 16px;
      border: 0;
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
      border-radius: 21px;
      background-color: white;
      cursor: pointer;
      outline: none;
      &:hover {
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
      }
    }
  }
  .header-user-profile {
    display: flex;
    align-items: center;
    height: 42px;
    padding: 0 6px 0 16px;
    border: 0;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
    border-radius: 21px;
    background-color: white;
    cursor: pointer;
    outline: none;
    &:hover {
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
    }
    img {
      margin-left: 8px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }
  .header-logo-wrapper + div {
    position: relative;
  }
  .header-usermenu {
    position: absolute;
    right: 0;
    top: 52px;
    width: 240px;
    padding: 8px 0;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.12);
    border-radius: 8px;
    background-color: white;
    li {
      display: flex;
      align-items: center;
      width: 100%;
      height: 42px;
      padding: 0 16px;
      cursor: pointer;
      &:hover {
        background-color: ${palette.gray_f7};
      }
    }
    .header-usermenu-divider {
      width: 100%;
      height: 1px;
      margin: 8px 0;
      background-color: ${palette.gray_dd};
    }
  }
  .modal-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    .modal-background {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.75);
      z-index: 10;
    }
    .modal-contents {
      width: 400px;
      height: 400px;
      background-color: white;
      z-index: 11;
    }
  }
`;

const Header: React.FC = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user)
    const {openModal, ModalPortal, closeModal} = useModal();
    const [isUserMenuOpened, setIsUserMenuOpened] = useState(false);

    const logout = async () => {
        try {
            await logoutAPI();
            dispatch(userActions.initUser());
        } catch (e) {
            console.log(e.message);
        }
    };

    return (
        <Container>
            <Link href="/">
                <a className="header-logo-wrapper">
                    <AirBnbLogoIcon className="header-logo"/>
                    <AirBnbLogoTextIcon/>
                </a>
            </Link>
            {!user.isLogged && (
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
            )}
            {user.isLogged && (
                <OutsideClickHandler
                    onOutsideClick={() => {
                        if (isUserMenuOpened) {
                            setIsUserMenuOpened(false);
                        }
                    }}
                >
                    <button
                        className="header-user-profile"
                        type="button"
                        onClick={() => setIsUserMenuOpened(!isUserMenuOpened)}
                    >
                        <HamburgerIcon/>
                        <img
                            src={user.profileImage}
                            className="header-user-profile-image"
                            alt=""
                        />
                    </button>
                    {isUserMenuOpened && (
                        <ul className="header-usermenu">
                            <li>숙소 관리</li>
                            <Link href="/room/register/building">
                                <a
                                    role="presentation"
                                    onClick={() => {
                                        setIsUserMenuOpened(false);
                                    }}
                                >
                                    <li>숙소 등록하기</li>
                                </a>
                            </Link>
                            <div className="header-usermenu-divider"/>
                            <li role="presentation" onClick={logout}>
                                로그아웃
                            </li>
                        </ul>
                    )}
                </OutsideClickHandler>
            )}
        </Container>
    );
};

export default Header;