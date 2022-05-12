import React from "react";

export default function Card(props) {

    function handleClick() {
        props.onClick(props.index);
    }

    const cardStyle = {
        border: props.isSelected ? "none" : ""
    }

    return (
        // eslint-disable-next-line jsx-a11y/img-redundant-alt
        <div className={"card"}>
            <img style={cardStyle} onClick={handleClick} src={props.imageURL} alt={"image of a cat"}/>
        </div>
    )
}