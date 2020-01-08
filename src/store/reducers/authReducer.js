import { AUTH, } from "../actions";

const initial_state = {
  isAuthenticated: [],
  
};


const reducer = (state = initial_state, action) => {
    switch (action.type) {
      case AUTH: {
        console.log("reducers Auth");
        let auth = [...state.isAuthenticated,{...action.payload},];

        return {
          ...state,

          isAuthenticated: auth
        };
      }
  
  
      default: {
        return state;
      }
    }
  };
  
  export default reducer;
  