import { Input } from '@mantine/core';
import { Button } from '@mantine/core';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Environment from '../../utils/Environment';
import axios from 'axios';
import ToggleComponent from '../SharedComponent/ToggleComponent';

import './SearchFoodComponent.css';

export default function SearchFoodComponent() {
    const defaultIsOpen = false;
    const [isOpenToggled, setIsOpenToggled] = useState(defaultIsOpen);
    const [searchError, setSearchError] = useState("");
    const [locationError, setLocationError] = useState("");

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
        const isValidSearch = validateField(formData.search, setSearchError, "Please enter what you would like to search for.");
        const isValidLocation = validateField(formData.location, setLocationError, "Please enter a location.");

        if (isValidSearch && isValidLocation) {
            try {
                // const response = await axios.post(Environment.getServerBaseUrl() + '/api/foursquare/search-food', formData);
                const response = await axios.post(Environment.getServerBaseUrl() + '/api/search-food', formData);
                navigateTo('/choose', { state: response.data });
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const onIsOpenToggleClick = (isOpen) => {
        setIsOpenToggled(isOpen);
    }

    const validateField = (field, setter, message) => {
        var isValid = false;

        if (field === "") {
            setter(message);
        }
        else {
            setter("");
            isValid = true;
        }

        return isValid;
    }

    return (
        <form className="searchForm" onSubmit={handleSubmit}>
            <Input.Wrapper label="Search" description="What would you like to look for?" size="xl" error={searchError}>
                <Input placeholder="Restaurants" type="text" name="search" value={formData.search} onChange={handleChange} />
            </Input.Wrapper>
            <Input.Wrapper label="Location" description="Where would you want to look?" size="xl" error={locationError}>
                <Input placeholder="Los Angeles CA" type="text" name="location" value={formData.location} onChange={handleChange} />
            </Input.Wrapper>
            <ToggleComponent label="Open now?" value={isOpenToggled} onClick={onIsOpenToggleClick} defaultVal={defaultIsOpen} />
            <Button type="submit" variant="filled">Submit</Button>
        </form>
    );

}