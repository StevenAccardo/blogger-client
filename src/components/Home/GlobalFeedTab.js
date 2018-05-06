//RENDERS A LIST OF ALL ARTICLES

import React from 'react';
import agent from '../../agent';

const GlobalFeedTab = props => {
  const clickHandler = ev => {
    ev.preventDefault();
    //Initiates promise to fetch the global feed articles, and fires the action creator to change tabs
    props.onTabClick('all', agent.Articles.all());
  };
  return (
    <li className="nav-item">
      <a href="" className={props.tab === 'all' ? 'global-feed nav-link active' : 'global-feed nav-link'} onClick={clickHandler}>
        Global Feed
      </a>
    </li>
  );
};

export default GlobalFeedTab;
