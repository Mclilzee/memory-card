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

        function checkIfGameWon() {
            const isWon = cardsArray.every(card => card.isSelected);

            if (isWon) {
                softResetCards();
            }
        }

    }, [cardsArray, currentScore, highScore])

    function imagesArray() {
        const images = []
        for (let i = 1; i <= 10; i++) {
            images.push({
                imageURL: `images/${i}.jpg`,
                isSelected: false,
                id: i + ""
            })
        }

        return shuffle(images);
    }

    function handleClick(id) {
        if (isCardSelected(id)) {
            resetGame()
        } else {
            scoreAPoint(id)
        }

    }

    function isCardSelected(id) {
        for (let card of cardsArray) {
            if (card.id === id) {
                return card.isSelected;
            }
        }
        throw Error;
    }

    function resetGame() {
        setCurrentScore(0)
        setCardsArray(prevArray => {
            const resetArray = prevArray.map(card => ({...card, isSelected: false}))
            return shuffle(resetArray)
        });
        setNewHigh(false);
    }

    function scoreAPoint(id) {
        setCardsArray(prevArray => {
            const unshuffledArray = prevArray.map(card => {
                return card.id === id ?
                    {...card, isSelected: true} :
                    card
            })

            return shuffle(unshuffledArray);
        })

        setCurrentScore(prevScore => prevScore + 1)
    }

    function softResetCards() {
        setCardsArray(prevArray => {
            const unshuffledArray = prevArray.map(card => ({...card, isSelected: false}));
            return shuffle(unshuffledArray);
        })
    }


    const cards = cardsArray.map(item => {
        return <Card key={item.id}
                     id={item.id}
                     imageURL={item.imageURL}
                     onClick={handleClick}
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