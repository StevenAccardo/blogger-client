import { ASYNC_START, LOGIN, REGISTER, LOGIN_PAGE_UNLOADED, REGISTER_PAGE_UNLOADED } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    //An action with the type of ASYNC_START will be fired off, anytime that an http request is being made.
    //It will also have a subtype, if that subtype is Login, then we will want to disable the login submit button. The inProgess property will  be set to true, and that will let the component know to disable the button until the inProgess property is switched back to false.
    case ASYNC_START:
      if (action.subtype === 'LOGIN' || action.subtype === 'REGISTER') {
        return { ...state, inProgess: true };
      } else {
        return state;
      }
    //Both login and register are handled the same way, so you can return the same object for both
    case LOGIN:
    case REGISTER:
      return {
        ...state,
        inProgess: false,
        errors: action.error ? action.payload.errors : null
      };
    //Returns empty object, and clears out the state so if you travel back to the login page, the fields will be reset.
    case LOGIN_PAGE_UNLOADED:
    case REGISTER_PAGE_UNLOADED:
      return {};
    default:
      return state;
  }
};
