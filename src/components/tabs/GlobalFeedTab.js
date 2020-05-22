import React from "react";
import { fetchArticles } from "../../redux/actions/index";
import { connect } from "react-redux";

const GlobalFeedTab = props => {
  const onclickTab = event => {
    event.preventDefault();
    props.fetchArticles();
  };

  return (
    <li className="nav-item">
      <a
        href=""
        className={props.tab === "all" ? "nav-link active" : "nav-link"}
        onClick={onclickTab}
      >
        Global Feed
      </a>
    </li>
  );
};

const mapStateToProps = state => {
  return {
    currentPage: state.articles.currentPage
  };
};

export default connect(
  mapStateToProps,
  { fetchArticles }
)(GlobalFeedTab);
