export const authValidations = () => {
  const emailIsPresent = (email) => {
    return email !== "" ? true : false;
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

  return {
    emailIsPresent,
    passwordIsPresent,
    emailFormatIsCorrect,
    passwordSameAsConfirmation,
    passwordIsCorrectLength,
  };
};
