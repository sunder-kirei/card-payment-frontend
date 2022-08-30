import React, { useState } from "react";

import tick from "../images/icon-complete.svg";

function Form(props) {
  const errorMsgs = {
    required: "This is a mandatory field",
    pattern: "Invalid format",
    length: "The input is too short",
  };

  const [isSubmit, setIsSubmit] = useState(false);

  function handleSubmit() {
    setIsSubmit(!isSubmit);
  }

  if (!isSubmit) {
    return (
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="division">
            <label>CARDHOLDER NAME</label>
            <input
              type="text"
              onChange={(e) => props.onChange(e)}
              value={props.data.name}
              name="name"
              placeholder="e.g. Jane Appleseed"
            />
          </div>
          <div className="division">
            <label>CARD NUMBER</label>
            <input
              type="text"
              onChange={(e) => props.onChange(e)}
              value={props.data.cardNumber}
              name="cardNumber"
              placeholder="e.g. 1234 5678 9123 0000"
            />
          </div>
          <div className="divider">
            <label>
              <span>EXP. DATE(MM/YY)</span> <span>CVC</span>
            </label>
            <div className="wrapper">
              <span className="expiry">
                <input
                  type="text"
                  onChange={(e) => props.onChange(e)}
                  value={props.data.expMm}
                  name="expMm"
                  placeholder="MM"
                />
                <input
                  type="text"
                  onChange={(e) => props.onChange(e)}
                  value={props.data.expYy}
                  name="expYy"
                  placeholder="YY"
                />
              </span>
              <span className="cvc">
                <input
                  type="text"
                  onChange={(e) => props.onChange(e)}
                  value={props.data.cvc}
                  name="cvc"
                  placeholder="e.g. 123"
                />
              </span>
            </div>
          </div>
          <input type="submit" value="Confirm" />
        </form>
      </div>
    );
  } else {
    return (
      <>
        <div className="completed">
          <img src={tick} alt="completed" />
          <h1>THANK YOU!</h1>
          <br />
          <span>We've added your card details</span>
          <br />
          <button>Continue</button>
        </div>
      </>
    );
  }
}

export default Form;
