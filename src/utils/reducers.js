import { LOGIN, SIGNUP } from "@/constants";

export const initialLoginState = {
  loading: false,
  isAuthenticated: false,
  user: {},
  message: null,
  error: null,
};

export const initialSignupState = {
  loading: false,
  isAuthenticated: false,
  user: {},
  message: null,
  error: null,
};

export const loginReducer = (state, action) => {
  switch (action.type) {
    case LOGIN.REQUEST:
      return { ...state, loading: true };
    case LOGIN.SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        message: action.payload.message,
      };
    case LOGIN.FAILURE:
      return { ...state, loading: false, error: action.payload };
    case LOGIN.CLEAR_ERRORS:
      return { ...state, error: null };
    default:
      return state;
  }
};

export const signupReducer = (state, action) => {
  switch (action.type) {
    case SIGNUP.REQUEST:
      return { ...state, loading: true };
    case SIGNUP.SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        message: action.payload.message,
      };
    case SIGNUP.FAILURE:
      return { ...state, loading: false, error: action.payload };
    case SIGNUP.CLEAR_ERRORS:
      return { ...state, error: null };
    default:
      return state;
  }
};