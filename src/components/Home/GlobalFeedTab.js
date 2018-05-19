//RENDERS A LIST OF ALL ARTICLES

import React from 'react';
import agent from '../../agent';

const GlobalFeedTab = ({ onTabClick, tab }) => {
  const clickHandler = ev => {
    ev.preventDefault();
    //Initiates promise to fetch the global feed articles, and fires the action creator to change tabs
    onTabClick('all', agent.Articles.all());
  };
  return (
    <li className="nav-item">
      <a href="" className={tab === 'all' ? 'globalFeed nav-link active' : 'globalFeed nav-link'} onClick={clickHandler}>
        Global Feed
      </a>
    </li>
  );
};

export default GlobalFeedTab;
