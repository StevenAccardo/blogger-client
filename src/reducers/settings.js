import { SETTINGS_SAVED, ASYNC_START } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    //Chaneges the inProgress property when an http request has ended, and populates the errors property if there was a request error.
    case SETTINGS_SAVED:
      return {
        ...state,
        inProgress: false,
        errors: action.error ? action.payload.errors : null
      };
    //Changes the inProgress property when an http request begins
    case ASYNC_START:
      return {
        ...state,
        inProgress: true
      };
    default:
      return state;
  }
};
