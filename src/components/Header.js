import React from "react";

export default function Header(props) {

    return (
        <div className={"header"}>
            <h1>Memory card game</h1>
            <h4>To score, you have to choose each card only once. If you selected all the cards, you will be able to
                repeat the process, increasing the score even further!</h4>
        </div>
    )
}