import { Profile, mapStateToProps } from "./Profile";
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchArticlesFavoritedBy } from "../../redux/actions/userAction";

class ProfileFavorites extends Profile {
  componentWillMount() {
    this.props.fetchArticlesFavoritedBy(this.props.match.params.username);
  }
}

export default connect(
  mapStateToProps,
  { fetchArticlesFavoritedBy }
)(ProfileFavorites);
