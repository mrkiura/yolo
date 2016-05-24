import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import React, { Component } from 'react';
import TextField from 'material-ui/lib/text-field';
import Paper from 'material-ui/lib/paper';
import ActionNoteAdd from 'material-ui/lib/svg-icons/action/note-add';
import IconButton from 'material-ui/lib/icon-button';
import request from 'superagent';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/lib/card'
import FlatButton from 'material-ui/lib/flat-button';

const style = {
    float: 'right',
};

class Home extends Component {
   constructor() {
        super();
        this.state = {
            token: '',
            showAddButton: false,
	        bucketlists: []
            };
    }
    componentDidMount() {
        this.setState({
            token: this.props.location.state.token
        }, ()=> {
            this.fetchBucketlists()
        })
    }

    fetchBucketlists() {
    request
        .get('/api/v1/bucketlists/')
        .set('Authorization', 'JWT ' + this.props.location.state.token)
        .end((err, result) => {
            this.setState({
                bucketlists: result.body.results
            });
        })
    }

    onEnter() {
        this.setState(
            {showAddButton: !this.state.showAddButton}
        );
    }

    render() {
        return (
            <div className="parent">
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
                 <br/>
                 </div>
                 <Card className="col-md-4">

                    <CardHeader
                        title="Bucketlist"
                        subtitle="Hiking in Himalayas"
                        actAsExpander={true}
                        showExpandableButton={true}
                    />
                    <CardText expandable={true}>
                        Bucketlist items here.
                    </CardText>
                    <CardActions expandable={true}>
                    </CardActions>
                </Card>

              <Card className="col-md-4">

                <CardHeader
                    title="Bucketlist"
                    subtitle="Hiking in Himalayas"
                    actAsExpander={true}
                    showExpandableButton={true}
                />
                <CardText expandable={true}>
                    Bucketlist items here.
                </CardText>
                <CardActions expandable={true}>
                </CardActions>
            </Card>

            <Card className="col-md-4">

                <CardHeader
                    title="Bucketlist"
                    subtitle="Hiking in Himalayas"
                    actAsExpander={true}
                    showExpandableButton={true}
                />
                <CardText expandable={true}>
                Bucketlist items here.
                </CardText>
                <CardActions expandable={true}>
                </CardActions>
            </Card>

            </div>
        );
    }
}

module.exports = Home;
