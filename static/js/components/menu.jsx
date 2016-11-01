import React, { Component } from 'react';
import AppBar from 'material-ui/lib/app-bar';
import FlatButton from 'material-ui/lib/flat-button';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';

const style = {
  menuBar: {
    backgroundColor: '#00bcd4',
  },
  logo: {
    height: '56px',
  },
  logOut: {
    fontSize: '18px',
    color: 'white',
    marginTop: '5px',
  },
};

class Menu extends Component {
    constructor() {
      super();
    }
    render() {
        return(
          <Toolbar style={style.menuBar}>
            <ToolbarGroup firstChild={true} float="left">
              <a href="/home"><img style={style.logo} src="../static/images/yolo_logo2.png" alt="" /></a>
            </ToolbarGroup>
            <ToolbarGroup float="right">
              {
                  this.props.loggedIn ?
                  <div style={style.logOut}>
                    Hello {this.props.username} 
                      <FlatButton
                        style={style.logOut}
                          onClick={this.props.handleLogout}
                          label='LOGOUT'
                          />
                  </div>
                 : null }
            </ToolbarGroup>
          </Toolbar>
        );
    }

}


module.exports = Menu;
