import { render } from 'react-dom'
import React, {Component} from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import request from 'superagent';
import {browserHistory} from 'react-router';
import Snackbar from 'material-ui/lib/snackbar';

const style = {
  margin: 12,
};

export default class SignupForm extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.state = {
            username: '',
            password: '',
            password2: '',
            token: '',
            error: false,
        }
    }
    handleSubmit(event) {
        event.preventDefault();
        if (this.state.password != this.state.password2) {
            this.setState(
                {error: true}
            )
        }
        console.log(this.state);
        this.registerUser(this.state.username, this.state.email, this.state.password);
    }
    handleFieldChange(event) {
        event.preventDefault();
        let key = event.target.name;
        let value = event.target.value;
        this.setState({
            [key]: value
        });
    }
    registerUser(username, email, password) {
    request
        .post('/api/v1/auth/register/')
        .send({'username': username, 'email': email, 'password': password })
        .end((err, result) => {
            if (result.status === 201) {
                this.setState({
                    token: result.body.Authorization
                });
                localStorage.setItem('token', JSON.stringify(this.state.token));
                localStorage.setItem('username',
                    JSON.stringify(this.state.username));

                browserHistory.push('/home');
            } else {
                this.setState({
                    error: true
                })
            }

        })
    }
    handleRequestClose() {
        this.setState({
          error: false,
        });
  }
    render() {
        return(
                <div>
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
                    <RaisedButton label="REGISTER" secondary={true}
                        onMouseDown={this.handleSubmit}/>


                <Snackbar
                  className="toast-alerts"
                  open={this.state.error}
                  message="Please provide a correct username and password"
                  autoHideDuration={4000}
                  onRequestClose={this.handleRequestClose}
                />
                </div>
        );
    }

}
