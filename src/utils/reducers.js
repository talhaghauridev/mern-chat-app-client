// src/reducers/loginReducer.js
export const initialLoginState = {
    loading: false,
    isAuthenticated: false,
    user: {},
    message: null,
    error: null,
  };

  export const initialSigmupState = {
    loading: false,
    isAuthenticated: false,
    user: {},
    message: null,
    error: null,
  };
  
  export const loginReducer = (state, action) => {
    switch (action.type) {
      case 'LOGIN_REQUEST':
        return { ...state, loading: true };
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          loading: false,
          isAuthenticated: true,
          user: action.payload.user,
          message: action.payload.message,
        };
      case 'LOGIN_FAILURE':
        return { ...state, loading: false, error: action.payload };
      case 'CLEAR_ERRORS':
        return { ...state, error: null };
      default:
        return state;
    }
  };

  
  export const signupReducer = (state, action) => {
    switch (action.type) {
      case 'SIGNUP_REQUEST':
        return { ...state, loading: true };
      case 'SIGNUP_SUCCESS':
        return {
          ...state,
          loading: false,
          isAuthenticated: true,
          user: action.payload.user,
          message: action.payload.message,
        };
      case 'SIGNUP_FAILURE':
        return { ...state, loading: false, error: action.payload };
      case 'CLEAR_ERRORS':
        return { ...state, error: null };
      default:
        return state;
    }
  };
  
  