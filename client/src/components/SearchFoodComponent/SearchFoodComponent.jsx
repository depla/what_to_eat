import { Input } from '@mantine/core';
import { Button } from '@mantine/core';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Environment from '../../utils/Environment';
import axios from 'axios';
import ToggleComponent from '../SharedComponent/ToggleComponent';

import './SearchFoodComponent.css';

export default function SearchFoodComponent() {
    const defaultIsOpen = true;
    const [isOpenToggled, setIsOpenToggled] = useState(defaultIsOpen);

    const [formData, setFormData] = useState({
        search: '',
        location: '',
        isOpen: isOpenToggled
    });

    useEffect(() => {
        setFormData(prevFormData => ({
            ...prevFormData,
            isOpen: isOpenToggled
        }));
    }, [isOpenToggled]);

    const navigateTo = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const response = await axios.post(Environment.getServerBaseUrl() + '/api/foursquare/search-food', formData);
            const response = await axios.post(Environment.getServerBaseUrl() + '/api/search-food', formData);
            navigateTo('/choose', { state: response.data });
            // Handle successful response
        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }
    };

    const onIsOpenToggleClick = (isOpen) => {
        setIsOpenToggled(isOpen);
    }

    return (
        <form className="searchForm" onSubmit={handleSubmit}>
            <Input.Wrapper label="Search" description="What would you like to look for?" size="xl">
                <Input placeholder="Restaurants" type="text" name="search" value={formData.search} onChange={handleChange} />
            </Input.Wrapper>
            <Input.Wrapper label="Location" description="Where would you want to look?" size="xl">
                <Input placeholder="Los Angeles CA" type="text" name="location" value={formData.location} onChange={handleChange} />
            </Input.Wrapper>
            <ToggleComponent label="Open now?" value={isOpenToggled} onClick={onIsOpenToggleClick} defaultVal={defaultIsOpen} />
            <Button type="submit" variant="filled">Submit</Button>
        </form>
    );

}