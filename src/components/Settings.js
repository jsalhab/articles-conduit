import React, { Component } from "react";
import ListErrors from "./auth/ListErrors";
import { connect } from "react-redux";
import { signout, saveUserSettings } from "../redux/actions/index";
import history from "../history";

class Settings extends Component {
  state = {
    image: "",
    username: "",
    bio: "",
    email: "",
    password: ""
  };

  updateState = field => ev => {
    const state = this.state;
    const newState = Object.assign({}, state, { [field]: ev.target.value });
    this.setState(newState);
  };

  componentWillMount() {
    if (this.props.auth.currentUser) {
      Object.assign(this.state, {
        image: this.props.auth.currentUser.image || "",
        username: this.props.auth.currentUser.username,
        bio: this.props.auth.currentUser.bio,
        email: this.props.auth.currentUser.email
      });
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.currentUser) {
  //     this.setState(
  //       Object.assign({}, this.state, {
  //         image: nextProps.auth.urrentUser.image || "",
  //         username: nextProps.auth.currentUser.username,
  //         bio: nextProps.auth.currentUser.bio,
  //         email: nextProps.auth.currentUser.email
  //       })
  //     );
  //   }
  // }

  submitForm = event => {
    event.preventDefault();
    const user = { ...this.state };
    if (!user.password) {
      delete user.password;
    }
    this.props.saveUserSettings(user);
  };

  onSignout = () => {
    this.props.signout();
    history.push("/");
  };

  render() {
    return (
      <div className="settings-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Your Settings</h1>

              <ListErrors errors={this.props.errors}></ListErrors>

              <form onSubmit={this.submitForm}>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="URL of profile picture"
                      value={this.state.image}
                      onChange={this.updateState("image")}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Username"
                      value={this.state.username}
                      onChange={this.updateState("username")}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <textarea
                      className="form-control form-control-lg"
                      rows="8"
                      placeholder="Short bio about you"
                      value={this.state.bio}
                      onChange={this.updateState("bio")}
                    ></textarea>
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="email"
                      placeholder="Email"
                      value={this.state.email}
                      onChange={this.updateState("email")}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="New Password"
                      value={this.state.password}
                      onChange={this.updateState("password")}
                    />
                  </fieldset>

                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={this.props.auth.inProgress}
                  >
                    Update Settings
                  </button>
                </fieldset>
              </form>

              <hr />

              <button
                className="btn btn-outline-danger"
                onClick={this.onSignout}
              >
                Or click here to logout.
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { saveUserSettings, signout }
)(Settings);
