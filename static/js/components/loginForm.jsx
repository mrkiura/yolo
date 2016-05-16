import { render } from 'react-dom'
import React, {Component} from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import request from 'superagent';

const style = {
  margin: 12,
};

export default class LoginForm extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.state = {
            username: '',
            password: '',
            token: ''
        }
    }
    handleSubmit(event) {
        event.preventDefault();
        this.loginUser(this.state.username, this.state.password);
    }
    handleFieldChange(event) {
        event.preventDefault();
        let key = event.target.name;
        let value = event.target.value;
        this.setState({
            [key]: value
        });
    }
    loginUser(username, password) {
    request
        .post('/api/v1/auth/login/')
        .send({'username': username, 'password': password })
        .end((err, result) => {
            this.setState({
                token: result.body.Authorization

            });
            console.log(`response code is ${result.status}`);
            console.log(this.state);
        })
}
    render() {
        return(
            <div>
                <TextField
                    hintText="Enter your username"
                    floatingLabelText="Username"
                    type="text"
                    name="username"
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
                <RaisedButton label="LOGIN" secondary={true}
                    onMouseDown={this.handleSubmit}/>
            </div>
        );
    }
}
