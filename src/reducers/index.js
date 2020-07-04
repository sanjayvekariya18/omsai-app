import {combineReducers} from 'redux';

import auth from './Auth';
import employees from './Employees';
import jobs from './Jobs';
import statuses from './Status';
import types from './Types';

const appReducer = combineReducers({
  auth,
  employees,
  jobs,
  statuses,
  types,
  // companies,
  // contacts,
  // assets,
  // lead,
});

const rootReducer = (state = {}, action) => {
  return appReducer(state, action);
};

export default rootReducer;
