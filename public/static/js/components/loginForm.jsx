import { render } from 'react-dom'
import React, {Component} from 'react';
import TextField from 'material-ui/lib/text-field';

export default class LoginForm extends Component {
    render() {
        return(
            <div>
                <TextField
                    hintText="Enter your username"
                    floatingLabelText="Username"
                    type="text"
                    />
                <br/>
                <TextField
                    hintText="Password Field"
                    floatingLabelText="Password"
                    type="password"
                    />
                <br/>
            </div>
        );
    }
}

// module.exports = LoginForm
