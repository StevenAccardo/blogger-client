//A HELPER FILE FOR MAKING AN HTTP REQUEST TO THE API

import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

//The superagentPromise library must be called with the superagent http library, and your favorite Promise library. In this case we are using the native browser Promise object that is attached to the window object.
const superagent = superagentPromise(_superagent, window.Promise);

let API_URL;
process.env.NODE_ENV === 'production' ? (API_URL = 'https://peaceful-shelf-78465.herokuapp.com') : (API_URL = 'http://localhost:3030');

//Once the promise below is complete, the responseBody callback is passed in the res from the request, and returns the body of that response.
const responseBody = res => res.body;

//Uses the let keyword to declare the token variable only in this JS file, since they are block scoped
let token = null;
//If there is a token set, then it will be appended to request object before it is sent to the server.
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
};

const requests = {
  //Once passed the url, the .get() method invokes superagent's .get() method and passes it the full url using template strings. It then creates a Promise, and passes it the responseBody function callback.
  get: url =>
    superagent
      .get(`${API_URL}${url}`)
      .use(tokenPlugin)
      .then(responseBody),
  //Same concept as above, except a body is included which will contain the email and password that the user entered.
  post: (url, body) =>
    superagent
      .post(`${API_URL}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
  put: (url, body) => {
    return superagent
      .put(`${API_URL}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody);
  },
  del: url =>
    superagent
      .del(`${API_URL}${url}`)
      .use(tokenPlugin)
      .then(responseBody)
};

//sets the limit and offset for pagination
//multiplies the count by the page number to find the offset, or how many articles should be skipped.
const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;
//Shorthand
const encode = encodeURIComponent;
//Removes the slug, so that isn't updated on the server.
const omitSlug = article => Object.assign({}, article, { slug: undefined });
//Creates an object with a method on it, that method then looks up the scope chain for the request object's get method, and passes it a portion of the url.
const Articles = {
  //Fetches the articles that will be displayed on the home page under the global feed tab.
  all: page => requests.get(`/articles?${limit(10, page)}`),
  //The encodeURIComponent() function encodes a Uniform Resource Identifier (URI) component by replacing each instance of certain characters by one, two, three, or four escape sequences representing the UTF-8 encoding of the character
  //Populates the My Articles tab view under a user's profile with articles that they have written
  byAuthor: (author, page) => requests.get(`/articles?author=${encode(author)}&${limit(10, page)}`),
  //Loads articles based off of a certain tag that the user selects in the mainview.js file.
  byTag: (tag, page) => requests.get(`/articles?tag=${encode(tag)}&${limit(10, page)}`),
  create: article => requests.post('/articles', { article }),
  del: slug => requests.del(`/articles/${slug}`),
  favorite: slug => requests.post(`/articles/${slug}/favorite`),
  //Populates the favorited tab view under a user's profile with articles that they have favorited
  favoritedBy: (author, page) => requests.get(`/articles?favorited=${encode(author)}&${limit(10, page)}`),
  //Populates the feed tab view on the home page for articles written by user's that that the logged in user follows.
  feed: page => requests.get(`/articles/feed?${limit(10, page)}`),
  get: slug => requests.get(`/articles/${slug}`),
  unfavorite: slug => requests.del(`/articles/${slug}/favorite`),
  update: article => requests.put(`/articles/${article.slug}`, { article: omitSlug(article) })
};

const Auth = {
  //invoked in the app.js component. If there was a token stored in localStorage, then current() was invoked to get the current user's data.
  current: () => requests.get('/user'),
  login: (email, password) => requests.post('/users/login', { user: { email, password } }),
  register: (username, email, password) => requests.post('/users', { user: { username, email, password } }),
  save: user => requests.put('/user', { user })
};

const Comments = {
  //Takes the slug for an article and returns it's comments
  create: (slug, comment) => requests.post(`/articles/${slug}/comments`, { comment }),
  delete: (slug, commentId) => requests.del(`/articles/${slug}/comments/${commentId}`),
  forArticle: slug => requests.get(`/articles/${slug}/comments`)
};

const Profile = {
  follow: username => requests.post(`/profiles/${username}/follow`),
  get: username => requests.get(`/profiles/${username}`),
  unfollow: username => requests.del(`/profiles/${username}/follow`)
};

const Tags = {
  //Fetches all of the tags
  getAll: () => requests.get('/tags')
};

//exports an object with the Article and Auth objects as properties.
export default {
  Articles, //Articles: Articles
  Auth, //Auth: Auth
  Comments,
  Profile,
  Tags,
  //This method is called from the middlware.js file, in the localStorageMiddleware function, whenever a user logs in or registers. The middlware takes the jwt from the response and puts it into localStorage, and then invokes this method, and passes it as the argument. Then this method sets the token variable that was declared at the top of this file, which can now be used for any future requests.
  //Also called from the app.js file in order to check if a user had already logged in previously.
  setToken: _token => (token = _token)
};
