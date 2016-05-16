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

class Menu extends Component {
    render() {
        return(
            <AppBar
              title="Yolo"
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
    }

}

let routes = (<Router history={browserHistory}>
                <Route path="/" component={Main}>
                    <IndexRoute component={Home}/>
                    <Route path="/about" component={About}/>
                    <Route path="/team" component={Team}/>
                    <Route path="/contact" component={Contact}/>
                </Route>
              </Router>)
export default AppBarExampleIconMenu;
render(
    <AppBarExampleIconMenu />, document.getElementById('yolo')
);

modue.exports = AppBar;
