import { Card, Image, Text, Button, Group, Rating, ActionIcon, Container } from '@mantine/core';
import './FoodCardComponent.css'
// import zeroRating from "../../assets/Review Ribbon/Desktop/small_16/Review_Ribbon_small_16_0.png"
// import halfRating from "../../assets/Review Ribbon/Desktop/small_16/Review_Ribbon_small_16_half.png"
// import oneHalfRating from "../../assets/Review Ribbon/Desktop/small_16/Review_Ribbon_small_16_2_1_half.png"
// import twoRating from "../../assets/Review Ribbon/Desktop/small_16/Review_Ribbon_small_16_2.png"
// import twoHalfRating from "../../assets/Review Ribbon/Desktop/small_16/Review_Ribbon_small_16_2_half.png"
// import threeRating from "../../assets/Review Ribbon/Desktop/small_16/Review_Ribbon_small_16_3.png"
// import threeHalfRating from "../../assets/Review Ribbon/Desktop/small_16/Review_Ribbon_small_16_3_half.png"
// import fourRating from "../../assets/Review Ribbon/Desktop/small_16/Review_Ribbon_small_16_4.png"
// import fourHalfRating from "../../assets/Review Ribbon/Desktop/small_16/Review_Ribbon_small_16_4_half.png"
// import fiveRating from "../../assets/Review Ribbon/Desktop/small_16/Review_Ribbon_small_16_5.png"
import SaveFoodButtonComponent from './SaveFoodButtonComponent';
import { IconExternalLink } from '@tabler/icons-react';
import Environment from '../../utils/Environment';
import { useState, useEffect } from 'react';

export default function FoodCardComponent(props) {

    const isLoggedIn = props.isLoggedIn;
    const savedBusinesses = props.savedBusinesses;

    // for loading google photos
    const [isLoadingImages, setIsLoadingImages] = useState(false);

    //for getting google photos and reviews url
    useEffect(() => {
        const fetchData = async () => {
            try {
                const photoReference = props.business.image_url;
                setIsLoadingImages(true);
                if (props.onLoadingAction) props.onLoadingAction(true);
                var photoUrl = await getPhotoUrl(photoReference);
                props.business.image_url = photoUrl;

                if (!props.business.url) {
                    const response = await getGoogleReviewsUrl(props.business.id);
                    const data = await response.json();
                    props.business.url = data.result.url;
                }
            } catch (error) {
                console.error('Error fetching photos or url:', error);
            } finally {
                if (props.onLoadingAction) props.onLoadingAction(false);
                setIsLoadingImages(false);
            }
        }

        // if displaying the winner dont get new data
        if (!props.isWinner) fetchData();
    }, [props.business]);

    // for getting google photos
    const getPhotoUrl = async (photoReference) => {
        try {
            const response = await fetch(Environment.getServerBaseUrl() + '/api/google/photo',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ photoReference })
                });
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);

            return url;
        } catch (error) {
            console.log("Error", error);
        }
    }

    const getGoogleReviewsUrl = async (businessId) => {
        try {
            const response = await fetch(Environment.getServerBaseUrl() + '/api/google/reviews-url',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ businessId })
                });

            return response;
        } catch (error) {
            console.log("Error", error);
        }
    }

    const handleClick = () => {
        props.onClick(props.business);
    };

    const tryAgainClick = () => {
        window.location.reload();
    }

    return (
        <Card className="card" shadow="sm" padding="lg" withBorder>
            <Card.Section>
                <Image
                    src={props.business.image_url}
                    height={200}
                    alt={props.business.name}
                    fallbackSrc={isLoadingImages ? "https://placehold.co/300x300?text=Loading..." : "https://placehold.co/300x300?text=No Photo"}
                // fallbackSrc={"https://placehold.co/300x300?text=No Photo"}
                />
            </Card.Section>
            <Card.Section style={{ overflowY: 'auto' }} className={props.isWinner === undefined ? 'cardInfoNoButton' : 'cardInfo'}>
                <Group className='cardNameSection'>
                    <Text fw={500}>{props.business.name}</Text>
                    {props.business.url && <ActionIcon
                        component="a"
                        href={props.business.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        size="sm"
                        aria-label="Open in a new tab"
                    >
                        <IconExternalLink />
                    </ActionIcon>}
                </Group>
                {isLoggedIn && <SaveFoodButtonComponent businessId={props.business.id} savedBusinesses={savedBusinesses} onSaveButtonClick={props.onLoadingAction}></SaveFoodButtonComponent>}
                <Group>
                    {/* <img src={getRatingPNG(props.business.rating)} alt={props.business.rating + " rating"} /> */}
                    <Rating value={props.business.rating} fractions={2} readOnly />
                    <div>({props.business.review_count} reviews)</div>
                </Group>

                <Text size="sm" c="dimmed">
                    {props.business.location.display_address}
                </Text>

                {props.isWinner === false && <Button className='cardButton' onClick={handleClick} fullWidth mt="auto" loading={props.isLoading}>
                    Select
                </Button>}

                {props.isWinner === true && <Button className='cardButton' onClick={tryAgainClick} fullWidth mt="auto" loading={props.isLoading}>
                    Try Again?
                </Button>}
            </Card.Section>
        </Card>
    );
}

// function getRatingPNG(rating) {
//     if (rating < 0.2) {
//         return zeroRating
//     }
//     else if (rating <= 0.9) {
//         return halfRating
//     }
//     else if (rating <= 1.7) {
//         return oneHalfRating
//     }
//     else if (rating <= 2.2) {
//         return twoRating
//     }
//     else if (rating <= 2.7) {
//         return twoHalfRating
//     }
//     else if (rating <= 3.2) {
//         return threeRating
//     }
//     else if (rating <= 3.7) {
//         return threeHalfRating
//     }
//     else if (rating <= 4.2) {
//         return fourRating
//     }
//     else if (rating <= 4.7) {
//         return fourHalfRating
//     }
//     else {
//         return fiveRating
//     }
// }