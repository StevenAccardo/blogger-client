//CONTAINS DETAILS ABOUT THE ARTICLE'S AUHTOR AS WELL AS ANY ACTIONS THE USER CAN TAKE ON THE ARTICLE.

import React from 'react';
import { Link } from 'react-router-dom';
import ArticleActions from './ArticleActions';

const ArticleMeta = ({ article, canModify }) => {
  return (
    <div className="article-meta">
      <Link to={`/@${article.author.username}`}>
        <img src={article.author.image} alt="" />
      </Link>

      <div className="info">
        <Link to={`/@${article.author.username}`} className="author mb-1">
          {article.author.username}
        </Link>
        <span className="date">{new Date(article.createdAt).toDateString()}</span>
      </div>

      <ArticleActions canModify={canModify} article={article} />
    </div>
  );
};

export default ArticleMeta;
