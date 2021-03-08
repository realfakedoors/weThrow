import React from "react";

const Contact = () => {
  return (
    <div className={"company-page box"}>
      <div className={"content"}>
        <h1>{"Drop Us A Line"}</h1>
        <p>{"Let us know what you think of weThrow!"}</p>
        <form>
          <textarea className={"textarea is-primary"}></textarea>
          <input
            type={"submit"}
            className={"button is-primary contact-submit-button"}
            value={"contact weThrow"}
          ></input>
        </form>
      </div>
    </div>
  );
};

export default Contact;
