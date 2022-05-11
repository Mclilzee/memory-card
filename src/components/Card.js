import React from "react";

export default function Card(props) {

    function handleClick() {
        props.onClick(props.index);
    }

    return (
        // eslint-disable-next-line jsx-a11y/img-redundant-alt
        <img className={"card"} onClick={handleClick} src={props.imageURL} alt={"image of a cat"}/>
    )
}