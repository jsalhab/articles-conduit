import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteComment } from "../../redux/actions";

const Comment = props => {
  console.log("comment", props.comment.id);
  const comment = props.comment;
  const show =
    props.currentUser && props.currentUser.username === comment.author.username;

  const onDeleteComment = () => {
    props.deleteComment(props.slug, props.comment.id);
  };

  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{comment.body}</p>
      </div>
      <div className="card-footer">
        <Link to={`/@${comment.author.username}`} className="comment-author">
          <img
            src={comment.author.image}
            className="comment-author-img"
            alt={comment.author.username}
          />
        </Link>
        &nbsp;
        <Link to={`/@${comment.author.username}`} className="comment-author">
          {comment.author.username}
        </Link>
        <span className="date-posted">
          {new Date(comment.createdAt).toDateString()}
        </span>
        {show && (
          <span className="mod-options">
            <i className="ion-trash-a" onClick={onDeleteComment}></i>
          </span>
        )}
      </div>
    </div>
  );
};

export default connect(
  null,
  { deleteComment }
)(Comment);
