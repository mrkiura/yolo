// The login page.
import { render } from 'react-dom'
import React, {Component} from 'react';
import TextField from 'material-ui/lib/text-field';
import request from 'superagent'
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import SwipeableViews from 'react-swipeable-views';
import LoginForm from './loginForm.jsx';
import SignupForm from './signupForm.jsx';


const styles = {
    slide: {
        padding: 10,
        textAlign: "center",
        width: 100,
        height: 250
    },
    tab: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
        width: 200
  },
};

class AuthTabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
        };
    };

    handleChange(value) {
        this.setState({slideIndex: value});
    }
    render() {
        return (
            <div>
                <Tabs
                    onChange={this.handleChange.bind(this)}
                    value={this.state.slideIndex}>
                    <Tab label="login" value={0}></Tab>
                    <Tab label="register" value={1}></Tab>
                </Tabs>
                <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleChange}
                >
                    <div style={styles.slide}><LoginForm /></div>
                    <div style={styles.slide}><SignupForm /></div>
                </SwipeableViews>
            </div>
        );
    }
}

class Home extends Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div className="container"><AuthTabs /></div>
        );
    }
}

module.exports = Home;
