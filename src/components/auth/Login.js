import React, { Component } from "react";
import { connect } from "react-redux";
import { signin } from "../../redux/actions";
import ListErrors from "./ListErrors";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  submitForm = (email, password) => event => {
    event.preventDefault();
    this.props.signin(email, password);
    console.log(this.props.auth);
  };

  handleChangeEmail = event => {
    this.setState({ email: event.target.value });
  };

  handleChangePassword = event => {
    this.setState({ password: event.target.value });
  };

  render() {
    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign In</h1>
              <p className="text-xs-center">
                <a>Need an account?</a>
              </p>
              <form
                onSubmit={this.submitForm(
                  this.state.email,
                  this.state.password
                )}
              >
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="email"
                      placeholder="Email"
                      onChange={this.handleChangeEmail}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      onChange={this.handleChangePassword}
                    />
                  </fieldset>
                  <div style={{ color: "red" }}>
                    {this.props.auth.errorMessage}
                  </div>
                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    disabled={this.props.auth.inProgress}
                    type="submit"
                  >
                    Sign in
                  </button>
                </fieldset>
              </form>
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
  { signin }
)(Login);
