import React from "react";
import ArticleList from "../ArticleList";
import GlobalFeedTab from "../tabs/GlobalFeedTab";
import UserFeedTab from "../tabs/UserFeedTab";
import { connect } from "react-redux";
import TagFilterTab from "../tabs/TagFilterTab";

const MainView = props => {
  return (
    <div className="col-md-9">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">
          {props.authenticated && <UserFeedTab tab={props.tab} />}

          <GlobalFeedTab tab={props.tab} />
          <TagFilterTab tag={props.tag} />
        </ul>
      </div>
      <ArticleList
        articles={props.articles}
        articlesCount={props.articlesCount}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated,
    tab: state.articles.tab,
    tag: state.articles.tag
  };
};

export default connect(mapStateToProps)(MainView);
