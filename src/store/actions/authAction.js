export const AUTH = "AUTH";

export const auth = (userObj) => {
    // console.log(userObj);
    return {
      type: AUTH,
      payload: userObj
    };
  };
  