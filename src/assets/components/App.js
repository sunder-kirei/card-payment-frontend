import React from "react";
import { useState } from "react";

import bgImg from "../images/bg-main-desktop.png";
import BackCard from "./BackCard";
import Form from "./Form";
import FrontCard from "./FrontCard";

function App() {
  const [formData, setFormData] = useState({
    cardNumber: "",
    cvc: "",
    expMm: "",
    expYy: "",
    name: "",
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
      return v;
    }
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === "name"
          ? capitalize(e.target.value)
          : cardFormat(e.target.value),
    });
  }

  return (
    <main>
      <img src={bgImg} alt="bg-img" className="background-image" />
      <Form data={formData} onChange={(e) => handleChange(e)} />
      <FrontCard data={formData} />
      <BackCard data={formData} />
    </main>
  );
}

export default App;
