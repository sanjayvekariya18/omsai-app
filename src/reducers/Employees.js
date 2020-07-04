const initialState = {
  EmployeesList: [],
};

export default function employees_reducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'GET_EMPLOYEES_LIST': {
      return {
        ...state,
        EmployeesList:
          action.subtype === 'success'
            ? action.EmployeesList
            : state.EmployeesList,
      };
    }
    case 'LOGOUT_SUCCESS': {
      return {
        ...state,
        EmployeesList: [],
      };
    }
    default:
      return state;
  }
}
