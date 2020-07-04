const initialState = {
  StatusList: [],
};

export default function statuses_reducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'GET_STATUS_LIST': {
      return {
        ...state,
        StatusList:
          action.subtype === 'success' ? action.StatusList : state.StatusList,
      };
    }
    case 'LOGOUT_SUCCESS': {
      return {
        ...state,
        StatusList: [],
      };
    }
    default:
      return state;
  }
}
