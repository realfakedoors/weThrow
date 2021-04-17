import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";

import axios from "axios";

import TextField from "../form_elements/TextField";
import SubmitButton from "../form_elements/SubmitButton";
import ErrorWindow from "../form_elements/ErrorWindow";

const SearchUsers = () => {
  const auth = useAuth();

  const [errorMsg, setErrorMsg] = useState("");
  const [results, setResults] = useState([]);

  function submitSearch() {
    event.preventDefault();

    const terms = document.getElementById("username-field").value;
    if (validateSearch(terms)) {
      axios
        .get("/api/search_users", { params: { search: terms } })
        .then((res) => {
          if (res.data) {
            setResults([res.data]);
          } else {
            setErrorMsg("Couldn't find anyone by that username.");
          }
        })
        .catch((err) => console.error(err));
    }
  }

  function validateSearch(terms) {
    if (terms.length === 0) {
      setErrorMsg("Enter a username!");
    } else if (terms.length > 20) {
      setErrorMsg("Usernames can't be more than 20 characters!");
    } else {
      setErrorMsg("");
      return true;
    }
    return false;
  }

  return (
    <div className={"search-users box"}>
      <form className={"search-form"} data-testid={"search-users"}>
        <TextField
          label={"Enter a weThrow username:"}
          inputId={"username-field"}
          testId={"username"}
          maxLength={20}
        />
        <SubmitButton
          color={"is-success"}
          displayText={"Search"}
          clickFunction={() => submitSearch()}
        />
        <ErrorWindow errorMsg={errorMsg} />
      </form>
      <div className={"results"}>
        {results
          .filter((result) => {
            if (result.id === parseInt(auth.userId)) {
              return false;
            }
            return true;
          })
          .map((result, i) => {
            return (
              <div key={i} className={"media-object search-result"}>
                <span className={"username title is-5"}>{result.username}</span>
                <Link
                  to={`/send_friend_request/${result.id}`}
                  className={"button is-link"}
                >
                  Request Friendship
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SearchUsers;
