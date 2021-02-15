import React from "react";

const Jobs = () => {
  return (
    <div className={"company-page box"}>
      <div className={"content"}>
        <h1 className={"has-text-centered"}>Careers at weThrow</h1>
        <h4>
          {
            "Just for fun, Here's an example of a few job postings we might put up as an actively hiring company:"
          }
        </h4>
      </div>
      <article className="media">
        <div className="media-content">
          <div className="content">
            <p>
              <strong>{"IT Wizard"}</strong> <small>{"no experience required"}</small>
              <br />
              {
                "Seeking someone to put out fires, literally and figuratively."
              }
            </p>
            <strong>{"$140,000/yr"}</strong>
          </div>
          <button className={"company-apply-button button is-primary"}>Apply</button>
        </div>
      </article>
      <article className="media">
        <div className="media-content">
          <div className="content">
            <p>
              <strong>{"Receptionist"}</strong> <small>{"4+ years experience required"}</small>
              <br />
              {
                "We need someone who's down to order pizza and adjust the thermostat."
              }
            </p>
            <strong>{"$30,000/yr"}</strong>
          </div>
          <button className={"company-apply-button button is-primary"}>Apply</button>
        </div>
      </article>
      <article className="media">
        <div className="media-content">
          <div className="content">
            <p>
              <strong>{"Tennis Coach"}</strong> <small>{"6+ days experience required"}</small>
              <br />
              {
                "Our CFO needs help with his backhand slice."
              }
            </p>
            <strong>{"$50/lesson"}</strong>
          </div>
          <button className={"company-apply-button button is-primary"}>Apply</button>
        </div>
      </article>
    </div>
  );
};

export default Jobs;
