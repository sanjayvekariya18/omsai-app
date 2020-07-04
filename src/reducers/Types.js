const initialState = {
  TypesList: [],
};

export default function types_reducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'GET_TYPES_LIST': {
      return {
        ...state,
        TypesList:
          action.subtype === 'success' ? action.TypesList : state.TypesList,
      };
    }
    case 'LOGOUT_SUCCESS': {
      return {
        ...state,
        TypesList: [],
      };
    }
    default:
      return state;
  }
}
