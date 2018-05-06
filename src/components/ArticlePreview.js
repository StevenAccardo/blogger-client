//CREATES THE INDIVIDUAL ARTICLE PREVIEWS THAT THE USER WILL SEE BEFORE CLICKING ON AN ARTICLE.

import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import agent from '../agent';
import { connect } from 'react-redux';
import { ARTICLE_FAVORITED, ARTICLE_UNFAVORITED } from '../actions/types';

const FAVORITED_CLASS = 'btn btn-sm favorited';
const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline not-favorited';

const ArticlePreview = ({ article, favorite, unfavorite }) => {
  const favoriteButtonClass = article.favorited ? FAVORITED_CLASS : NOT_FAVORITED_CLASS;

  const handleClick = ev => {
    ev.preventDefault();
    if (article.favorited) {
      unfavorite(article.slug);
    } else {
      favorite(article.slug);
    }
  };

  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`/@${article.author.username}`}>
          <img src={article.author.image} alt="" className="mb-3 mr-2" />
        </Link>

        <div className="info">
          <Link to={`/@${article.author.username}`} className="author">
            {article.author.username}
          </Link>
          <span className="date mt-2">{new Date(article.createdAt).toDateString()}</span>
        </div>

        <div className="float-right">
          <button className={favoriteButtonClass} onClick={handleClick}>
            <i className="ion-heart" /> {article.favoritesCount}
          </button>
        </div>
      </div>

      {/* Renders the article component */}
      <Link to={`/article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {article.tagList.map(tag => {
            return (
              <li className="tag-default tag-pill tag-outline" key={tag}>
                {tag}
              </li>
            );
          })}
        </ul>
      </Link>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  favorite: slug =>
    dispatch({
      type: ARTICLE_FAVORITED,
      payload: agent.Articles.favorite(slug)
    }),
  unfavorite: slug =>
    dispatch({
      type: ARTICLE_UNFAVORITED,
      payload: agent.Articles.unfavorite(slug)
    })
});

export default withRouter(connect(null, mapDispatchToProps)(ArticlePreview));
