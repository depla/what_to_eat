import React, { createContext, useContext, useEffect, useState } from 'react';

// Step 1: Create a context
const LocalStorageContext = createContext();

// Step 2: Create a context provider component
export const LocalStorageProvider = ({ children }) => {
    const [localStorageData, setLocalStorageData] = useState(
        localStorage.getItem('user') || null
    );

    // Listen for changes in local storage
    useEffect(() => {
        const handleStorageChange = () => {
            setLocalStorageData(localStorage.getItem('user') || null);
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        // Step 3: Provide the context value
        <LocalStorageContext.Provider value={localStorageData}>
            {children}
        </LocalStorageContext.Provider>
    );
};

// Step 4: Create a custom hook to consume the context
export const useLocalStorageContext = () => useContext(LocalStorageContext);
