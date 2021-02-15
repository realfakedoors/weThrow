import React from "react";

const About = () => {
  return (
    <div className={"company-page box"}>
      <div className={"content"}>
        <h1>{"Why weThrow?"}</h1>
        <p>
          {
            "My goal with this project was to build an app that my friends and I can use when we're out there throwing."
          }
        </p>
        <h1>{"Who are you?"}</h1>
        <p>{"I'm Andy, a Michigan-born, Denver-based disc golfer and self-taught full-stack web developer. I also enjoy card/board games and cheering for the Detroit Red Wings."}</p>
        <h1>{"Why use this over "}<a href={"https://udisc.com/"}>uDisc?</a></h1>
        <p>{"This is meant to be an emulation of uDisc as an exercise in building your favorite app. I chose uDisc because of how well-made and functional it is, and my version is clearly inferior."}</p>
      </div>
    </div>
  );
};

export default About;
