import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Header extends Component {
  renderLinks() {
    if (this.props.authenticated && this.props.currentUser) {
      return (
        <ul
          className="nav navbar-nav pull-xs-right"
          style={{ flexDirection: "row" }}
        >
          <li className="nav-item">
            <Link to="" className="nav-link">
              Home
            </Link>
          </li>

          <li className="nav-item">
            <Link to="new" className="nav-link">
              <i className="ion-compose"></i>&nbsp;New Article
            </Link>
          </li>

          <li className="nav-item">
            <Link to="settings" className="nav-link">
              <i className="ion-gear-a"></i>&nbsp;Settings
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to={`@${this.props.currentUser.username}`}
              className="nav-link"
            >
              <img src={this.props.currentUser.image} className="user-pic" />
              {this.props.currentUser.username}
            </Link>
          </li>
        </ul>
      );
    } else {
      return (
        <ul
          className="nav navbar-nav pull-xs-right"
          style={{ flexDirection: "row" }}
        >
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>

          <li className="nav-item">
            <Link to="login" className="nav-link">
              Sign in
            </Link>
          </li>

          <li className="nav-item">
            <Link to="signup" className="nav-link">
              Sign up
            </Link>
          </li>
        </ul>
      );
    }
  }

  render() {
    return (
      <nav className="navbar navbar-light">
        <div className="container">
          <Link to="/" className="navbar-brand">
            conduit
          </Link>
          {this.renderLinks()}
        </div>
      </nav>
    );
  }
}
const mapStateToProps = state => {
  return { authenticated: state.auth.authenticated };
};

export default connect(mapStateToProps)(Header);
