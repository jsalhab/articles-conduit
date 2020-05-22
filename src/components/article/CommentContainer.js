import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CommentList from "./CommentList";
import { createComment } from "../../redux/actions/index";

class CommentContainer extends Component {
  state = {
    body: ""
  };

  createComment = event => {
    event.preventDefault();
    this.props.createComment(this.props.slug, { body: this.state.body });
    this.setState({ body: "" });
  };

  handleChangeBody = event => {
    this.setState({ body: event.target.value });
  };
  render() {
    if (this.props.currentUser) {
      return (
        <div className="col-xs-12 col-md-8 offset-md-2">
          <div>
            <list-errors errors={this.props.errors}></list-errors>

            <form className="card comment-form" onSubmit={this.createComment}>
              <div className="card-block">
                <textarea
                  className="form-control"
                  placeholder="Write a comment..."
                  value={this.state.body}
                  onChange={this.handleChangeBody}
                  rows="3"
                ></textarea>
              </div>
              <div className="card-footer">
                <img
                  src={this.props.currentUser.image}
                  className="comment-author-img"
                  alt={this.props.currentUser.username}
                />
                <button className="btn btn-sm btn-primary" type="submit">
                  Post Comment
                </button>
              </div>
            </form>
          </div>
          <CommentList
            comments={this.props.comments}
            slug={this.props.slug}
            currentUser={this.props.currentUser}
          />
        </div>
      );
    } else {
      return (
        <div className="col-xs-12 col-md-8 offset-md-2">
          <p>
            <Link to="/login">Sign in</Link>
            &nbsp;or&nbsp;
            <Link to="/register">sign up</Link>
            &nbsp;to add comments on this article.
          </p>
          <CommentList
            comments={this.props.comments}
            slug={this.props.slug}
            currentUser={this.props.currentUser}
          />
        </div>
      );
    }
  }
}

export default connect(
  null,
  { createComment }
)(CommentContainer);
