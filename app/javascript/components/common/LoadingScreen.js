import React from "react";

const LoadingScreen = () => {
  return (
    <div className={"loading-screen"}>
      <h1 className={"loading-screen-text"}>Loading...</h1>
      <img className={"loading-screen-logo"} src={"/weThrowLogo.png"} />
    </div>
  );
}

export default LoadingScreen;
