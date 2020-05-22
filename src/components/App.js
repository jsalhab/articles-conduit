import React, { Component } from "react";
import { Route, Switch, Router, withRouter } from "react-router-dom";
import HomePage from "./home/HomePage";
import Header from "../components/Header";
import Login from "./auth/Login";
import { connect } from "react-redux";
import { getUserProfile } from "../redux/actions/index";
import Signup from "./auth/Signup";
import Settings from "./Settings";
import Article from "./article/Article";
import Profile from "./profile/Profile";
import ArticleEdit from "./article/ArticleEdit";
import ArticleCreate from "./article/ArticleCreate";
import history from "../history";

class App extends Component {
  componentWillMount() {
    const token = this.props.authenticated;
    if (token) {
      this.props.getUserProfile();
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <Router history={history}>
          <div>
            <Header currentUser={this.props.currentUser} />
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/settings" component={Settings} />
              <Route path="/article/:id" component={Article} />
              <Route path="/new" component={ArticleCreate} />
              <Route path="/edit/:slug" component={ArticleEdit} />
              <Route
                key="jum"
                path="/@:username/favorites"
                component={Profile}
              />
              <Route key="ram" path="/@:username" component={Profile} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
    authenticated: state.auth.authenticated
  };
};

export default connect(
  mapStateToProps,
  { getUserProfile }
)(App);
