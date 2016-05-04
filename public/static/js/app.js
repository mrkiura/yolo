import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import React, { Component } from 'react';
import { Router, Route, Link, browserHistory, IndexRoute} from 'react-router';

let routes = (<Router history={browserHistory}>
                <Route path="/" component={Main}>
                    <IndexRoute component={Home}/>
                    <Route path="/home" component={About}/>
                    <Route path="/bucketlist" component={Team}/>
                </Route>
              </Router>)

render(
    <AppBarExampleIconMenu />, document.getElementById('yolo')
);
