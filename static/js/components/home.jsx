import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import React, { Component } from 'react';
import TextField from 'material-ui/lib/text-field';
import Paper from 'material-ui/lib/paper';
import ActionNoteAdd from 'material-ui/lib/svg-icons/action/note-add';
import IconButton from 'material-ui/lib/icon-button';


const style = {
    float: 'right',
};

class Home extends Component {
   constructor() {
        super();
        this.state = {showAddButton: false};
    }

    onEnter() {
        this.setState(
            {showAddButton: !this.state.showAddButton}
        );
    }

    render() {
        return (
            <div>
                <div className="list-input">
                    <Paper zDepth={2}>
                     <TextField
                         className="text-input"
                         underlineShow={false}
                         hintText=" Add a bucketlist "
                         onFocus={this.onEnter.bind(this)}
                         onBlur={this.onEnter.bind(this)}
                         />
                     {this.state.showAddButton ?
                         <IconButton
                             style={style}
                             tooltip="add bucketlsit">
                             <ActionNoteAdd />
                         </IconButton>
                         : null
                     }
                 </Paper>
                </div>
            </div>
        );
    }
}

module.exports = Home;