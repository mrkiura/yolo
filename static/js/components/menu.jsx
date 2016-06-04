import { render } from 'react-dom';
import React, { Component } from 'react';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/lib/menus/menu-item';
import FlatButton from 'material-ui/lib/flat-button';


class Menu extends Component {
    constructor() {
         super();
     }

    render() {
        return(
            <AppBar
                title="Yolo"
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
