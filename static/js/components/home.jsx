import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import React, { Component } from 'react';
import IconButton from 'material-ui/lib/icon-button';
import request from 'superagent';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/lib/card'
import FlatButton from 'material-ui/lib/flat-button';
import { List, ListItem } from 'material-ui/lib/lists';
import Checkbox from 'material-ui/lib/checkbox';
import RaisedButton from 'material-ui/lib/raised-button';
import Divider from 'material-ui/lib/divider';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import {grey400} from 'material-ui/lib/styles/colors';
import ImageEdit from 'material-ui/lib/svg-icons/image/edit';
import Delete from 'material-ui/lib/svg-icons/action/delete'
import Dialog from 'material-ui/lib/dialog';
import TextField from 'material-ui/lib/text-field';

const style = {
    float: 'right',
    'font-weight': 'normal',
    checkbox: {
        marginBottom: 16,
    },

};

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);


class BucketListItem extends Component {
    constructor() {
        super()
        this.state = {
            open: false
        }
    }
    handleClick() {
        this.setState({open: true});
        console.log(this.props.key);
    }
    handleOpen() {
         this.setState({open: true});
    }

    handleClose() {
        console.log('closing dialog...');
        this.setState({open: false});
    }

    render() {
        const actions = [
          <FlatButton
            label="Ok"
            primary={true}
            keyboardFocused={true}
            onTouchTap={this.handleClose}
          />,
        ]
        return (
            <div>
                <ListItem
                    primaryText={this.props.itemName}
                    id='list-item'
                    disabled={true}
                    children={
                        <div className="pull-right item-action">
                            <IconButton
                                touch={true}
                                tooltip="edit"
                                tooltipPosition="bottom-left"
                                ><ImageEdit /></IconButton>
                            <IconButton
                                touch={true}
                                tooltip="delete"
                                tooltipPosition="bottom-left"
                                ><Delete/></IconButton>
                            <br/>
                        </div>
                    }
                    />

                <Divider />
        </div>
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
                    <CardActions className="pull-right">
                        <IconButton
                            touch={true}
                            tooltip="edit"
                            tooltipPosition="top-center"
                            ><ImageEdit /></IconButton>
                        <IconButton
                            touch={true}
                            tooltip="delete"
                            tooltipPosition="top-center"
                            ><Delete/></IconButton>
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
        this.submitBucketlist = this.submitBucketlist.bind(this);
        this.state = {
            token: '',
            showAddButton: false,
	        bucketlists: [],
            listName: '',
            itemName: ''
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
            .set('Authorization', 'JWT ' +
                this.props.location.state.token || (JSON.parse(localStorage.getItem('username') || '{}') || 'token'))
            .end((err, result) => {
                this.setState({
                    bucketlists: result.body
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
    submitBucketlist() {
        this.setState({
            bucketlists: this.state.bucketlists.concat([{
                list_name: this.state.listName,
                items: []
            }])
        })
        request
            .post('/api/v1/bucketlists/')
            .set('Authorization', 'JWT ' +
                this.props.location.state.token || (JSON.parse(localStorage.getItem('username') || '{}') || 'token'))
            .send({'list_name': this.state.listName})
            .end((err, result) => {
                if (result.status === 201) {
                    this.fetchBucketlists()
                } else {
                    this.setState({
                        error: true
                    })
                }
            })
    }
    render() {
        const bucketlists = this.renderBucketlists();
        let bucketlistNodes = <div className="component">{bucketlists}</div>
        return (
            <div className="container-fluid">
                <div className="list-input">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Add bucketlist..."
                            valueLink={this.makeValueLink('listName')}/>
                        <span className="input-group-btn">
                            <button className="btn btn-secondary" type="button"
                                onClick={this.submitBucketlist}>Add</button>
                        </span>
                    </div>
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
