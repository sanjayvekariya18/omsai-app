const initialState = {
  JobsList: [],
  EmpJobsList: [],
};

export default function jobs_reducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'GET_JOBS_LIST': {
      return {
        ...state,
        JobsList:
          action.subtype === 'success' ? action.JobsList : state.JobsList,
      };
    }
    case 'GET_EMP_JOBS_LIST': {
      return {
        ...state,
        EmpJobsList:
          action.subtype === 'success' ? action.EmpJobsList : state.EmpJobsList,
      };
    }
    case 'LOGOUT_SUCCESS': {
      return {
        ...state,
        JobsList: [],
      };
    }
    default:
      return state;
  }
}
