//THE CONTAINER FOR THE INDIVIDUAL ARTICLES

import React from 'react';
import ListPagination from './ListPagination';
import ArticlePreview from './ArticlePreview';

const ArticleList = props => {
  //If the articles property in the store is still null because the http response hasn't been received yet.
  if (!props.articles) {
    return <div className="articlePreview">Loading...</div>;
  }

  //If there are no articles
  if (props.articles.length === 0) {
    return <div className="articlePreview">No articles are here... yet.</div>;
  }

  //Otherwise, render the articles
  return (
    <div>
      {props.articles.map(article => {
        return <ArticlePreview key={article.slug} article={article} />;
      })}

      <ListPagination articlesCount={props.articlesCount} currentPage={props.currentPage} onSetPage={props.onSetPage} />
    </div>
  );
};

export default ArticleList;
