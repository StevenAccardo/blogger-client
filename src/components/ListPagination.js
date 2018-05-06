//CREATES THE PAGINATION BUTTONS FOR SWITCHING BETWEEN DIFFERENT ARTICLES.

import React from 'react';

const ListPagination = props => {
  //If there are less than ten articles, don't show pagination
  if (props.articlesCount <= 10) {
    return null;
  }

  const range = [];
  //The Math.ceil() function returns the smallest integer greater than or equal to a given number.
  //So, if there are 101 articles, then the for loops limit will be i < 11, this is so we can put that last article (article #101) onto a page.
  for (let i = 0; i < Math.ceil(props.articlesCount / 10); ++i) {
    range.push(i);
  }

  //Calls the passed down action creator
  const setPage = page => props.onSetPage(page);

  return (
    <nav>
      <ul className="pagination">
        {range.map(page => {
          //Creates a clickable link for each page.
          //Current page being viewed by the user
          //isCurrent will be true if the pagination link is the one being viewed by the user. The default props.currentPage value is zero.
          const isCurrent = page === props.currentPage;
          const onClick = ev => {
            ev.preventDefault();
            //Calls the helper function above
            setPage(page);
          };

          //Determines which pagination link is the current one, and assigns it a class of active, otherwise not.

          return (
            <li className={isCurrent ? 'page-item active' : 'page-item'} onClick={onClick} key={page.toString()}>
              <a className="page-link" href="">
                {page + 1}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default ListPagination;
