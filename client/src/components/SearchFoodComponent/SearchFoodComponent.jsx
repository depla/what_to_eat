import { Button, TextInput, Input, ActionIcon } from '@mantine/core';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Environment from '../../utils/Environment';
import axios from 'axios';
import ToggleComponent from '../SharedComponent/ToggleComponent';
import { IconMapPin } from '@tabler/icons-react';

import './SearchFoodComponent.css';

export default function SearchFoodComponent() {
    const defaultIsOpen = false;
    const [isOpenToggled, setIsOpenToggled] = useState(defaultIsOpen);
    const [searchError, setSearchError] = useState("");
    const [locationError, setLocationError] = useState("");
    const [isSubmitLoading, setIsSubmitLoading] = useState(false);

    const [formData, setFormData] = useState({
        search: '',
        location: '',
        isOpen: isOpenToggled,
        coordinates: null
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
                setIsSubmitLoading(true);
                // const response = await axios.post(Environment.getServerBaseUrl() + '/api/foursquare/search-food', formData);
                const response = await axios.post(Environment.getServerBaseUrl() + '/api/search-food', formData);
                navigateTo('/choose', { state: response.data });
            } catch (error) {
                console.error('Error:', error);
            }
        }
        setIsSubmitLoading(false);
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

    const showPosition = (position) => {
        // Update the location field in the form data
        setFormData({ ...formData, location: 'Current Location', coordinates: [position.coords.latitude, position.coords.longitude] });
    }

    const handleIconClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    };

    return (
        <form className="searchForm" onSubmit={handleSubmit}>
            <Input.Wrapper label="Search" description="What would you like to look for?" size="xl" error={searchError}>
                <TextInput placeholder="Restaurants" type="text" name="search" value={formData.search} onChange={handleChange} />
            </Input.Wrapper>
            <Input.Wrapper label="Location" description="Where would you want to look?" size="xl" error={locationError}>
                <TextInput
                    placeholder="Los Angeles CA"
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    rightSection={
                        <ActionIcon variant="filled" onClick={handleIconClick}>
                            <IconMapPin />
                        </ActionIcon>
                    }
                />
            </Input.Wrapper>
            <ToggleComponent label="Open now?" value={isOpenToggled} onClick={onIsOpenToggleClick} defaultVal={defaultIsOpen} />
            <Button type="submit" variant="filled" loading={isSubmitLoading}>Submit</Button>
        </form>
    );

}