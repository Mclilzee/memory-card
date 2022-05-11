import React from "react";

export default function Card(props) {

    function handleClick() {
        props.onClick(props.index);
    }

    return (
        <img onClick={handleClick} src={props.imageURL} alt={"image of a cat"}/>
    )
}