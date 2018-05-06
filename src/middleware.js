//CUSTOM MIDDLEWARE FOR HANDLING PROMISES

import agent from './agent';

//Checks to see if the action.payload is a promise
function isPromise(payload) {
  //returns true if there is a payload and the promise is a function.
  return payload && typeof payload.then === 'function';
}

const promiseMiddleware = store => next => action => {
  if (isPromise(action.payload)) {
    //Fires of an action each time that an http request is initiated
    store.dispatch({ type: 'ASYNC_START', subtype: action.type });
    //replaces the action.payload with the response from the promise, and then dipatches the whole action.
    action.payload.then(
      res => {
        action.payload = res;
        store.dispatch(action);
      },
      //Sets the error property to true, replaces the action.payload with the error from the promise, and then dipatches the whole action.
      error => {
        console.log('ERROR', error);
        action.error = true;
        action.payload = error.response.body;
        store.dispatch(action);
      }
    );

    return;
  }

  next(action);
};

//stores the jwt in the localStorage
const localStorageMiddleware = store => next => action => {
  //If user logs in or registers without error, store the token in localStorage
  if (action.type === 'REGISTER' || action.type === 'LOGIN') {
    if (!action.error) {
      window.localStorage.setItem('jwt', action.payload.user.token);
      agent.setToken(action.payload.user.token);
    }
    //If the user logsout, remove the token from localStorage
  } else if (action.type === 'LOGOUT') {
    window.localStorage.setItem('jwt', '');
    agent.setToken(null);
  }

  next(action);
};

export { localStorageMiddleware, promiseMiddleware };
