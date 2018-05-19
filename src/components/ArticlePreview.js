//CREATES THE INDIVIDUAL ARTICLE PREVIEWS THAT THE USER WILL SEE BEFORE CLICKING ON AN ARTICLE.

import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import agent from '../agent';
import { connect } from 'react-redux';
import { ARTICLE_FAVORITED, ARTICLE_UNFAVORITED } from '../actions/types';

const FAVORITED_CLASS = 'btn btn-sm favorited';
const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline not-favorited';

const ArticlePreview = ({ article, favorite, unfavorite, currentUser }) => {
  const favoriteButtonClass = article.favorited ? FAVORITED_CLASS : NOT_FAVORITED_CLASS;

  const handleClick = ev => {
    ev.preventDefault();
    if (article.favorited) {
      unfavorite(article.slug);
    } else {
      favorite(article.slug);
    }
  };

  const isDisabled = () => (!currentUser ? true : false);

  return (
    <div className="articlePreview">
      <div className="articlePreview__articleMeta">
        <Link to={`/@${article.author.username}`}>
          <img src={article.author.image} alt="" className="articlePreview__articleMeta__avatar mb-3 mr-2" />
        </Link>

        <div className="articlePreview__articleMeta__info">
          <Link to={`/@${article.author.username}`} className="articlePreview__articleMeta__info__author">
            {article.author.username}
          </Link>
          <span className="articlePreview__articleMeta__info__date mt-2">{new Date(article.createdAt).toDateString()}</span>
        </div>

        <div className="float-right">
          <button className={favoriteButtonClass} disabled={isDisabled()} onClick={handleClick}>
            <i className="ion-heart" /> {article.favoritesCount}
          </button>
        </div>
      </div>

      {/* Renders the article component */}
      <Link to={`/article/${article.slug}`} className="articlePreview__articleLink">
        <h1 className="articlePreview__articleLink__title">{article.title}</h1>
        <p className="articlePreview__articleLink__description">{article.description}</p>
        <span className="articlePreview__articleLink__more">Read more...</span>
        <ul className="articlePreview__tagList">
          {article.tagList.map(tag => {
            return (
              <li className="tag tag--outline" key={tag}>
                {tag}
              </li>
            );
          })}
        </ul>
      </Link>
    </div>
  );
};

const mapStateToProps = ({ common: { currentUser } }) => ({ currentUser });

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticlePreview));
