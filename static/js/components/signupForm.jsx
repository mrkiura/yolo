import React, { Component } from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import request from 'superagent';
import Snackbar from 'material-ui/lib/snackbar';
import { browserHistory } from 'react-router';


export default class SignupForm extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.state = {
      username: '',
      password: '',
      password2: '',
      token: '',
      error: false,
      errorMessage: '',
    };
  }
  handleSubmit(event) {
    event.preventDefault();
    if (this.state.password !== this.state.password2) {
      this.setState(
          { error: true }
      );
    }
    this.registerUser(this.state.username, this.state.email,
      this.state.password, this.state.password2);
  }
  handleFieldChange(event) {
    event.preventDefault();
    const key = event.target.name;
    const value = event.target.value;
    this.setState({
      [key]: value,
    });
  }
  registerUser(username, email, password, confirmPassword) {
    request
      .post('/api/v1/auth/register/')
      .send({ username, email, password, confirm_password: confirmPassword })
      .end((err, result) => {
        if (result.status === 201) {
          this.setState({
            token: result.body.token,
          }, () => {
            localStorage.setItem('token', JSON.stringify(this.state.token));
            localStorage.setItem('username',
            JSON.stringify(this.state.username));
            browserHistory.push('/login');
          });
        } else {
          this.setState({
            error: true,
            errorMessage: result.body.error,
          });
        }
      });
  }
  handleRequestClose() {
    this.setState({
      error: false,
    });
  }
  render() {
    return(
      <div className="container-fluid parent">
        <div className="component center">
          <p>Register to continue</p>
            <TextField
              hintText="Enter your username"
              floatingLabelText="Username"
              type="text"
              name="username"
              onChange={this.handleFieldChange}
            />
            <br/>
            <TextField
              hintText="Email Field"
              floatingLabelText="Email"
              type="email"
              name="email"
              onChange={this.handleFieldChange}
            />
            <br/>
            <TextField
              hintText="Password Field"
              floatingLabelText="Password"
              type="password"
              name="password"
              onChange={this.handleFieldChange}
            />
            <br/>
            <TextField
              hintText="Password Field"
              floatingLabelText="Confirm Password"
              type="password"
              name="password2"
              onChange={this.handleFieldChange}
            />
            <br/>
            <br/>
            <RaisedButton
              label="REGISTER"
              secondary={true}
              onMouseDown={this.handleSubmit}
            />
            <Snackbar
              className="toast-alerts"
              open={this.state.error}
              message={this.state.errorMessage}
              autoHideDuration={2000}
              onRequestClose={this.handleRequestClose}
            />
              </div>
            </div>
      );
  }

}
