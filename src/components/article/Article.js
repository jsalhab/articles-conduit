import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchArticleBySlug,
  fetchCommentsForArticle
} from "../../redux/actions";
import marked from "marked";
import ArticleMeta from "./ArticleMeta";
import CommentContainer from "./CommentContainer";

class Article extends Component {
  componentWillMount() {
    this.props.fetchArticleBySlug(this.props.match.params.id);
    this.props.fetchCommentsForArticle(this.props.match.params.id);
  }
  render() {
    if (!this.props.article) {
      return null;
    }
    const markup = {
      __html: marked(this.props.article.body, { sanitize: true })
    };
    const canModify =
      this.props.currentUser &&
      this.props.currentUser.username === this.props.article.author.username;

    return (
      <div className="article-page">
        <div className="banner">
          <div className="container">
            <h1>{this.props.article.title}</h1>
            <ArticleMeta article={this.props.article} canModify={canModify} />
          </div>
        </div>

        <div className="container page">
          <div className="row article-content">
            <div className="col-xs-12">
              <div dangerouslySetInnerHTML={markup}></div>

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

          <div className="article-actions"></div>

          <div className="row">
            <CommentContainer
              comments={this.props.comments || []}
              errors={this.props.commentErrors}
              slug={this.props.match.params.id}
              currentUser={this.props.currentUser}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
    article: state.articles.article,
    comments: state.comments.comments
  };
};
export default connect(
  mapStateToProps,
  { fetchArticleBySlug, fetchCommentsForArticle }
)(Article);
