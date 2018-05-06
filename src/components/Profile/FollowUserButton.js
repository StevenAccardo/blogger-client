//DETERMINES IF THE FOLLOW OR UNFOLLOW BUTTON SHOULD BE RENDERED

import React from 'react';

const FollowUserButton = props => {
  //If the logged in user owns the profile, don't show anything.
  if (props.isUser) {
    return null;
  }

  //Determines which action creator to trigger.
  const handleClick = ev => {
    ev.preventDefault();
    if (props.user.following) {
      props.unfollow(props.user.username);
    } else {
      props.follow(props.user.username);
    }
  };

  return (
    <button className="follow-button btn btn-sm" onClick={handleClick}>
      <i className="ion-plus-round" />
      &nbsp;
      {/* If the user is following the profile, then display Unfollow, otherwise display follow */}
      {props.user.following ? 'Unfollow' : 'Follow'} {props.user.username}
    </button>
  );
};

export default FollowUserButton;
