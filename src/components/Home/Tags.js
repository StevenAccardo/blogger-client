//CREATES THE TAG LIST IN THE TOP RIGHT OF SIDE BAR.

import React from 'react';
import agent from '../../agent';

const Tags = ({ tags, onClickTag }) => {
  //If the tags were fetched successfully on the homepage render
  if (tags) {
    return (
      <div className="tag-list">
        {tags.map(tag => {
          const handleClick = ev => {
            ev.preventDefault();
            //If tag pill is clicked, fire off http request to retrieve all articles by that tag, also will create a tab on the homescreen for the specific tag
            onClickTag(tag, agent.Articles.byTag(tag));
          };
          //Renders each tag
          return (
            <a href="" className="tag-default tag-pill" key={tag} onClick={handleClick}>
              {tag}
            </a>
          );
        })}
      </div>
    );
  } else {
    return <div>Loading Tags...</div>;
  }
};

export default Tags;
