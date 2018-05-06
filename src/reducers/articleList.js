//A SEPERATE REDUCER FOR HANDLING ACTIONS THAT HAVE TO DO WITH THE ARTICLE LISTS AND TAGS

import {
  APPLY_TAG_FILTER,
  ARTICLE_FAVORITED,
  ARTICLE_UNFAVORITED,
  CHANGE_TAB,
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  PROFILE_PAGE_LOADED,
  PROFILE_FAVORITES_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED,
  PROFILE_FAVORITES_PAGE_UNLOADED,
  SET_PAGE
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case ARTICLE_FAVORITED:
    case ARTICLE_UNFAVORITED:
      return {
        ...state,
        articles: state.articles.map(article => {
          if (article.slug === action.payload.article.slug) {
            return {
              ...article,
              favorited: action.payload.article.favorited,
              favoritesCount: action.payload.article.favoritesCount
            };
          }
          return article;
        })
      };
    //This action gets created when the components/Home/index.js's Home component is about to mount.
    case APPLY_TAG_FILTER:
      return {
        ...state,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        tab: null,
        tag: action.tag,
        currentPage: 0
      };
    //Action created in the MainView.js file whenever the Global Feed or My Feed tabs are clicked
    case CHANGE_TAB:
      return {
        ...state,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        tab: action.tab,
        currentPage: 0
      };
    //From the Home/index.js script
    case HOME_PAGE_LOADED:
      return {
        ...state,
        //Pulls off the articles, either for the user's feed or the global feed
        articles: action.payload[1].articles,
        articlesCount: action.payload[1].articlesCount,
        //Which tab should be active when the user views the homepage.
        tab: action.tab,
        currentPage: 0
      };
    case HOME_PAGE_UNLOADED:
      return {};
    //Fetches articles written by a certain user
    case PROFILE_PAGE_LOADED:
    case PROFILE_FAVORITES_PAGE_LOADED:
      return {
        ...state,
        articles: action.payload[1].articles,
        articlesCount: action.payload[1].articlesCount,
        currentPage: 0
      };
    case PROFILE_PAGE_UNLOADED:
    case PROFILE_FAVORITES_PAGE_UNLOADED:
      return {};
    //Dispatched from MainView.js, called by ListPagination
    case SET_PAGE:
      return {
        ...state,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        currentPage: action.currentPage
      };
    default:
      return state;
  }
};
