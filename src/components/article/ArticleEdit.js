import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchArticleBySlug, editArticle } from "../../redux/actions";
import ArticleForm from "./ArticleForm";

class ArticleEdit extends Component {
  componentDidMount() {
    this.props.fetchArticleBySlug(this.props.match.params.slug);
  }

  onSubmit = formData => {
    this.props.editArticle(formData, this.props.match.params.slug);
  };

  render() {
    return (
      <div>
        <ArticleForm
          article={this.props.article}
          onSubmit={this.onSubmit}
          inProgress={this.props.inProgress}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    article: state.articles.article,
    inProgress: state.auth.inProgress
  };
};

export default connect(
  mapStateToProps,
  { fetchArticleBySlug, editArticle }
)(ArticleEdit);
