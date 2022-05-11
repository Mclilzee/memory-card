import React from "react";
import {shuffle} from "lodash"

export default function Main(props) {

    const [cardsArray, setCardsArray] = React.useState(imagesArray);

    function imagesArray() {
        const images = []
        for (let i = 1; i <= 10; i++) {
            images.push({
                imageURL: `../assets/images/${i}.jpg`,
                isSelected: false
            })
        }

        return shuffle(images);
    }

    const cards = cardsArray.map(card => <h2>{card.imageURL}</h2>)

    return (
        <div className={"cards-container"}>

        </div>
    )
}