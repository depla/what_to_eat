import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import './FoodCardComponent.css'
import zeroRating from "../../assets/Review Ribbon/Desktop/small_16/Review_Ribbon_small_16_0.png"
import halfRating from "../../assets/Review Ribbon/Desktop/small_16/Review_Ribbon_small_16_half.png"
import oneHalfRating from "../../assets/Review Ribbon/Desktop/small_16/Review_Ribbon_small_16_2_1_half.png"
import twoRating from "../../assets/Review Ribbon/Desktop/small_16/Review_Ribbon_small_16_2.png"
import twoHalfRating from "../../assets/Review Ribbon/Desktop/small_16/Review_Ribbon_small_16_2_half.png"
import threeRating from "../../assets/Review Ribbon/Desktop/small_16/Review_Ribbon_small_16_3.png"
import threeHalfRating from "../../assets/Review Ribbon/Desktop/small_16/Review_Ribbon_small_16_3_half.png"
import fourRating from "../../assets/Review Ribbon/Desktop/small_16/Review_Ribbon_small_16_4.png"
import fourHalfRating from "../../assets/Review Ribbon/Desktop/small_16/Review_Ribbon_small_16_4_half.png"
import fiveRating from "../../assets/Review Ribbon/Desktop/small_16/Review_Ribbon_small_16_5.png"
import SaveFoodButtonComponent from './SaveFoodButtonComponent';
import { useLocalStorageContext } from '../../contexts/LocalStorageContext';

export default function FoodCardComponent(props) {

    const isLoggedIn = props.isLoggedIn;
    const savedBusinesses = props.savedBusinesses;

    const handleClick = () => {
        props.onClick(props.business); // Call the onClick callback function with data as argument
    };

    const tryAgainClick = () => {
        window.location.reload();
    }

    return (
        <Card className="card" shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section component="a" href={props.business.url} target="_blank" rel="noopener noreferrer">
                <Image
                    src={props.business.image_url}
                    height={160}
                    alt={props.business.name}
                />
            </Card.Section>
            <Card.Section style={{ overflowY: 'auto' }} className={props.isWinner === undefined ? 'cardInfoNoButton' : 'cardInfo'}>
                <Text fw={500}>{props.business.name}</Text>
                {isLoggedIn && <SaveFoodButtonComponent businessId={props.business.id} savedBusinesses={savedBusinesses}></SaveFoodButtonComponent>}
                <Group>
                    <img src={getRatingPNG(props.business.rating)} alt={props.business.rating + " rating"} />
                    <p>({props.business.review_count} reviews)</p>
                </Group>

                {props.business.location.display_address.map((string, index) => (
                    <Text size="sm" c="dimmed" key={index}>
                        {string}
                    </Text>
                ))}

                {props.isWinner === false && <Button onClick={handleClick} color="blue" fullWidth mt="auto" radius="md">
                    Select
                </Button>}

                {props.isWinner === true && <Button onClick={tryAgainClick} color="blue" fullWidth mt="auto" radius="md">
                    Try Again?
                </Button>}
            </Card.Section>
        </Card>
    );
}

function getRatingPNG(rating) {
    if (rating < 0.2) {
        return zeroRating
    }
    else if (rating <= 0.9) {
        return halfRating
    }
    else if (rating <= 1.7) {
        return oneHalfRating
    }
    else if (rating <= 2.2) {
        return twoRating
    }
    else if (rating <= 2.7) {
        return twoHalfRating
    }
    else if (rating <= 3.2) {
        return threeRating
    }
    else if (rating <= 3.7) {
        return threeHalfRating
    }
    else if (rating <= 4.2) {
        return fourRating
    }
    else if (rating <= 4.7) {
        return fourHalfRating
    }
    else {
        return fiveRating
    }
}