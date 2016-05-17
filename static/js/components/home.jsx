import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import React, { Component } from 'react';

class Home extends Component {
   constructor() {
        super();
    }

    render() {
        return (
            <div>
                This is the home page.
            </div>
        );
    }
}

module.exports = Home;
