import { Link } from "react-router-dom";
import React from "react";
import { deleteArticle } from "../../redux/actions";
import { connect } from "react-redux";

const ArticleMeta = props => {
  const article = props.article;

  const onDeleteArticle = () => {
    props.deleteArticle(article.slug);
  };

  return (
    <div className="article-meta">
      <Link to={`/@${article.author.username}`}>
        <img src={article.author.image} alt={article.author.username} />
      </Link>

      <div className="info">
        <Link to={`/@${article.author.username}`} className="author">
          {article.author.username}
        </Link>
        <span className="date">
          {new Date(article.createdAt).toDateString()}
        </span>
      </div>

      {props.canModify && (
        <span>
          <Link
            to={`/edit/${article.slug}`}
            className="btn btn-outline-secondary btn-sm"
          >
            <i className="ion-edit"></i> Edit Article
          </Link>

          <button
            className="btn btn-outline-danger btn-sm"
            onClick={onDeleteArticle}
          >
            <i className="ion-trash-a"></i> Delete Article
          </button>
        </span>
      )}
    </div>
  );
};

export default connect(
  null,
  { deleteArticle }
)(ArticleMeta);
