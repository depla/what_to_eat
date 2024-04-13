import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChoosePage.css'
import FoodCardComponent from '../../components/FoodCardComponent/FoodCardComponent';
import { useLocalStorageContext } from '../../contexts/LocalStorageContext';

export default function ChoosePage() {
    const { state } = useLocation();
    var businesses = state?.businesses;
    const isLoggedIn = useLocalStorageContext();

    const [choices, setChoices] = useState(getRandomItemsFromArray(businesses, 20));
    const [savedBusinesses, setSavedBusinesses] = useState(null);

    // console.log("choices", choices)
    // console.log("business", businesses)
    const [leftPointer, setLeftPointer] = useState(0);
    const [rightPointer, setRightPointer] = useState(choices.length - 1);
    const [winner, setWinner] = useState(-1);
    // console.log(choices)

    //Need to get all saved businesses in a list from database
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/businesses');
                setSavedBusinesses(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        if (isLoggedIn) {
            fetchData();
        }
    }, [isLoggedIn]);

    const handleLeftChildClick = (chosenBusiness) => {
        // console.log('Data from clicked child:', chosenBusiness);
        if (rightPointer > 0 && (rightPointer - 1) > leftPointer) {
            setRightPointer(prevRight => prevRight - 1);
        }
        else {
            setWinner(leftPointer)
        }
        // console.log(leftPointer + " " + rightPointer)
    };

    const handleRightChildClick = (chosenBusiness) => {
        // console.log('Data from clicked child:', chosenBusiness);
        if (leftPointer < choices.length - 1 && (leftPointer + 1) < rightPointer) {
            setLeftPointer(prevLeft => prevLeft + 1);
        }
        else {
            setWinner(rightPointer)
        }
        // console.log(leftPointer + " " + rightPointer)
    };

    if (choices.length > 0) {

        if (winner !== -1) {

            return (
                <div className='winner'>
                    <p>You've chosen:</p>
                    <FoodCardComponent onClick={handleLeftChildClick} business={choices[winner]} isWinner={true} isLoggedIn={isLoggedIn} savedBusinesses={savedBusinesses}></FoodCardComponent>
                </div>
            )
        }

        return (
            <div className='choose'>
                <FoodCardComponent onClick={handleLeftChildClick} business={choices[leftPointer]} isWinner={false} isLoggedIn={isLoggedIn} savedBusinesses={savedBusinesses}></FoodCardComponent>
                <FoodCardComponent onClick={handleRightChildClick} business={choices[rightPointer]} isWinner={false} isLoggedIn={isLoggedIn} savedBusinesses={savedBusinesses}></FoodCardComponent>
            </div>
        );
    }
    else {
        return (
            <div>
                Oops nothing to show here! Please enter your search first.
            </div>
        )
    }

}

function getRandomItemsFromArray(array, numItems) {
    if (array) {
        // Copy the original array to avoid modifying it
        const shuffledArray = [...array];

        // Fisher-Yates (Knuth) Shuffle Algorithm
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }

        // Return the first 'numItems' elements
        return shuffledArray.slice(0, numItems);
    }
    else {
        return []
    }
}