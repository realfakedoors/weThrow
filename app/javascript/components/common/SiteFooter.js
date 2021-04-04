import React from "react";

import { Link } from "react-router-dom";

const SiteFooter = () => {
  return (
    <footer className={"footer site-footer"}>
      <nav className={"navbar footer-nav"}>
        <Link to={"/about"} className={"navbar-item"}>
          About
        </Link>
        <Link to={"/contact"} className={"navbar-item"}>
          Contact
        </Link>
        <Link to={"/jobs"} className={"navbar-item"}>
          Jobs
        </Link>
        <Link to={"/help"} className={"navbar-item"}>
          Help
        </Link>
      </nav>
      <div className={"content has-text-centered"}>
        <p>
          <strong>weThrow</strong> is a not-for-profit portfolio project by{" "}
          <a href="https://github.com/realfakedoors">Andy Holt</a>. Source code
          is licensed{" "}
          <a href="https://opensource.org/licenses/mit-license.php">MIT</a>.
          <br />
          100% open source forever.
          <a href="https://github.com/realfakedoors/weThrow"> Check it out.</a>
        </p>
      </div>
    </footer>
  );
};

export default SiteFooter;
