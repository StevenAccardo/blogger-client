//A COMPONENT STRICTLY USED FOR RENDERING ANY HTTP RESPONSE ERRORS FROM THE LOGIN FLOW ONTO THE SCREEN FOR THE USER TO SEE.
import React from 'react';

const ListErrors = ({ errors }) => {
  if (errors) {
    return (
      //Object.keys(errors) returns an array of the errors object's property names, or keys.
      //The map method, is then used to iterate through that array of keys, and creates a list-item for each key. The li will display the propety name, and then the value of that property.
      <ul className="error-messages">
        {Object.keys(errors).map(key => {
          return (
            <li key={key}>
              {key} {errors[key]}
            </li>
          );
        })}
      </ul>
    );
  } else {
    return null;
  }
};

export default ListErrors;
