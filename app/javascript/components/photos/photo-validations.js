export const photoValidations = () => {
  const photoIsTooLarge = (size) => {
    // 5MB = 5,242,880 bytes.
    return size > 5242880 ? true : false;
  };

  const correctType = (name) => {
    return name.match(/\.(jpg|jpeg|png)$/) ? true : false;
  };

  return {
    photoIsTooLarge,
    correctType,
  };
};
