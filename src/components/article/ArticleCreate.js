import React, { Component } from "react";
import { connect } from "react-redux";
import { createArticle } from "../../redux/actions";
import ArticleForm from "./ArticleForm";

class ArticleCreate extends Component {
  componentWillReceiveProps(nextProps) {
    console.log("next", nextProps);
  }

  onSubmit = formData => {
    this.props.createArticle(formData);
  };

  render() {
    return (
      <div>
        <ArticleForm
          onSubmit={this.onSubmit}
          inProgress={this.props.inProgress}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    inProgress: state.auth.inProgress
  };
};

export default connect(
  mapStateToProps,
  { createArticle }
)(ArticleCreate);
