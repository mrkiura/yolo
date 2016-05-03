import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import React, { Component } from 'react';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/lib/menus/menu-item';

injectTapEventPlugin();


class BucketListBox extends Component {
    render() {
        const now = new Date();
        const topicsList = ['HTML', 'JS', 'PYTHON', 'JAVA'];
        return (
            <div>
                <h3>Stories App</h3>
                <p className="lead">The Current time is: {now.toTimeString()}</p>
                <ul>
                    {topicsList.map( topic  => <li>{topic}</li>)}
                </ul>
            </div>
        );
    }
}


const AppBarExampleIconMenu = () => (
  <AppBar
    title="Yolo"
    //iconElementLeft={<IconButton><NavigationClose /></IconButton>}
    iconElementRight={
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText="Refresh" />
        <MenuItem primaryText="Help" />
        <MenuItem primaryText="Sign out" />
      </IconMenu>
    }
  />
);

export default AppBarExampleIconMenu;
render(
    <AppBarExampleIconMenu />, document.getElementById('yolo')
);
