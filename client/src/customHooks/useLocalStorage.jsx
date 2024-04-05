import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => {
        const storedValue = localStorage.getItem(key);
        return storedValue !== null ? JSON.parse(storedValue) : initialValue;
    });

    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === key) {
                setValue(event.newValue ? JSON.parse(event.newValue) : null);
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [key]);

    const setLocalStorage = (newValue) => {
        setValue(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
        window.dispatchEvent(new Event("storage"));
    };

    return [value, setLocalStorage];
};

export default useLocalStorage;
