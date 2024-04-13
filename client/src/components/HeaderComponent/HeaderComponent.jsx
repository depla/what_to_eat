import React from 'react';
import './HeaderComponent.css';
import GoogleLoginComponent from "../GoogleIdComponent/GoogleLoginComponent";
import GoogleLogoutComponent from '../GoogleIdComponent/GoogleLogoutComponent';
import useLocalStorage from '../../customHooks/useLocalStorage';
import { Avatar } from '@mantine/core';
import AvatarMenuComponent from './AvatarMenuComponent';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function HeaderComponent() {
    // const [userData, setUserData] = useLocalStorage('user', null);
    const [userData, setUserData] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isLoggedIn', false);
    const updateLocalStorage = (loggedIn) => {
        setIsLoggedIn(loggedIn)
    }

    const logout = async () => {
        const res = await axios.post('/api/auth/google/logout');
    }

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/api/auth/google/user-data');
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                updateLocalStorage(false)
            }
        }
        if (isLoggedIn) {
            fetchUserData();
        }
        else {
            setUserData(null);
            logout();
        }
    }, [isLoggedIn])

    return (
        <header className="logo-header">
            <div>
                <a href="/">
                    🍔 WatEat
                </a>
            </div>
            <div className='auth'>
                {userData && <AvatarMenuComponent avatarUrl={userData.picture} username={userData.name} updateLocalStorage={updateLocalStorage}></AvatarMenuComponent>}
                {!userData && <GoogleLoginComponent updateLocalStorage={updateLocalStorage}></GoogleLoginComponent>}
            </div>
        </header>
    );
}

