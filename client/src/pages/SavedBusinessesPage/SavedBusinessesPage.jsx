import './SavedBusinessesPage.css'
import { useLocalStorageContext } from '../../contexts/LocalStorageContext';
import FoodCardComponent from '../../components/FoodCardComponent/FoodCardComponent';
import React, { useState, useEffect } from 'react';
import Environment from '../../utils/Environment';
import axios from 'axios';

export default function SavedBusinessesPage() {
    const isLoggedIn = useLocalStorageContext();
    const [savedBusinessIds, setSavedBusinessIds] = useState(null);

    // State to store fetched data
    const [fetchedData, setFetchedData] = useState(() => {
        // Retrieve cached data from localStorage
        const cachedData = localStorage.getItem('savedBusinesses');
        if (cachedData) {
            const { data, timestamp } = JSON.parse(cachedData);
            // Check if the cached data has expired (e.g., expires after 24 hours)
            if (Date.now() - timestamp < 3600000 * 24) {
                return data;
            } else {
                // Clear expired data from localStorage
                localStorage.removeItem('savedBusinesses');
            }
        }
        return {};
    });

    // Function to fetch data for an ID if not already fetched
    const fetchDataForId = async (id) => {
        try {
            // Fetch data from API for the ID
            const response = await axios.post(Environment.getServerBaseUrl() + '/api/find-business', { businessId: id });
            const newData = response.data;

            // Update state with fetched data
            setFetchedData(prevData => ({
                ...prevData,
                [id]: newData
            }));
        } catch (error) {
            console.error(`Error fetching data for ID ${id}:`, error);
        }
    };

    // Fetch data for each ID when component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(Environment.getServerBaseUrl() + '/api/businesses', { withCredentials: true });
                setSavedBusinessIds(response.data);
                // Fetch data for each ID with a delay between API calls
                response.data.forEach((id) => {
                    // Check if data for the ID is already fetched
                    if (!fetchedData[id]) {
                        setTimeout(() => {
                            fetchDataForId(id);
                        }, 2000); // Delay of 2 seconds
                    }
                });
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        if (isLoggedIn) {
            fetchData();
        }
        else {
            setSavedBusinessIds(null);
        }
    }, [isLoggedIn]);

    // Update localStorage whenever fetchedData changes
    useEffect(() => {
        localStorage.setItem('savedBusinesses', JSON.stringify({
            data: fetchedData,
            timestamp: Date.now()
        }));
    }, [fetchedData]);

    if (isLoggedIn) {
        return (
            <div className="savedBusinessesPage">
                {savedBusinessIds && (
                    <div className="cardContainer">
                        {Object.entries(fetchedData)
                            .filter(([id]) => savedBusinessIds.includes(id))
                            .sort(([idA, businessA], [idB, businessB]) => {
                                // Compare the business names alphabetically
                                return businessA.name.localeCompare(businessB.name);
                            })
                            .map(([id, business]) => (
                                <FoodCardComponent
                                    key={id}
                                    business={business}
                                    isLoggedIn={isLoggedIn}
                                    savedBusinesses={savedBusinessIds}
                                ></FoodCardComponent>
                            ))}
                    </div>
                )}
            </div>
        );
    }
    else {
        return (
            <div className="savedBusinessesPage" >
                You are logged out. Please log in to view your saved businesses!
            </div>
        );
    }
}