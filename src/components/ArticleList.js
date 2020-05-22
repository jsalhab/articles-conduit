import React, { Component } from "react";
import ArticlePreview from "./ArticlePreview";
import Pagination from "./common/Pagination";
import { connect } from "react-redux";
import { setPage } from "../redux/actions";
import { paginate } from "./utils/paginate";

class ArticleList extends Component {
  handleChange = page => {
    this.props.setPage(page);
  };

  render() {
    console.log(this.props.paginatedArticles);
    if (!this.props.articles) {
      return <div className="article-preview">Loading....</div>;
    }

    if (this.props.articles.length === 0) {
      return <div className="article-preview">No articles are here....</div>;
    }
    return (
      <div>
        {this.props.paginatedArticles.map(article => {
          return <ArticlePreview article={article} key={article.slug} />;
        })}

        <Pagination
          articles={this.props.articles}
          articlesCount={this.props.articlesCount}
          pageSize={10}
          onPageChange={this.handleChange}
          currentPage={this.props.currentPage}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentPage: state.articles.currentPage,
    paginatedArticles: state.articles.paginatedArticles
  };
};

export default connect(
  mapStateToProps,
  { setPage }
)(ArticleList);
