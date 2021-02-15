import React from "react";

const Help = () => {
  return (
    <div className={"company-page box"}>
      <div className={"content"}>
        <h1>{"Help"}</h1>
        <p>{"If you have issues with weThrow, we'd love to help you!"}</p>
        <form>
          <textarea className={"textarea is-primary"}></textarea>
          <input type={"submit"} className={"button is-primary contact-submit-button"} value={"contact weThrow"}></input>
        </form>
      </div>
    </div>
  );
};

export default Help;
