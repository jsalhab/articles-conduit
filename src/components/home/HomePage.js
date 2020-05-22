import React, { Component } from "react";
import Banner from "./Banner";
import MainView from "./MainView";
import { fetchArticles, getFeed, getAllTags } from "../../redux/actions";
import { connect } from "react-redux";
import Tags from "../article/Tags";

class HomePage extends Component {
  componentWillMount() {
    const tab = this.props.authenticated ? "feed" : "all";
    tab === "feed" ? this.props.getFeed() : this.props.fetchArticles();
    this.props.getAllTags();
  }

  render() {
    return (
      <div className="home-page">
        <Banner />
        <div className="conatiner page">
          <div className="row">
            <MainView
              articles={this.props.articles}
              articlesCount={this.props.articlesCount}
            />
            <div className="col-md-3">
              <div className="sidebar">
                <p>Populer tags</p>
                <Tags tags={this.props.tags} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated,
    articles: state.articles.articles,
    articlesCount: state.articles.articlesCount,
    tags: state.articles.tags,
    currentPage: state.articles.currentPage
  };
};
export default connect(
  mapStateToProps,
  { fetchArticles, getFeed, getAllTags }
)(HomePage);
