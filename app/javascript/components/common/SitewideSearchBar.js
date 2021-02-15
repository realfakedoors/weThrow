import React from "react";

const SitewideSearchBar = () => {
  return (
    <div className="sitewide-searchbar">
      <form>
        <input
          className="input"
          type="text"
          placeholder="Search for courses, tournaments, leagues, discs..."
        />
      </form>
    </div>
  );
};

export default SitewideSearchBar;
