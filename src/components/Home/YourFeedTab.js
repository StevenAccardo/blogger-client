//RENDERS A LIST OF ARTICLES WHERE THE USER FOLLOWS THE AUTHOR OF THE ARTICLES

import React from 'react';
import agent from '../../agent';

//The Your Feed tab will only show up if there is a token present, and therefore the user is logged in.
const YourFeedTab = ({ token, onTabClick, tab }) => {
  //Checks if user is logged in, otherwise the component isn't rendered
  if (token) {
    //If clicked, the function will be invoked, an HTTP request will be initiated to fetch the user's feed, and the onTabClick action creator will be fired off with the response.
    const clickHandler = ev => {
      ev.preventDefault();
      //Initiates promise to fetch the user's feed articles, and fires the action creator to change tabs with the appropriate tab argument value
      onTabClick('feed', agent.Articles.feed());
    };

    return (
      <li className="nav-item">
        <a href="" className={tab === 'feed' ? 'yourFeed nav-link active ' : ' yourFeed nav-link'} onClick={clickHandler}>
          Your Feed
        </a>
      </li>
    );
  }
  return null;
};

export default YourFeedTab;
