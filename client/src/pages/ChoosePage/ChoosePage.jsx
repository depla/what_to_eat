import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './ChoosePage.css'
import FoodCardComponent from '../../components/FoodCardComponent/FoodCardComponent';

export default function ChoosePage() {
    const { state } = useLocation();
    var businesses = state?.businesses;

    const [choices, setChoices] = useState(getRandomItemsFromArray(businesses, 20));
    console.log("choices", choices)
    console.log("business", businesses)
    const [leftPointer, setLeftPointer] = useState(0);
    const [rightPointer, setRightPointer] = useState(choices.length - 1);
    const [winner, setWinner] = useState(-1);
    console.log(choices)

    const handleLeftChildClick = (chosenBusiness) => {
        console.log('Data from clicked child:', chosenBusiness);
        if (rightPointer > 0 && (rightPointer - 1) > leftPointer) {
            setRightPointer(prevRight => prevRight - 1);
        }
        else {
            setWinner(leftPointer)
        }
        console.log(leftPointer + " " + rightPointer)
    };

    const handleRightChildClick = (chosenBusiness) => {
        console.log('Data from clicked child:', chosenBusiness);
        if (leftPointer < choices.length - 1 && (leftPointer + 1) < rightPointer) {
            setLeftPointer(prevLeft => prevLeft + 1);
        }
        else {
            setWinner(rightPointer)
        }
        console.log(leftPointer + " " + rightPointer)
    };

    if (winner !== -1) {

        return (
            <div className='winner'>
                <p>You've chosen:</p>
                <FoodCardComponent onClick={handleLeftChildClick} business={choices[winner]} isWinner={true}></FoodCardComponent>
            </div>
        )
    }

    return (
        <div className='choose'>
            <FoodCardComponent onClick={handleLeftChildClick} business={choices[leftPointer]} isWinner={false}></FoodCardComponent>
            <FoodCardComponent onClick={handleRightChildClick} business={choices[rightPointer]} isWinner={false}></FoodCardComponent>
        </div>
    );

}

function getRandomItemsFromArray(array, numItems) {
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