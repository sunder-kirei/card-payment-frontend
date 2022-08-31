import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import tick from "../images/icon-complete.svg";

function Form(props) {
  const formik = useFormik({
    initialValues: { ...props.data },
    validateOnChange: true,
    validationSchema: Yup.object({
      cardNumber: Yup.string()
        .min(19, "Card number is too short")
        .required("Required"),
      name: Yup.string().required("Required").min(4, "Name field too short"),
      expMm: Yup.string().required("Required").min(2, "Invalid"),
      expYy: Yup.string().required("Required").min(2, "Invalid"),
      cvc: Yup.string().required("Required").min(3, "Invalid"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  function capitalize(string) {
    string = string.replace(/[0-9]/g, "");
    let newString = "";
    for (let i = 0; i < string.length; i++) {
      if (i == 0 || (i > 0 && string[i - 1] === " ")) {
        newString =
          string.slice(0, i) + string[i].toUpperCase() + string.slice(i + 1);
      }
    }
    return newString;
  }

  function cardFormat(string) {
    let v = string.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    let matches = v.match(/\d{4,16}/g);
    let match = (matches && matches[0]) || "";
    let parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return string;
    }
  }

  function onChange(e) {
    formik.setValues({
      ...props.data,
      [e.target.name]:
        e.target.name === "name"
          ? capitalize(e.target.value)
          : cardFormat(e.target.value),
    });
  }

  const [isSubmit, setIsSubmit] = useState(false);

  function handleSubmit() {
    setIsSubmit(!isSubmit);
    formik.handleSubmit();
  }

  if (!isSubmit) {
    return (
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="division">
            <label>CARDHOLDER NAME</label>
            <input
              type="text"
              name="name"
              onChange={(e) => {
                props.onChange(e);
                onChange(e);
              }}
              value={props.data.name}
              placeholder="e.g. Jane Appleseed"
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name ? (
              <p>{formik.errors.name}</p>
            ) : null}
          </div>
          <div className="division">
            <label>CARD NUMBER</label>
            <input
              type="text"
              onChange={(e) => {
                props.onChange(e);
                onChange(e);
              }}
              value={props.data.cardNumber}
              name="cardNumber"
              placeholder="e.g. 1234 5678 9123 0000"
              onBlur={formik.handleBlur}
            />
            {formik.touched.cardNumber && formik.errors.cardNumber ? (
              <p>{formik.errors.cardNumber}</p>
            ) : null}
          </div>
          <div className="divider">
            <label>
              <span>EXP. DATE(MM/YY)</span> <span>CVC</span>
            </label>
            <div className="wrapper">
              <span className="expiry">
                <input
                  type="text"
                  onChange={(e) => {
                    props.onChange(e);
                    onChange(e);
                  }}
                  value={props.data.expMm}
                  name="expMm"
                  placeholder="MM"
                  maxLength={2}
                  onBlur={formik.handleBlur}
                />

                <input
                  type="text"
                  onChange={(e) => {
                    props.onChange(e);
                    onChange(e);
                  }}
                  value={props.data.expYy}
                  name="expYy"
                  placeholder="YY"
                  maxLength={2}
                  onBlur={formik.handleBlur}
                />
              </span>
              <span className="cvc">
                <input
                  type="text"
                  onChange={(e) => {
                    props.onChange(e);
                    onChange(e);
                  }}
                  value={props.data.cvc}
                  name="cvc"
                  placeholder="e.g. 123"
                  maxLength={3}
                  onBlur={formik.handleBlur}
                />
              </span>
            </div>
            <div className="errors">
              {formik.touched.expMm && formik.errors.expMm ? (
                <p>{formik.errors.expMm}</p>
              ) : null}
              {formik.touched.expYy && formik.errors.expYy ? (
                <p id="expYy">{formik.errors.expYy}</p>
              ) : null}
              {formik.touched.cvc && formik.errors.cvc ? (
                <p>{formik.errors.cvc}</p>
              ) : null}
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
          <button onClick={handleSubmit}>Continue</button>
        </div>
      </>
    );
  }
}

export default Form;
