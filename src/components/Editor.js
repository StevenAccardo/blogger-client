//ALLOWS THE USER TO EDIT THEIR ARTICLE IF THEY ARE THE AUTHOR

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import agent from '../agent';
import ListErrors from './ListErrors';
import { ADD_TAG, EDITOR_PAGE_LOADED, REMOVE_TAG, ARTICLE_SUBMITTED, EDITOR_PAGE_UNLOADED, UPDATE_FIELD_EDITOR } from '../actions/types';

class Editor extends React.Component {
  constructor(props) {
    super(props);

    //Update field event helper
    const updateFieldEvent = key => ev => this.props.onUpdateField(key, ev.target.value);

    this.changeTitle = updateFieldEvent('title');
    this.changeDescription = updateFieldEvent('description');
    this.changeBody = updateFieldEvent('body');
    this.changeTagInput = updateFieldEvent('tagInput');

    // When entering tags, hitting enter adds a tag to the list
    this.watchForEnter = ev => {
      if (ev.keyCode === 13) {
        ev.preventDefault();
        this.props.onAddTag();
      }
    };

    //Removes a tag
    this.removeTagHandler = tag => () => {
      this.props.onRemoveTag(tag);
    };

    // When submitting the form, we need to correctly format the
    // object and use the right function - if we have a slug,
    // we're updating an article, otherwise we're creating a new
    // one.
    this.submitForm = ev => {
      ev.preventDefault();
      const article = {
        title: this.props.title,
        description: this.props.description,
        body: this.props.body,
        tagList: this.props.tagList
      };

      //checks to see if there is an article slug present, if there is then the update method is called, if not, then the create method is called.
      const slug = { slug: this.props.articleSlug };
      const promise = this.props.articleSlug ? agent.Articles.update(Object.assign(article, slug)) : agent.Articles.create(article);

      this.props.onSubmit(promise);
    };
  }

  /**
   * React-router has an interesting quirk: if two routes have the
   * same component, react-router will reuse the component when
   * switching between the two. So if '/editor' and '/editor/slug'
   * both use the 'Editor' component, react-router won't recreate
   * the Editor component if you navigate to '/editor' from '/editor/slug'.
   * To work around this, we need the `componentWillReceiveProps()` hook.
   */
  componentWillReceiveProps(nextProps) {
    //If the article slug changes, which would mean that you are viewing a different article in the editor
    if (this.props.match.params.slug !== nextProps.match.params.slug) {
      //If there is a new slug, unload the component, and repopulate it with the new articles information
      if (nextProps.match.params.slug) {
        this.props.onUnload();
        return this.props.onLoad(agent.Articles.get(this.props.match.params.slug));
      }
      //If there is no new slug, but it is not the same slug as before then the user is attempting to create a new article
      this.props.onLoad(null);
    }
  }

  componentWillMount() {
    //If there is a slug, load the correct article
    if (this.props.match.params.slug) {
      return this.props.onLoad(agent.Articles.get(this.props.match.params.slug));
    }
    //Otherwise load a blank editor, for article creation
    this.props.onLoad(null);
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div className="container editorPage">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <ListErrors errors={this.props.errors} />
            <form className="editorForm">
              <fieldset>
                <fieldset className="form-group">
                  <input className="form-control form-control-lg editorForm__input" type="text" placeholder="Article Title" value={this.props.title} onChange={this.changeTitle} />
                </fieldset>
                <fieldset className="form-group">
                  <input className="form-control editorForm__input" type="text" placeholder="What's this article about?" value={this.props.description} onChange={this.changeDescription} />
                </fieldset>
                <fieldset className="form-group">
                  <textarea className="form-control editorForm__textarea" rows="8" placeholder="Write your article (in markdown)" value={this.props.body} onChange={this.changeBody} />
                </fieldset>
                <fieldset className="form-group">
                  <input className="form-control editorForm__input mb-2" type="text" placeholder="Enter tags" value={this.props.tagInput} onChange={this.changeTagInput} onKeyUp={this.watchForEnter} />
                  <div className="editorForm__tagList">
                    {(this.props.tagList || []).map(tag => {
                      return (
                        <span className="tag tag--orange" key={tag}>
                          <i className="editorForm__tagList__icon ion-close-round" onClick={this.removeTagHandler(tag)} />
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                </fieldset>

                <button className="editorForm__button btn btn-lg" type="button" disabled={this.props.inProgress} onClick={this.submitForm}>
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.editor
});

/**
 * `mapDispatchToProps()` needs separate actions for adding/removing
 * tags, submitting an article, updating individual fields, and cleaning
 * up after navigating away from the page.
 */
const mapDispatchToProps = dispatch => ({
  onAddTag: () => dispatch({ type: ADD_TAG }),
  onLoad: payload => dispatch({ type: EDITOR_PAGE_LOADED, payload }),
  onRemoveTag: tag => dispatch({ type: REMOVE_TAG, tag }),
  onSubmit: payload => dispatch({ type: ARTICLE_SUBMITTED, payload }),
  onUnload: payload => dispatch({ type: EDITOR_PAGE_UNLOADED }),
  onUpdateField: (key, value) => dispatch({ type: UPDATE_FIELD_EDITOR, key, value })
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Editor));
