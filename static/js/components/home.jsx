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
import { List, ListItem } from 'material-ui/lib/lists';
import Checkbox from 'material-ui/lib/checkbox';

const style = {
    float: 'right',
};

class BucketListItem extends Component {
    render() {
        return (
            <ListItem
                primaryText={this.props.itemName}
                leftCheckbox={<Checkbox />}
            />
        )
    }
}

class Bucketlist extends Component {
    renderBucketListItems(bucketlistItems) {
        return bucketlistItems.map((bucketlistItem) => {
            return (<BucketListItem itemName={bucketlistItem.item_name} key={bucketlistItem.id}/>)
        })
    }
    render() {
        return (
            <div className="col-xs-12 col-md-4 bucketlist">
                <Card >
                    <CardHeader
                        title="Bucketlist"
                        subtitle={this.props.listName}
                        actAsExpander={true}
                        showExpandableButton={true}
                        />
                    <CardText expandable={true}>
                        <List>
                            {this.renderBucketListItems(this.props.items)}
                        </List>
                    </CardText>
                    <CardActions expandable={true}>
                    </CardActions>
                </Card>
            </div>
        )
    }
}

class Home extends Component {
   constructor() {
        super();
        this.makeValueLink = this.makeValueLink.bind(this);
        this.state = {
            token: '',
            showAddButton: false,
	        bucketlists: [],
            listName: ''
            };
        // mixins: [LinkedStateMixin]
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
        .set('Authorization', 'JWT ' +
            this.props.location.state.token || (JSON.parse(localStorage.getItem('username') || '{}') || 'token'))
        .end((err, result) => {
            this.setState({
                bucketlists: result.body.results
            }, () => {
                console.log(this.state.bucketlists)
            });
        })
    }

    renderBucketlists() {
        return this.state.bucketlists.map((bucketlist) => {
            return (<Bucketlist listName={bucketlist.list_name} key={bucketlist.id}
                    items={bucketlist.items}/>)
        })
    }

    onEnter() {
        this.setState(
            {showAddButton: !this.state.showAddButton}
        );
    }
    makeValueLink(key) {
        return {
            value: this.state[key],
            requestChange: (newValue) => {
                let newState = {};
                newState[key] = newValue;
                this.setState(newState);
            }
        }
    }
    render() {
        const bucketlists = this.renderBucketlists();
        let bucketlistNodes = <div className="component">{bucketlists}</div>
        let input = <input type="text" placeholder="Add a bucketlist"></input>
        return (
            <div className="container-fluid">
                <div className="list-input">
                    <input type="text" valueLink={this.makeValueLink('listName')}
                        placeholder="Create a new bucketlist" />
                </div>
                <div className="parent">
                    <div className="component">
                        {bucketlistNodes}
                    </div>
                </div>

            </div>
        );
    }
}

module.exports = Home;
