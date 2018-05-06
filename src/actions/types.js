//ALL OF THE ACTION TYPES

//article.js
export const ARTICLE_PAGE_LOADED = 'ARTICLE_PAGE_LOADED';
export const ARTICLE_PAGE_UNLOADED = 'ARTICLE_PAGE_UNLOADED';
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

//articleList.js
export const APPLY_TAG_FILTER = 'APPLY_TAG_FILTER';
export const ARTICLE_FAVORITED = 'ARTICLE_FAVORITED';
export const ARTICLE_UNFAVORITED = 'ARTICLE_UNFAVORITED';
export const CHANGE_TAB = 'CHANGE_TAB';
export const SET_PAGE = 'SET_PAGE';

//auth.js
export const LOGIN = 'LOGIN'; //Also used in the common.js reducer
export const REGISTER = 'REGISTER'; //Also used in the common.js reducer
export const LOGIN_PAGE_UNLOADED = 'LOGIN_PAGE_UNLOADED';
export const REGISTER_PAGE_UNLOADED = 'REGISTER_PAGE_UNLOADED';
export const ASYNC_START = 'ASYNC_START'; //Also used in the editor.js and settings.js reducers

//common.js
export const APP_LOAD = 'APP_LOAD';
export const ARTICLE_SUBMITTED = 'ARTICLE_SUBMITTED'; //Also used in the editor.js reducer
export const DELETE_ARTICLE = 'DELETE_ARTICLE';
export const LOGOUT = 'LOGOUT';
export const REDIRECT = 'REDIRECT';

//editor.js
export const EDITOR_PAGE_LOADED = 'EDITOR_PAGE_LOADED';
export const EDITOR_PAGE_UNLOADED = 'EDITOR_PAGE_UNLOADED';
export const ADD_TAG = 'ADD_TAG';
export const REMOVE_TAG = 'REMOVE_TAG';
export const UPDATE_FIELD_EDITOR = 'UPDATE_FIELD_EDITOR';

//home.js
export const HOME_PAGE_LOADED = 'HOME_PAGE_LOADED'; //Also used in the articleList.js reducer
export const HOME_PAGE_UNLOADED = 'HOME_PAGE_UNLOADED'; //Also used in the articleList.js reducer

//profile.js
export const PROFILE_PAGE_LOADED = 'PROFILE_PAGE_LOADED'; //Also used in the articleList.js reducer
export const PROFILE_FAVORITES_PAGE_LOADED = 'PROFILE_FAVORITES_PAGE_LOADED'; //Also used in the articleList.js reducer
export const PROFILE_PAGE_UNLOADED = 'PROFILE_PAGE_UNLOADED'; //Also used in the articleList.js reducer
export const PROFILE_FAVORITES_PAGE_UNLOADED = 'PROFILE_FAVORITES_PAGE_UNLOADED'; //Also used in the articleList.js reducer
export const FOLLOW_USER = 'FOLLOW_USER';
export const UNFOLLOW_USER = 'UNFOLLOW_USER';

//settings.js
export const SETTINGS_SAVED = 'SETTINGS_SAVED'; //Also used in the common.js reducer
