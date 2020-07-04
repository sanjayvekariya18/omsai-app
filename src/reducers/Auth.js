const initialState = {
  userCredentials: undefined,
  user_credentials: undefined,
};

export default function auth_reducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'LOGIN_SUCCESS': {
      return {
        ...state,
        userCredentials:
          action.subtype === 'success'
            ? action.userCredentials
            : state.userCredentials,
      };
    }
    case 'LOGOUT_SUCCESS': {
      return {
        ...state,
        userCredentials: undefined,
        user_credentials: undefined,
      };
    }
    default:
      return state;
  }
}
