import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import HamburgerIcon from "../public/static/svg/header/hamburger.svg";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useSelector } from "../store";
import { logoutAPI } from "../lib/api/auth";
import { userActions } from "../store/user";


const HeaderUserProfile: React.FC = () => {
    const dispatch = useDispatch();
    const userProfileImage = useSelector((state) => state.user.profileImage)
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
                    src={userProfileImage}
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
    )
};

export default HeaderUserProfile;