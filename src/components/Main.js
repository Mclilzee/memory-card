import React from "react";
import {shuffle} from "lodash"
import Card from "./Card"

export default function Main(props) {

    const [cardsArray, setCardsArray] = React.useState(imagesArray);
    const [currentScore, setCurrentScore] = React.useState(0);
    const [highScore, setHighScore] = React.useState(() => {
        return Number(localStorage.getItem("highScore")) || 0
    })
    const [newHigh, setNewHigh] = React.useState(false);

    React.useEffect(() => {
        localStorage.setItem("highScore", highScore + "");
    }, [highScore])

    React.useEffect(() => {
        checkIfGameWon()
        if (currentScore > highScore) {
            setHighScore(currentScore)
            setNewHigh(true);
        }
    }, [checkIfGameWon, currentScore, highScore])

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

    function handleClick(index) {
        if (cardsArray[index].isSelected) {
            resetGame()
        } else {
            scoreAPoint(index)
        }

    }

    function resetGame() {
        setCurrentScore(0)
        setCardsArray(prevArray => {
            const resetArray = prevArray.map(card => ({...card, isSelected: false}))
            return shuffle(resetArray)
        });
    }

    function scoreAPoint(index) {
        setCardsArray(prevArray => {
            const unshuffledArray = prevArray.map((card, cardIndex) => {
                return cardIndex === index ?
                    {...card, isSelected: true} :
                    card
            })

            return shuffle(unshuffledArray);
        })

        setCurrentScore(prevScore => prevScore + 1)
    }

    function checkIfGameWon() {
        const isWon = cardsArray.every(card => card.isSelected);

        if (isWon) {
            softResetCards();
        }
    }

    function softResetCards() {
        setCardsArray(prevArray => {
            const unshuffledArray = prevArray.map(card => ({...card, isSelected: false}));
            return shuffle(unshuffledArray);
        })
    }


    const cards = cardsArray.map((item, itemIndex) => {
        return <Card key={itemIndex}
                     index={itemIndex}
                     imageURL={item.imageURL}
                     onClick={handleClick}
                     isSelected={item.isSelected}
        />
    });

    return (
        <div className={"game-window"}>
            <div className={"score-container"}>
                <div className={`score ${newHigh ? "new-high" : ""}`}>Score: {currentScore}</div>
                <div className={"high-score"}>High-score: {highScore}</div>
            </div>
            <div className={"cards-container"}>
                {cards}
            </div>
        </div>
    )
}