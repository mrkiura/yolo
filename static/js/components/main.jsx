import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import React, { Component } from 'react';

class Main extends Component {
   constructor() {
        super();
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

module.exports = Main;
