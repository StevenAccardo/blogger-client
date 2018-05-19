//IS THE MAINVIEW ON THE HOME PAGE, AND CONTAINS THE LIST OF ARTICLES FROM THE FEEDS AS WELL AS THE TAGS ASSOCIATED WITH THE ARTICLES
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import agent from '../../agent';
import ArticleList from '../ArticleList';
import GlobalFeedTab from './GlobalFeedTab';
import YourFeedTab from './YourFeedTab';
import TagFilterTab from './TagFilterTab';
import { SET_PAGE, CHANGE_TAB } from '../../actions/types';

const MainView = props => {
  const onSetPage = page => props.onSetPage(props.tab, page);
  return (
    <div className="col-md-9">
      <div className="feedToggle">
        <ul className="nav nav-pills">
          <YourFeedTab token={props.token} tab={props.tab} onTabClick={props.onTabClick} />

          <GlobalFeedTab tab={props.tab} onTabClick={props.onTabClick} />

          <TagFilterTab tag={props.tag} />
        </ul>
      </div>
      <ArticleList articles={props.articles} articlesCount={props.articlesCount} currentPage={props.currentPage} onSetPage={onSetPage} />
    </div>
  );
};

const mapStateToProps = state => ({
  ...state.articleList,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  //Sets the page to be viewed based on what pagination link the user clicked.
  //Determines which articles to fetch, and initiates the http request while passing the user selected page number to the agent helper file. The page number will be used to calculate the offset.
  onSetPage: (tab, page) => dispatch({ type: SET_PAGE, currentPage: page, payload: tab === 'feed' ? agent.Articles.feed(page) : agent.Articles.all(page) }),
  onTabClick: (tab, payload) => dispatch({ type: CHANGE_TAB, tab, payload })
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainView));
