import { Input } from '@mantine/core';
import { Button } from '@mantine/core';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './SearchFoodComponent.css';

export default function SearchFoodComponent() {
    const [formData, setFormData] = useState({
        search: '',
        location: ''
    });

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
            const response = await axios.post('/api/search-food', formData);
            navigateTo('/choose', { state: response.data });
            // Handle successful response
        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }
    };

    return (
        <form className="searchForm" onSubmit={handleSubmit}>
            <Input.Wrapper label="Search" description="What would you like to look for?" size="xl">
                <Input placeholder="Restaurants" type="text" name="search" value={formData.search} onChange={handleChange} />
            </Input.Wrapper>
            <Input.Wrapper label="Location" description="Where would you want to look?" size="xl">
                <Input placeholder="Los Angeles CA" type="text" name="location" value={formData.location} onChange={handleChange} />
            </Input.Wrapper>
            <Button type="submit" variant="filled">Submit</Button>
        </form>
    );

}