//REDUCER FOR POPULATING THE STATE WITH ARTICLES FROM THE HTTP RESPONSE FROM THE API

import { HOME_PAGE_LOADED, HOME_PAGE_UNLOADED } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    //From Home/index.js script
    case HOME_PAGE_LOADED:
      return {
        ...state,
        //All the tags that were fetched from the server
        tags: action.payload[0].tags
      };
    case HOME_PAGE_UNLOADED:
      return {};
    default:
      return state;
  }
};
