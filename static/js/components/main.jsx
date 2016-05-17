import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import React, { Component } from 'react';
import Menu from './menu.jsx';

class Main extends Component {
   constructor() {
        super();
    }

    render() {
        return (
            <div>
                <Menu />
                {this.props.children}
            </div>
        );
    }
}

module.exports = Main;
