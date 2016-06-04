import { render } from 'react-dom';
import React, { Component } from 'react';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/lib/menus/menu-item';
import FlatButton from 'material-ui/lib/flat-button';
import { browserHistory } from 'react-router';


class Menu extends Component {
    constructor() {
         super();
         this.state = {
             username: (JSON.parse(localStorage.getItem('username') || '{}')),
             token: (JSON.parse(localStorage.getItem('token') || '{}')),
             loggedIn: (typeof username==='string' && typeof token ==='string')? true: false,
             hasUsername: (typeof username==='string')? true: false
         };
     }
     handleLogout() {
         localStorage.clear()
         browserHistory.push('/login')
     }
    render() {
        return(
            <AppBar
                title="Yolo"
                iconElementRight={<FlatButton
                onClick={this.handleLogout.bind(this)}label='LOGOUT'/>}
                showMenuIconButton={false} />
        );
    }

}


module.exports = Menu;
