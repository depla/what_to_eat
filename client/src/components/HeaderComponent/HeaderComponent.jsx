import React from 'react';
import './HeaderComponent.css';
import GoogleLoginComponent from "../GoogleIdComponent/GoogleLoginComponent";
import useLocalStorage from '../../customHooks/useLocalStorage';
import AvatarMenuComponent from './AvatarMenuComponent';
import { useState, useEffect } from 'react';
import Environment from '../../utils/Environment';
import axios from 'axios';

export default function HeaderComponent() {
    const [userData, setUserData] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isLoggedIn', false);
    const updateLocalStorage = (loggedIn) => {
        setIsLoggedIn(loggedIn)
    }

    const logout = async () => {
        const res = await axios.post(Environment.getServerBaseUrl() + '/api/auth/google/logout', null, { withCredentials: true });
    }

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(Environment.getServerBaseUrl() + '/api/auth/google/user-data', { withCredentials: true });
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

