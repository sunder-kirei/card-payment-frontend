import React from "react";

import backCardImg from "../images/bg-card-back.png";

function BackCard(props) {
  return (
    <figure className="card-back">
      <img src={backCardImg} alt="back-card" />
      <figcaption className="cvc">
        {props.data.cvc === "" ? "000" : props.data.cvc}
      </figcaption>
    </figure>
  );
}

export default BackCard;
