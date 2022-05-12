import React from "react";
import {shuffle} from "lodash"
import Card from "./Card"

export default function Main(props) {

    const [cardsArray, setCardsArray] = React.useState(imagesArray);
    const [currentScore, setCurrentStore] = React.useState(0);
    const [highScore, setCurrentHighStore] = React.useState(() => {
        return JSON.parse(localStorage.getItem("highScore")) || 0
    })

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
        <div className={"game-window"}>
            <div className={"score-container"}>
                <div className={"score"}>Score: {currentScore}</div>
                <div className={"high-score"}>High-score: {highScore}</div>
            </div>
            <div className={"cards-container"}>
                {cards}
            </div>
        </div>
    )
}