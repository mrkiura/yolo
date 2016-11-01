import React, { Component } from 'react';
import IconButton from 'material-ui/lib/icon-button';
import request from 'superagent';
import Search from 'material-ui/lib/svg-icons/action/search';
import Clear from 'material-ui/lib/svg-icons/content/clear';
import AutoComplete from 'material-ui/lib/auto-complete';
import Menu from './menu.jsx';
import Bucketlist from './bucketlist.jsx';
import { browserHistory } from 'react-router';
import Snackbar from 'material-ui/lib/snackbar';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import Dialog from 'material-ui/lib/dialog';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';

const style = {
  addButton: {
    float: 'right',
    marginRight: '25px',
  },
  dialog: {
    margin: '0 auto',
    width: '500px',
  },
  validationError: {
    float: 'left',
    color: 'red',
    fontSize: '12px',
  },
};

class Home extends Component {
  constructor() {
    super();
    this.makeValueLink = this.makeValueLink.bind(this);
    this.submitBucketlist = this.submitBucketlist.bind(this);
    this.editBucketlist = this.editBucketlist.bind(this);
    this.deleteBucketlistItem = this.deleteBucketlistItem.bind(this);
    this.deleteBucketlist = this.deleteBucketlist.bind(this);
    this.editBucketlistItem = this.editBucketlistItem.bind(this);
    this.addBucketlistItem = this.addBucketlistItem.bind(this);
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.cancelSearch = this.cancelSearch.bind(this);
    this.handleToggleError = this.handleToggleError.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleCancelAdd = this.handleCancelAdd.bind(this);
    this.handleConfirmAdd = this.handleConfirmAdd.bind(this);
    this.handleAddDialog = this.handleAddDialog.bind(this);

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
      query: '',
      searchError: false,
      addListDialog: false,
      newList: '',
      addListName: false,
    };
  }
  componentWillMount() {
    const loggedIn = typeof (JSON.parse(localStorage.getItem('token')
          || '{}')) === 'string' ? true : false;
    if (loggedIn === false) {
      window.location.href = '/login';
    }
  }
  componentDidMount() {
    this.fetchBucketlists();
  }

  fetchBucketlists() {
    request
      .get('/api/v1/bucketlists/')
      .set('Authorization', 'JWT ' +
          this.props.location.state.token || (JSON.parse(localStorage
            .getItem('username') || '{}') || 'token'))
      .end((err, result) => {
        if (result.body) {
          this.setState({
            bucketlists: result.body,
          });
        } else {
          this.setState({
            bucketlists: [],
          });
        }
      });
  }

  deleteBucketlist(bucketlist) {
    const bucketlists = [...this.state.bucketlists];
    const bucketlistIndex = bucketlists.indexOf(bucketlist);
    bucketlists.splice(bucketlistIndex, 1);
    this.setState({ bucketlists });
    request
      .delete(`/api/v1/bucketlists/${bucketlist.id}/`)
      .set('Authorization', 'JWT ' +
          this.props.location.state.token || (JSON.parse(localStorage
            .getItem('username') || '{}') || 'token'))
      .end((err, result) => {
        if (result.status === 200) {
          this.fetchBucketlists();
        } else {
          this.setState({
            deleteError: true,
          });
        }
      });
  }

  editBucketlist(newName, bucketlist) {
    if (newName === '') {
      return;
    }
    const bucketlists = [...this.state.bucketlists];
    const bucketlistIndex = bucketlists.indexOf(bucketlist);
    const list = bucketlist;
    list.list_name = newName;
    bucketlists.splice(bucketlistIndex, 1, list);
    this.setState({ bucketlists });
    request
        .put(`/api/v1/bucketlists/${bucketlist.id}/`)
        .set('Authorization', 'JWT ' +
            this.props.location.state.token || (JSON.parse(localStorage
              .getItem('username') || '{}') || 'token'))
        .send({ list_name: newName })
        .end((err, result) => {
          if (result.status === 200) {
            this.fetchBucketlists();
          } else {
            this.setState({ editError: true });
          }
        });
  }

  addBucketlistItem(itemName, done, bucketlist) {
    if (itemName === '') {
      return;
    }
    console.log(itemName, done);
    const bucketlists = [...this.state.bucketlists];
    const bucketlistIndex = bucketlists.indexOf(bucketlist);
    const doneStatus = done;
    bucketlist.items.push({ item_name: itemName, done: doneStatus });
    bucketlists.splice(bucketlistIndex, 1, bucketlist);
    this.setState({ bucketlist: bucketlists });
    request
      .post(`/api/v1/bucketlists/${bucketlist.id}/items/`)
      .set('Authorization', 'JWT ' +
          this.props.location.state.token || (JSON.parse(localStorage
            .getItem('username') || '{}') || 'token'))
      .send({ item_name: itemName, done: doneStatus })
      .end((err, result) => {
        if (result.status === 201) {
          this.fetchBucketlists();
        } else {
          this.setState({
            addItemError: true,
          });
        }
      });
  }

  editBucketlistItem(newItem, item, bucketlist) {
    if (newItem.item_name === '') {
      return;
    }
    const bucketlists = [...this.state.bucketlists];
    const bucketlistIndex = bucketlists.indexOf(bucketlist);
    const itemIndex = bucketlist.items.indexOf(item);
    const listItem = item;
    listItem.item_name = newItem.item_name;
    listItem.done = newItem.done;
    bucketlist.items.splice(itemIndex, 1, listItem);
    bucketlists.splice(bucketlistIndex, 1, bucketlist);
    this.setState({ bucketlists });
    request
      .put(`/api/v1/bucketlists/${bucketlist.id}/items/${item.id}/`)
      .set('Authorization', 'JWT ' +
          this.props.location.state.token || (JSON.parse(localStorage
            .getItem('username') || '{}') || 'token'))
      .send(newItem)
      .end((err, result) => {
        if (result.status === 200) {
          this.fetchBucketlists();
        } else {
          this.setState({
            editItemError: true,
          });
        }
      });
  }

  deleteBucketlistItem(item, bucketlist) {
    const bucketlists = [...this.state.bucketlists];
    const bucketlistIndex = bucketlists.indexOf(bucketlist);
    const itemIndex = bucketlist.items.indexOf(item);
    bucketlist.items.splice(itemIndex, 1);
    bucketlists.splice(bucketlistIndex, 1, bucketlist);
    this.setState({ bucketlists });
    request
      .delete(`/api/v1/bucketlists/${bucketlist.id}/items/${item.id}/`)
      .set('Authorization', 'JWT ' +
          this.props.location.state.token || (JSON.parse(localStorage
            .getItem('username') || '{}') || 'token'))
      .end((err, result) => {
        if (result.status === 200) {
          this.fetchBucketlists();
        } else {
          this.setState({
            deleteError: true,
          });
        }
      });
  }

  displayBucketlists() {
    return this.state.bucketlists.length > 0 ?
        (this.state.bucketlists.map((bucketlist) => {
          return (
            <Bucketlist listName={bucketlist.list_name} key={bucketlist.id}
              id={bucketlist.id} items={bucketlist.items}
              bucketlist={bucketlist} onDelete={this.deleteBucketlist}
              onEdit={this.editBucketlist}
              onDeleteItem={this.deleteBucketlistItem}
              onEditItem={this.editBucketlistItem}
              onAddItem={this.addBucketlistItem}
            />);
        })) : (<p className="empty-list">It's lonely in here. Please create some bucketlists</p>);
  }

  makeValueLink(key) {
    return {
      value: this.state[key],
      requestChange: (newValue) => {
        const newState = {};
        newState[key] = newValue;
        this.setState(newState);
        this.handleToggleError();
      },
    };
  }
  submitBucketlist() {
    if (this.state.listName === '') {
      this.setState({
        addError: true,
      });
      return;
    }
    this.handleAddDialog()
    this.setState({
      bucketlists: this.state.bucketlists.concat([{
        list_name: this.state.listName,
        items: [],
      }]),
    });
    request
      .post('/api/v1/bucketlists/')
      .set('Authorization', 'JWT ' +
          this.props.location.state.token || (JSON.parse(localStorage
            .getItem('username') || '{}') || 'token'))
      .send({ list_name: this.state.listName })
      .end((err, result) => {
        if (result.status === 201) {
          this.fetchBucketlists();
          this.setState({
            listName: '',
          });
        } else {
          this.setState({
            error: true,
          });
        }
      });
  }
  handleUpdateInput(value) {
    this.setState({
      query: value,
      searching: true,
      initialBucketlists: this.state.bucketlists,
    });
  }
  handleSearch(searchText, index) {
    const dataSource = this.state.bucketlists.map((bucketlist) => {return bucketlist.list_name;});
    if (dataSource.indexOf(searchText) === -1) {
      this.setState({
        searchError: true,
      }, () => {
        this.cancelSearch();
      });
    } else {
      this.setState({
        bucketlists: this.state.bucketlists.filter((bucketlist) => {
          if (bucketlist.list_name === searchText) {
            return bucketlist;
          }
        }),
      });
    }
  }
  cancelSearch() {
    this.setState({
      bucketlists: this.state.initialBucketlists,
      searching: false,
      query: '',
    });
  }
  handleLogout() {
    localStorage.clear();
    browserHistory.push('/login');
    this.setState({
      loggedIn: false,
      hasUsername: false,
    });
  }
  handleRequestClose() {
    this.setState({
      searchError: false,
      bucketlists: this.state.initialBucketlists,
    });
  }

  handleAddDialog() {
    this.setState({
      addListDialog: !this.state.addListDialog,
    });
  }

  handleConfirmAdd() {
    if (this.state.listName !== '') {
      this.handleAddDialog();
      this.setState({
        addListName: true,
      }, () => {
        this.submitBucketlist();
      });
    } else {
      this.setState({
        addListName: true,
      });
    }
  }

  handleCancelAdd() {
    this.handleAddDialog();
    this.setState({
      addListName: false,
    });
  }

  handleToggleError() {
    if (this.state.listName === '') {
      this.setState({
        addError: true,
      });
    } else {
      this.setState({
        addError: false,
      });
    }
  }

  render() {
    const bucketlists = this.displayBucketlists();
    const bucketlistNodes = <div className="component">{bucketlists}</div>
    const addDialogActions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onClick={this.handleCancelAdd}
      />,
      <FlatButton
        label="Add"
        primary={true}
        onClick={this.handleConfirmAdd}
      />
    ];
    return (
        <div className="body-content">
          <Menu
              handleLogout={this.handleLogout}
              loggedIn={true}
              username={(JSON.parse(localStorage.getItem('username')
                    || '{}'))}
          />
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
                onUpdateInput={this.handleUpdateInput}
                onNewRequest={this.handleSearch}
              />
              {this.state.searching ?
                <IconButton
                  touch={true}
                  onClick={this.cancelSearch}
                  ><Clear className="item-search"/></IconButton>
                : null
              }
            </div>
                          <FloatingActionButton
                            style={style.addButton}
                            onClick={this.handleAddDialog}>
                            <ContentAdd />
                          </FloatingActionButton>
              <Dialog
                contentStyle={style.dialog}
                actions={addDialogActions}
                modal={false}
                open={this.state.addListDialog}
                onRequestClose={this.handleAddDialog}
              >
              <TextField
                hintText="Add a bucketlist"
                onFocus={this.handleToggleError}
                onEnterKeyDown={this.submitBucketlist}
                valueLink={this.makeValueLink('listName')}
              />
              <br />
              {
                this.state.addError ?
              <span style={style.validationError}>This field is required</span>
              : null
              }
              </Dialog>
              <div className="list-input">
                <div className="input-group">
                    <Snackbar
                      className="toast-alerts"
                      open={this.state.searchError}
                      message="No bucketlist matching the search term was found."
                      autoHideDuration={2000}
                      onRequestClose={this.handleRequestClose}
                    />
                </div>
              </div>
                    <div className="parent">
                        <div className="component">
                            {bucketlistNodes}

                        </div>
                    </div>
                </div>
            </div>
        );
  }
}

module.exports = Home;
