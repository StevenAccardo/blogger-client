import { PROFILE_PAGE_LOADED, PROFILE_FAVORITES_PAGE_LOADED, PROFILE_PAGE_UNLOADED, PROFILE_FAVORITES_PAGE_UNLOADED, FOLLOW_USER, UNFOLLOW_USER } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    //Loads the profile information
    case PROFILE_PAGE_LOADED:
    case PROFILE_FAVORITES_PAGE_LOADED:
      return {
        ...action.payload[0].profile
      };
    case PROFILE_PAGE_UNLOADED:
    case PROFILE_FAVORITES_PAGE_UNLOADED:
      return {};
    case FOLLOW_USER:
    case UNFOLLOW_USER:
      return {
        ...action.payload.profile
      };
    default:
      return state;
  }
};
