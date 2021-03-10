export const authValidations = () => {
  const emailIsPresent = (email) => {
    return email !== "" ? true : false;
  };

  const usernameIsPresent = (username) => {
    return username !== "" ? true : false;
  };

  const passwordIsPresent = (password) => {
    return password !== "" ? true : false;
  };

  const emailFormatIsCorrect = (email) => {
    return email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) ? true : false;
  };

  const passwordSameAsConfirmation = (password, confirmation) => {
    return password === confirmation ? true : false;
  };

  const passwordIsCorrectLength = (password) => {
    if (password.length >= 6 && password.length <= 128) {
      return true;
    }
    return false;
  };

  const usernameIsCorrectLength = (username) => {
    if (username.length >= 6 && username.length <= 20) {
      return true;
    }
    return false;
  };

  const nameIsCorrectLength = (name) => {
    if (name.length <= 50) {
      return true;
    }
    return false;
  };

  return {
    emailIsPresent,
    usernameIsPresent,
    passwordIsPresent,
    emailFormatIsCorrect,
    passwordSameAsConfirmation,
    passwordIsCorrectLength,
    usernameIsCorrectLength,
    nameIsCorrectLength,
  };
};
