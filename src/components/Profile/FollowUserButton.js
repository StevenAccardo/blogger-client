//DETERMINES IF THE FOLLOW OR UNFOLLOW BUTTON SHOULD BE RENDERED

import React from 'react';

const FollowUserButton = ({ currentUser, profile, unfollow, follow }) => {
  if (!currentUser || profile.username === currentUser.username) {
    return null;
  }

  //Determines which action creator to trigger.
  const handleClick = ev => {
    ev.preventDefault();
    if (profile.following) {
      unfollow(profile.username);
    } else {
      follow(profile.username);
    }
  };

  return (
    <button className="profilePage__userInfo__followButton btn btn-sm" onClick={handleClick}>
      <i className="followButton__icon ion-plus-round" />
      &nbsp;
      {/* If the user is following the profile, then display Unfollow, otherwise display follow */}
      {profile.following ? 'Unfollow' : 'Follow'} {profile.username}
    </button>
  );
};

export default FollowUserButton;
