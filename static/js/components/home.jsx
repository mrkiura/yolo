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
import Delete from 'material-ui/lib/svg-icons/action/delete';
import Search from 'material-ui/lib/svg-icons/action/search';
import Clear from 'material-ui/lib/svg-icons/content/clear';
import Dialog from 'material-ui/lib/dialog';
import TextField from 'material-ui/lib/text-field';
import AutoComplete from 'material-ui/lib/auto-complete';

const style = {
    float: 'right',
    'font-weight': 'normal',
    checkbox: {
        marginBottom: 16,
    },
    right: {
        float: 'right'
    },
    itemAction: {
        transform: 'translateY(-35%)',
        float: 'right'
    },
    itemSearch: {
        transform: 'translateY(45%)',
        float: 'right'
    },
  checkbox: {
      marginBottom: 16,
  },
  label: {
      fontWeight: 'normal'
  }
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
            showEditDialog: false,
            showDeleteDialog: false,
            newItemName: '',
            editName: true,
            done: false,
            deleteName: true

        }
        this.handleEditDialog = this.handleEditDialog.bind(this)
        this.handleDeleteDialog = this.handleDeleteDialog.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleCancelEdit = this.handleCancelEdit.bind(this)
        this.handleConfirmEdit = this.handleConfirmEdit.bind(this)
        this.handleCancelDelete = this.handleCancelDelete.bind(this)
        this.handleConfirmDelete = this.handleConfirmDelete.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.handleCheckbox = this.handleCheckbox.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }
    handleEditDialog() {
        this.setState({
            showEditDialog: !this.state.showEditDialog
        })
    }
    handleDeleteDialog() {
        this.setState({
            showDeleteDialog: !this.state.showDeleteDialog
        })
    }
    handleClick() {
        this.setState({open: true});
    }
    handleFieldChange(event) {
        event.preventDefault()
        const key = event.target.name
        const value = event.target.value
        this.setState({
            [key] : value
        })
    }
    handleCheckbox(event, isInputChecked) {
        event.preventDefault()
        this.setState({
            done: isInputChecked
        })
    }
    handleConfirmEdit() {
        this.handleEditDialog()
        this.setState({
            editName: true
        }, () => {
            this.handleEdit()
        })
    }
    handleConfirmDelete() {
        this.handleDeleteDialog()
        this.setState({
            deleteName: true
        }, () => {
            this.handleDelete()
        })
    }
    handleCancelDelete() {
        this.handleDeleteDialog()
        this.setState({
            deleteList: false
        })
    }
    handleCancelEdit() {
        this.handleEditDialog()
        this.setState({
            editName: false
        })
    }
    handleEdit() {
        if (this.state.editName) {
            const item = {
                item_name: this.state.newItemName,
                done: this.state.done
            }
            this.props.onEditItem(item,
                this.props.item, this.props.bucketlist)
        }
    }
    handleDelete() {
        if (this.state.deleteName) {
            const item = {
                item_name: this.state.newItemName,
                done: this.state.done
            }
            this.props.onDeleteItem(
                this.props.item, this.props.bucketlist)
        }
    }

    render() {
        const deleteDialogActions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleCancelDelete}
            />,
            <FlatButton
                label="Delete"
                primary={true}
                onClick={this.handleConfirmDelete}
            />
        ]
        const editDialogActions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleCancelEdit}
            />,
            <FlatButton
                label="Update"
                primary={true}
                onClick={this.handleConfirmEdit}
            />
        ]
        return (
            <div>
                <ListItem
                    primaryText={this.props.itemName}
                    className={this.props.className}
                    id='list-item'
                    disabled={true}
                    children={
                        <div
                            style={style.itemAction}
                            >
                            <IconButton
                                touch={true}
                                tooltip="edit"
                                tooltipPosition="bottom-left"
                                onTouchTap={this.handleEditDialog}
                                ><ImageEdit /></IconButton>
                            <IconButton
                                touch={true}
                                tooltip="delete"
                                tooltipPosition="bottom-left"
                                onTouchTap={this.handleDeleteDialog}
                                ><Delete/></IconButton>
                            <br/>
                        </div>
                    }
                    />
                <Dialog
                    actions={editDialogActions}
                    modal={false}
                    open={this.state.showEditDialog}
                    onRequestClose={this.handleEditDialog}
                    >
                <TextField
                    defaultValue={this.props.itemName}
                    name="newItemName"
                    onChange={this.handleFieldChange} />
                <br />
                <Checkbox
                    label="Mark item as done"
                    labelPosition="left"
                    name="done"
                    style={style.checkbox}
                    onCheck={this.handleCheckbox}
                    labelStyle={style.label}
                />
                </Dialog>
                <Dialog
                    actions={deleteDialogActions}
                    modal={false}
                    open={this.state.showDeleteDialog}
                    onRequestClose={this.handleDeleteDialog}
                    >
                Delete bucketlist item?
                </Dialog>
                <Divider />
        </div>
        )
    }
}

class Bucketlist extends Component {
    constructor() {
        super();
        this.state = {
            deleteList: false,
            editName: false,
            showEditDialog: false,
            showDeleteDialog: false,
            newName: '',
            newItemName: '',
            editItemError: false
        }
        // Bind methods
        this.handleDeleteDialog = this.handleDeleteDialog.bind(this)
        this.handleEditDialog = this.handleEditDialog.bind(this)
        this.handleCancelEdit = this.handleCancelEdit.bind(this)
        this.handleConfirmEdit = this.handleConfirmEdit.bind(this)
        this.handleCancelDelete = this.handleCancelDelete.bind(this)
        this.handleConfirmDelete = this.handleConfirmDelete.bind(this)
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleAddItem = this.handleAddItem.bind(this)
    }
    handleEditDialog() {
        this.setState({
            showEditDialog: !this.state.showEditDialog
        })
    }
    handleDeleteDialog() {
        this.setState({
            showDeleteDialog: !this.state.showDeleteDialog
        })
    }
    handleConfirmDelete() {
        this.handleDeleteDialog()
        this.setState({
            deleteList: true
        }, () => {
            this.handleDelete()
        })
    }
    handleCancelDelete() {
        this.handleDeleteDialog()
        this.setState({
            deleteList: false
        })
    }
    handleConfirmEdit() {
        this.handleEditDialog()
        this.setState({
            editName: true
        }, () => {
            this.handleEdit()
        })
    }
    handleCancelEdit() {
        this.handleEditDialog()
        this.setState({
            editName: false
        })
    }
    handleDelete() {
        if (this.state.deleteList) {
            this.props.onDelete(this.props.bucketlist)
        }
    }
    handleFieldChange(event) {
        event.preventDefault()
        const key = event.target.name
        const value = event.target.value
        this.setState({
            [key] : value
        })
    }
    handleEdit() {
        if (this.state.editName) {
            this.props.onEdit(this.state.newName, this.props.bucketlist)
        }
    }
    handleAddItem() {
        this.props.onAddItem(this.state.newItemName, this.props.bucketlist)
        this.setState({
            newItemName: ''
        })
    }
    renderBucketListItems(bucketlistItems) {
        if (bucketlistItems.length) {
            return bucketlistItems.map((bucketlistItem) => {
                return (bucketlistItem.done) ?
                    <BucketListItem itemName={bucketlistItem.item_name}
                        className="item-done"
                        key={bucketlistItem.id}
                        done={bucketlistItem.done}
                        id={bucketlistItem.id} item={bucketlistItem}
                        bucketlist={this.props.bucketlist}
                        onEditItem={this.props.onEditItem}
                        onDeleteItem={this.props.onDeleteItem}
                    />: <BucketListItem itemName={bucketlistItem.item_name}
                        className=""
                        key={bucketlistItem.id}
                        done={bucketlistItem.done}
                        id={bucketlistItem.id} item={bucketlistItem}
                        bucketlist={this.props.bucketlist}
                        onEditItem={this.props.onEditItem}
                        onDeleteItem={this.props.onDeleteItem} />
            })
        } else {
            return (<ListItem
                primaryText="No items yet"
                id='list-item'
                disabled={false}/>)
        }
    }

    render() {
        const deleteDialogActions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleCancelDelete}
            />,
            <FlatButton
                label="Delete"
                primary={true}
                onClick={this.handleConfirmDelete}
            />
        ]
        const editDialogActions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleCancelEdit}
            />,
            <FlatButton
                label="Update"
                primary={true}
                onClick={this.handleConfirmEdit}
            />
        ]
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
                        <div>
                            <br />
                            <TextField
                                name="newItemName"
                                hintText="Add an item to the bucketlist..."
                                value={this.state.newItemName}
                                onChange={this.handleFieldChange}/>
                            <FlatButton label="Add"
                                onClick={this.handleAddItem}/>

                        </div>
                    </CardText>
                    <CardActions style={style.right}>
                        <IconButton
                            touch={true}
                            tooltip="edit"
                            tooltipPosition="top-center"
                            onTouchTap={this.handleEditDialog}
                            ><ImageEdit /></IconButton>
                        <IconButton
                            touch={true}
                            tooltip="delete"
                            tooltipPosition="top-center"
                            onTouchTap={this.handleDeleteDialog}
                            ><Delete/></IconButton>
                        <Dialog
                            actions={editDialogActions}
                            modal={false}
                            open={this.state.showEditDialog}
                            onRequestClose={this.handleEditDialog}
                            >
                        <TextField
                            defaultValue={this.props.bucketlist.list_name}
                            name="newName"
                            onChange={this.handleFieldChange}


                        />
                        </Dialog>
                        <Dialog
                            actions={deleteDialogActions}
                            modal={false}
                            open={this.state.showDeleteDialog}
                            onRequestClose={this.handleDeleteDialog}
                            >
                        Delete bucketlist?
                        </Dialog>
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
            itemName: '',
            addError: false,
            deleteError: false,
            editError: false,
            addItemError: false,
            dataSource: [],
            initialBucketlists: [],
            serching: false,
            query: ''
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
                if (result.body) {
                    this.setState({
                        bucketlists: result.body
                    });
                } else {
                    this.setState({
                        bucketlists: []
                    });
                }
            })
    }
    deleteBucketlist(bucketlist) {
        const bucketlists = [...this.state.bucketlists];
        const bucketlistIndex = bucketlists.indexOf(bucketlist)
        bucketlists.splice(bucketlistIndex, 1);

        this.setState({
            bucketlists: bucketlists
        })
        request
            .delete(`/api/v1/bucketlists/${bucketlist.id}/`)
            .set('Authorization', 'JWT ' +
                this.props.location.state.token || (JSON.parse(localStorage.getItem('username') || '{}') || 'token'))
            .end((err, result) => {
                if (result.status == 200 ){
                    this.fetchBucketlists()
                } else {
                    this.setState({
                        deleteError: true
                    })
                }
            })
    }
    editBucketlist(newName, bucketlist) {
        const bucketlists = [...this.state.bucketlists];
        const bucketlistIndex = bucketlists.indexOf(bucketlist)
        bucketlist.list_name = newName
        bucketlists.splice(bucketlistIndex, 1, bucketlist);
        this.setState({
            bucketlists: bucketlists
        })
        request
            .put(`/api/v1/bucketlists/${bucketlist.id}/`)
            .set('Authorization', 'JWT ' +
                this.props.location.state.token || (JSON.parse(localStorage.getItem('username') || '{}') || 'token'))
            .send({'list_name': newName})
            .end((err, result) => {
                if (result.status == 200 ){
                    this.fetchBucketlists()
                } else {
                    this.setState({
                        editError: true
                    })
                }
            })
    }
    addBucketlistItem(itemName, bucketlist) {
        const bucketlists = [...this.state.bucketlists];
        const bucketlistIndex = bucketlists.indexOf(bucketlist)
        bucketlist.items.push({'item_name': itemName})
        bucketlists.splice(bucketlistIndex, 1, bucketlist);
        this.setState({
            bucketlists: bucketlists
        })
        request
            .post(`/api/v1/bucketlists/${bucketlist.id}/items/`)
            .set('Authorization', 'JWT ' +
                this.props.location.state.token || (JSON.parse(localStorage.getItem('username') || '{}') || 'token'))
            .send({'item_name': itemName})
            .end((err, result) => {
                if (result.status == 201 ){
                    this.fetchBucketlists()
                } else {
                    this.setState({
                        addItemError: true
                    })
                }
            })

    }
    editBucketlistItem(newItem, item, bucketlist) {
        const bucketlists = [...this.state.bucketlists];
        const bucketlistIndex = bucketlists.indexOf(bucketlist)
        const itemIndex = bucketlist.items.indexOf(item)
        item.item_name = newItem.item_name
        item.done = newItem.done
        bucketlist.items.splice(itemIndex, 1, item);
        bucketlists.splice(bucketlistIndex, 1, bucketlist);
        this.setState({
            bucketlists: bucketlists
        })
        request
            .put(`/api/v1/bucketlists/${bucketlist.id}/items/${item.id}/`)
            .set('Authorization', 'JWT ' +
                this.props.location.state.token || (JSON.parse(localStorage.getItem('username') || '{}') || 'token'))
            .send(newItem)
            .end((err, result) => {
                if (result.status == 200 ){
                    this.fetchBucketlists()
                } else {
                    this.setState({
                        editItemError: true
                    })
                }
            })
    }

    deleteBucketlistItem(item, bucketlist) {
        const bucketlists = [...this.state.bucketlists];
        const bucketlistIndex = bucketlists.indexOf(bucketlist)
        const itemIndex = bucketlist.items.indexOf(item)
        bucketlist.items.splice(itemIndex, 1);
        bucketlists.splice(bucketlistIndex, 1, bucketlist);
        this.setState({
            bucketlists: bucketlists
        })
        request
            .delete(`/api/v1/bucketlists/${bucketlist.id}/items/${item.id}/`)
            .set('Authorization', 'JWT ' +
                this.props.location.state.token || (JSON.parse(localStorage.getItem('username') || '{}') || 'token'))
            .end((err, result) => {
                if (result.status == 200 ){
                    this.fetchBucketlists()
                } else {
                    this.setState({
                        deleteError: true
                    })
                }
            })
    }



    renderBucketlists() {

        return this.state.bucketlists ?
            (this.state.bucketlists.map((bucketlist) => {
                return (<Bucketlist listName={bucketlist.list_name} key={bucketlist.id}
                        id={bucketlist.id} items={bucketlist.items}
                        bucketlist={bucketlist} onDelete={this.deleteBucketlist.bind(this)}
                        onEdit={this.editBucketlist.bind(this)}
                        onDeleteItem={this.deleteBucketlistItem.bind(this)}
                        onEditItem={this.editBucketlistItem.bind(this)}
                        onAddItem={this.addBucketlistItem.bind(this)}/>)
            })) : null
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
                    this.fetchBucketlists(),
                    this.setState({
                        listName: ''
                    })
                } else {
                    this.setState({
                        error: true
                    })
                }
            })
    }
    handleUpdateInput(value) {
        this.setState({
            query: value,
            searching: true,
            initialBucketlists: this.state.bucketlists
        })
        console.log(value)
    }
    handleSearch(searchText, index) {
            this.setState({
                bucketlists: this.state.bucketlists.filter((bucketlist) => {
                    if (bucketlist.list_name == searchText) {
                        return bucketlist
                    }
                })
            })
    }
    cancelSearch() {
        this.setState({
            bucketlists: this.state.initialBucketlists,
            searching: false,
            query: ''
        })
    }
    render() {
        const bucketlists = this.renderBucketlists();
        let bucketlistNodes = <div className="component">{bucketlists}</div>
        return (

            <div className="container-fluid">
                <div
                    className="center">
                    <IconButton
                      touch={true} disabled={true}
                    ><Search className="item-search"/></IconButton>
                    <AutoComplete
                        animated={true}
                        hintText="Search for a bucketlist"
                        searchText={this.state.query}
                        filter={AutoComplete.caseInsensitiveFilter}
                        dataSource={this.state.bucketlists.map((bucketlist) => {return bucketlist.list_name})}
                        onUpdateInput={this.handleUpdateInput.bind(this)}
                        onNewRequest={this.handleSearch.bind(this)}
                        />
                    {this.state.searching ?
                        <IconButton
                            touch={true}
                            onClick={this.cancelSearch.bind(this)}
                            ><Clear className="item-search"/></IconButton>
                        : null
                    }
                </div>
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
