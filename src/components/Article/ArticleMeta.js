//CONTAINS DETAILS ABOUT THE ARTICLE'S AUHTOR AS WELL AS ANY ACTIONS THE USER CAN TAKE ON THE ARTICLE.

import React from 'react';
import { Link } from 'react-router-dom';
import ArticleActions from './ArticleActions';

const ArticleMeta = ({ article, canModify }) => {
  return (
    <div className="articlePage__banner__articleMeta">
      <Link to={`/@${article.author.username}`}>
        <img className="articlePage__banner__articleMeta__avatar" src={article.author.image} alt="" />
      </Link>

      <div className="articlePage__banner__articleMeta__info">
        <Link to={`/@${article.author.username}`} className="articlePage__banner__articleMeta_info__author mb-1">
          {article.author.username}
        </Link>
        <span className="articlePage__banner__articleMeta__info__date">{new Date(article.createdAt).toDateString()}</span>
      </div>
      <ArticleActions canModify={canModify} article={article} />
    </div>
  );
};

export default ArticleMeta;
