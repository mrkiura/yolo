import { render } from 'react-dom'
import React, {Component} from 'react';
import TextField from 'material-ui/lib/text-field';

export default class SignupForm extends Component {
    render() {
        return(
            <div>
                <TextField
                    name="username"
                    hintText="Enter your email"
                    floatingLabelText="Username"
                    type="email"
                    />
                <br/>
                <TextField
                    name="password"
                    hintText="Enter your password"
                    floatingLabelText="Password"
                    type="password"
                    />
                <br/>
                <TextField
                    name="confirmPassword"
                    hintText="Confirm your password"
                    floatingLabelText="Password"
                    type="password"
                    />
                <br/>
            </div>
        );
    }
}
