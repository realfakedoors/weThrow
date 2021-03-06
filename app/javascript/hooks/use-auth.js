import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

export const authContext = createContext();

// Wraps <App /> and makes an auth object available to any child component that calls useAuth().
export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

// Child components can get the auth object, and then re-render when it changes, using useContext.
export const useAuth = () => {
  return useContext(authContext);
};

export const useProvideAuth = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userProfilePicture, setUserProfilePicture] = useState(null);
  const [adminStatus, setAdminStatus] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("weThrowAuthToken")) {
      setUserToken(localStorage.getItem("weThrowAuthToken"));
    }
  }, []);

  useEffect(() => {
    if (userToken) {
      setUserLoggedIn(true);
      try {
        const decoded = jwt_decode(userToken);
        setUserId(decoded.sub);
        setUserName(decoded.name);
        setUserProfilePicture(decoded.profile_picture);
        setAdminStatus(decoded.admin);
      } catch (error) {
        console.error(error.message);
      }
    } else {
      setUserLoggedIn(false);
      setUserId(null);
      setAdminStatus(false);
    }
  }, [userToken]);

  const signin = (email, password) => {
    return axios
      .post("/users/sign_in", {
        user: {
          email: email,
          password: password,
        },
      })
      .then((response) => {
        const authToken = response.headers.authorization;
        localStorage.setItem("weThrowAuthToken", authToken);
        setUserToken(authToken);
      });
  };

  const signup = (username, name, email, password) => {
    return axios.post("users", {
      user: {
        username: username,
        name: name,
        email: email,
        password: password,
      },
    });
  };

  const confirmPassword = (token) => {
    return axios.get(`/users/confirmation?confirmation_token=${token}`);
  };

  const signout = () => {
    return axios
      .delete("/users/sign_out")
      .then(() => {
        localStorage.removeItem("weThrowAuthToken");
        setUserToken(null);
        setAdminStatus(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const sendPasswordReset = (email) => {
    return axios.post("/users/password", {
      user: {
        email: email,
      },
    });
  };

  const changePassword = (password, confirmation, token) => {
    return axios.put("/users/password", {
      user: {
        reset_password_token: token,
        password: password,
        password_confirmation: confirmation,
      },
    });
  };

  return {
    userLoggedIn,
    userToken,
    userId,
    userName,
    userProfilePicture,
    setUserProfilePicture,
    adminStatus,
    signin,
    signup,
    signout,
    sendPasswordReset,
    confirmPassword,
    changePassword,
  };
};
