import React from "react";
import frontCardImg from "../images/bg-card-front.png";

function FrontCard(props) {
  console.log(props.data.cardNumber);
  return (
    <figure className="card-front">
      <img src={frontCardImg} alt="card-front" id="card-front" />
      <figcaption className="details">
        <div className="circles">
          <span className="big-circle"></span>
          <span className="small-circle"></span>
        </div>
        <div className="card-number">
          {props.data.cardNumber === ""
            ? "0000 0000 0000 0000"
            : props.data.cardNumber}
        </div>
        <div className="card-details">
          <span className="name">
            {props.data.name === "" ? "Jane Appleseed" : props.data.name}
          </span>
          <span className="expiry">
            {props.data.expMm === "" ? "09" : props.data.expMm}/
            {props.data.expYy === "" ? "24" : props.data.expYy}
          </span>
        </div>
      </figcaption>
    </figure>
  );
}

export default FrontCard;
