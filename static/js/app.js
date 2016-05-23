import { render } from 'react-dom';
import Main from './components/main.jsx';
import Home from './components/home.jsx';
import Auth from './components/auth.jsx';
import Landing from './components/landing.jsx';
import React, { Component } from 'react';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

let routes = (<Router history={browserHistory}>
                <Route path="/" component={Main}>
                    <IndexRoute component={Auth}/>
                    <Route path="/home" component={Home}/>
                    <Route path="/login" component={Auth}/>
                    <Route path="/bucketlists" component={Home}/>
                </Route>
              </Router>)

render(routes, document.getElementById('yolo'));
