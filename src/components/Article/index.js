//THE MAIN CONTAINER FOR A SINGLE ARTICLE VIEW

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
//marked is a library that compiles markdown into HTML - in order to get react to render raw HTML, we need to use this dangerouslySetInnerHTML property, because React sanitizes HTML by default.
import marked from 'marked';
import agent from '../../agent';
import ArticleMeta from './ArticleMeta';
import CommentContainer from './CommentContainer';
import { ARTICLE_PAGE_LOADED, ARTICLE_PAGE_UNLOADED } from '../../actions/types';

class Article extends Component {
  componentWillMount() {
    //Fetches the specific article by passing in the article slug and fetches the associated comments by passing the article slug
    this.props.onLoad(Promise.all([agent.Articles.get(this.props.match.params.id), agent.Comments.forArticle(this.props.match.params.id)]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    //If no article, render nothing
    if (!this.props.article) {
      return null;
    }

    //Takes the text entered by the user and converts it to html, to be diplayed.
    const markup = { __html: marked(this.props.article.body) };
    //Checks to make sure the user is the author of the article in order for them to be able to edit the article.
    const canModify = this.props.currentUser && this.props.currentUser.username === this.props.article.author.username;

    return (
      <div className="article-page">
        {/* Creates Banner */}
        <div className="banner">
          <div className="container">
            <h1>{this.props.article.title}</h1>
            {/* This 'ArticleMeta' component will contain details about the article's author as well as any actions the user can take on the article, like editting or deleting. */}
            <ArticleMeta article={this.props.article} canModify={canModify} />
          </div>
        </div>

        <div className="container page">
          <div className="row article-content">
            <div className="col-xs-12">
              <div dangerouslySetInnerHTML={markup} />
              <ul className="tag-list">
                {this.props.article.tagList.map(tag => {
                  return (
                    <li className="tag-default tag-pill tag-outline" key={tag}>
                      {tag}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <hr />

          <div className="article-actions" />

          <div className="row">
            <CommentContainer comments={this.props.comments || []} errors={this.props.commentErrors} slug={this.props.match.params.id} currentUser={this.props.currentUser} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.article,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: ARTICLE_PAGE_LOADED, payload }),
  onUnload: () => dispatch({ type: ARTICLE_PAGE_UNLOADED })
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Article));
