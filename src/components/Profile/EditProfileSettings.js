//DETERMINES IF THE USER SHOULD SEE EDIT OPTIONS ON THE PROFILE VIEW, OR NOT

import React from 'react';
import { Link } from 'react-router-dom';

const EditProfileSettings = ({ currentUser, profile }) => {
  //Checks to see if the profile belongs to the logged in user
  if (currentUser && profile.username === currentUser.username) {
    return (
      <Link to="/settings" className="profilePage__userInfo__editButton btn btn-sm btn-outline">
        <i className="editButton__icon ion-gear-a" /> Edit Profile Settings
      </Link>
    );
  }
  //Doesn't render if the logged in user is not the profile owner
  return null;
};
export default EditProfileSettings;
