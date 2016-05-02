import React, { Component } from 'react';
import { render } from 'react-dom';

class BucketListBox extends Component {
    render() {
        const now = new Date();
        const topicsList = ['HTML', 'JS', 'PYTHON', 'JAVA'];
        return (
            <div>
                <h3>Stories App</h3>
                <p className="lead">The Current time is: {now.toTimeString()}</p>
                <ul>
                    {topicsList.map( topic  => <li>{topic}</li>)}
                </ul>
            </div>
        );
    }
}

render(
    <BucketListBox />, document.getElementById('yolo')
);
