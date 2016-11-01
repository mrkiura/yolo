import React, { Component } from 'react';

class Main extends Component {
   constructor() {
        super();
    }

    render() {
        return (
            <div>
                <div className="body-landing">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

module.exports = Main;
