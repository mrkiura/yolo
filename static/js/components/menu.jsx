import React, { Component } from 'react';
import AppBar from 'material-ui/lib/app-bar';
import FlatButton from 'material-ui/lib/flat-button';


class Menu extends Component {
    constructor() {
         super();
     }

    render() {
        return(
            <AppBar
                title="Yolo"
                children={this.props.children}
                iconElementRight={
                    this.props.loggedIn ?
                    <FlatButton
                        onClick={this.props.handleLogout}
                        label='LOGOUT'
                        /> : null }
                showMenuIconButton={false} />
        );
    }

}


module.exports = Menu;
