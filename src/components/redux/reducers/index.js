const loggedReducer = (state = "", action) => {
  if (action.type === "SIGN_IN") {
    return {
      signed: true
    };
  }

  if (action.type === "SIGN_OUT") {
    return {
      signed: false
    };
  }

  return state;
};

export default loggedReducer;
