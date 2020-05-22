import ArticleList from "../ArticleList";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchArticlesByAuthor,
  fetchArticlesFavoritedBy,
  getUser,
  followUser,
  unFollowUser
} from "../../redux/actions/userAction";

class Profile extends Component {
  componentWillMount() {
    this.props.fetchArticlesByAuthor(this.props.match.params.username);
    this.props.fetchArticlesFavoritedBy(this.props.match.params.username);
    this.props.getUser(this.props.match.params.username);
  }

  renderTabs() {
    let firstTab = "";
    let secondTab = "";
    let firstTabclasses = "nav-link";
    let secondTabclasses = "nav-link";
    if (this.props.match.path.indexOf("favorites") > -1) {
      firstTab = "";
      secondTab = " active";
      secondTabclasses += secondTab;
    } else {
      secondTab = "";
      firstTab = " active";
      firstTabclasses += firstTab;
    }

    return (
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <Link
            className={firstTabclasses}
            to={`/@${this.props.profile.username}`}
          >
            My Articles
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className={secondTabclasses}
            to={`/@${this.props.profile.username}/favorites`}
          >
            Favorited Articles
          </Link>
        </li>
      </ul>
    );
  }

  handleFollowClick = event => {
    event.preventDefault();
    this.props.followUser(this.props.profile.username);
    if (!this.props.profile.following) {
      this.props.followUser(this.props.profile.username);
    } else {
      this.props.unFollowUser(this.props.profile.username);
    }
  };

  render() {
    const profile = this.props.profile;
    if (!profile) {
      return null;
    }

    let classes = "btn btn-sm action-btn";
    if (profile.following) {
      classes += " btn-secondary";
    } else {
      classes += " btn-outline-secondary";
    }

    const isUser =
      this.props.currentUser &&
      this.props.profile.username === this.props.currentUser.username;

    return (
      <div className="profile-page">
        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <img
                  src={profile.image}
                  className="user-img"
                  alt={profile.username}
                />
                <h4>{profile.username}</h4>
                <p>{profile.bio}</p>
                {isUser && (
                  <Link
                    to="/settings"
                    className="btn btn-sm btn-outline-secondary action-btn"
                  >
                    <i className="ion-gear-a"></i> Edit Profile Settings
                  </Link>
                )}
                <button className={classes} onClick={this.handleFollowClick}>
                  <i className="ion-plus-round"></i>
                  &nbsp;
                  {profile.following ? "Unfollow" : "Follow"} {profile.username}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <div className="articles-toggle">{this.renderTabs()}</div>

              <ArticleList
                articles={
                  this.props.match.path.indexOf("favorites") > -1
                    ? this.props.articlesFavBy
                    : this.props.articlesByAuther
                }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
    profile: state.profile,
    articlesByAuther: state.profile.articlesByAuther,
    articlesFavBy: state.profile.articlesFavBy
  };
};

export default connect(
  mapStateToProps,
  {
    fetchArticlesByAuthor,
    fetchArticlesFavoritedBy,
    getUser,
    followUser,
    unFollowUser
  }
)(Profile);
export { Profile, mapStateToProps };
