import React from 'react';
import './HeaderComponent.css';
import GoogleLoginComponent from "../GoogleIdComponent/GoogleLoginComponent";
import GoogleLogoutComponent from '../GoogleIdComponent/GoogleLogoutComponent';
import useLocalStorage from '../../customHooks/useLocalStorage';
import { Avatar } from '@mantine/core';
import AvatarMenuComponent from './AvatarMenuComponent';

export default function HeaderComponent() {
    const [userData, setUserData] = useLocalStorage('user', null);
    const updateLocalStorage = (userData) => {
        setUserData(userData)
    }

    return (
        <header className="logo-header">
            <div>
                <a href="/">
                    🍔 WatEat
                </a>
            </div>
            <div className='auth'>
                {/* {userData && <Avatar src={userData.picture} alt="avatar picture" />} */}
                {userData && <AvatarMenuComponent avatarUrl={userData.picture} username={userData.name} updateLocalStorage={updateLocalStorage}></AvatarMenuComponent>}
                {!userData && <GoogleLoginComponent updateLocalStorage={updateLocalStorage}></GoogleLoginComponent>}
                {/* {localStorage.getItem('user') !== 'null' && <GoogleLogoutComponent updateLocalStorage={updateLocalStorage}></GoogleLogoutComponent>} */}
            </div>
        </header>
    );
}

