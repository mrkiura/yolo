import { render } from 'react-dom'
import React, {Component} from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

export default class SignupForm extends Component {
    render() {
        return(
            <div>
                <TextField
                    name="username"
                    hintText="Enter your email"
                    floatingLabelText="Email"
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
                    floatingLabelText="Confirm your Password"
                    type="password"
                    />
                <br/>
                <RaisedButton label="SIGN UP" secondary={true}/>
            </div>
        );
    }
}
