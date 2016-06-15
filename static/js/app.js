import { render } from 'react-dom';
import Main from './components/main.jsx';
import Home from './components/home.jsx';
import SignupForm from './components/signupForm.jsx';
import LoginForm from './components/loginForm.jsx';
import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const routes = (<Router history={browserHistory}>
                <Route path="/" component={Main}>
                    <IndexRoute component={LoginForm}/>
                    <Route path="/home" component={Home}/>
                    <Route path="/login" component={LoginForm}/>
                    <Route path="/register" component={SignupForm}/>
                </Route>
              </Router>)

render(routes, document.getElementById('yolo'));
