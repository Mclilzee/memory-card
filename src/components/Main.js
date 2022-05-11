import React from "react";
import {shuffle} from "lodash"
import Card from "./Card"

export default function Main(props) {

    const [cardsArray, setCardsArray] = React.useState(imagesArray);

    function imagesArray() {
        const images = []
        for (let i = 1; i <= 10; i++) {
            images.push({
                imageURL: `images/${i}.jpg`,
                isSelected: false
            })
        }

        return shuffle(images);
    }

    const cards = cardsArray.map((item, itemIndex) => {
        return <Card key={itemIndex}
                     index={itemIndex}
                     imageURL={item.imageURL}
        />
    });

    return (
        <div className={"cards-container"}>
            {cards}
        </div>
    )
}