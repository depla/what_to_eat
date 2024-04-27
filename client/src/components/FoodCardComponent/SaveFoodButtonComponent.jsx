import { Chip, rem } from '@mantine/core';
import { IconBookmark } from '@tabler/icons-react';
import React, { useState, useEffect } from 'react';
import Environment from '../../utils/Environment';
import axios from 'axios';

export default function SaveFoodButtonComponent(props) {
    const [isSaved, setIsSaved] = useState(false);
    var savedBusinesses = props.savedBusinesses;

    useEffect(() => {
        if (savedBusinesses) {
            setIsSaved(savedBusinesses.includes(props.businessId));
        }
    }, [savedBusinesses, props.businessId]);

    const handleClick = async () => {
        if (props.onSaveButtonClick) props.onSaveButtonClick(true);
        if (isSaved) {
            try {
                const res = await axios.delete(Environment.getServerBaseUrl() + '/api/businesses', { withCredentials: true, data: { businessId: props.businessId } });
                savedBusinesses = savedBusinesses.filter(item => item !== props.businessId)
                setIsSaved(false)
            } catch (error) {
                console.error('Error in unsaving business', error);
            }
        }
        else {
            try {
                const res = await axios.post(Environment.getServerBaseUrl() + '/api/businesses', { businessId: props.businessId }, { withCredentials: true });
                savedBusinesses = savedBusinesses.push(props.businessId)
                setIsSaved(true)
            } catch (error) {
                console.error('Error in saving business', error);
            }
        }
        if (props.onSaveButtonClick) props.onSaveButtonClick(false);
    };

    return (
        <Chip
            icon={<IconBookmark style={{ width: rem(12), height: rem(12) }} />}
            color="green"
            variant="filled"
            size="xs"
            onClick={handleClick}
            checked={isSaved}
        >
            {isSaved ? 'Saved' : 'Save'}
        </Chip>
    )
}