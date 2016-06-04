import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import React, { Component } from 'react';
import Menu from './menu.jsx';
import { browserHistory } from 'react-router';

class Main extends Component {
   constructor() {
        super();
        this.state = {
            username: (JSON.parse(localStorage.getItem('username') || '{}')),
            token: (JSON.parse(localStorage.getItem('token') || '{}')),
            loggedIn: false,
            hasUsername: false,
        };
    }
    componentWillMount() {
        this.setState({
            loggedIn: (typeof this.state.username==='string' && typeof this.state.token ==='string')? true: false,
            hasUsername: (typeof this.state.username==='string')? true: false
        }, () => {
            console.log(this.state)
        })
    }
    handleLogout() {
        localStorage.clear()
        browserHistory.push('/login')
        this.setState({
            loggedIn: false,
            hasUsername: false
        })
    }

    render() {
        return (
            <div>
                <Menu
                    handleLogout={this.handleLogout.bind(this)}
                    hasUsername={this.state.hasUsername}
                    loggedIn={this.state.loggedIn}
                    />
                <div className="body-landing">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

module.exports = Main;
