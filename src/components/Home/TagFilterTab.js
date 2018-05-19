//DECIDES WHETHER A TAB SHOULD BE RENDER FOR A USER CLICKED TAG

import React from 'react';

const TagFilterTab = ({ tag }) => {
  //If no tag prop then don't render
  if (!tag) {
    return null;
  }
  //Otherwise, render a tab.
  //When the tab is clicked it causes the whole app to re-render and clears the tab
  return (
    <li className="nav-item">
      <a href="" className="tagFilter nav-link active">
        <i className="ion-pound" /> {tag}
      </a>
    </li>
  );
};

export default TagFilterTab;
