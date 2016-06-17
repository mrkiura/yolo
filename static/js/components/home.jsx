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
    this.handleEmptyAdd = this.handleEmptyAdd.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this)
    this.handleLogout = this.handleLogout.bind(this);
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

  addBucketlistItem(itemName, bucketlist) {
    if (itemName === '') {
      return;
    }
    const bucketlists = [...this.state.bucketlists];
    const bucketlistIndex = bucketlists.indexOf(bucketlist);
    bucketlist.items.push({ item_name: itemName });
    bucketlists.splice(bucketlistIndex, 1, bucketlist);
    this.setState({ bucketlists });
    request
      .post(`/api/v1/bucketlists/${bucketlist.id}/items/`)
      .set('Authorization', 'JWT ' +
          this.props.location.state.token || (JSON.parse(localStorage
            .getItem('username') || '{}') || 'token'))
      .send({ item_name: itemName })
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
  handleEmptyAdd() {
    this.setState({
      addError: false,
    });
  }

  render() {
    const bucketlists = this.displayBucketlists();
    const bucketlistNodes = <div className="component">{bucketlists}</div>
    const searchBar = <AutoComplete
      animated={true}
      hintText="Search for a bucketlist"
      searchText={this.state.query}
      filter={AutoComplete.caseInsensitiveFilter}
      dataSource={this.state.bucketlists.map((bucketlist) => {return bucketlist.list_name})}
      onUpdateInput={this.handleUpdateInput}
      onNewRequest={this.handleSearch}
    />
    return (
        <div>
          <Menu
              handleLogout={this.handleLogout}
              loggedIn={true}
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
              <div className="list-input">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Add bucketlist..."
                      valueLink={this.makeValueLink('listName')}/>
                    <span className="input-group-btn">
                        <button className="btn btn-secondary" type="button"
                            onClick={this.submitBucketlist}>Add</button>
                    </span>
                    <Snackbar
                      className="toast-alerts"
                      open={this.state.addError}
                      message="Pleae provide a name."
                      autoHideDuration={2000}
                      onRequestClose={this.handleEmptyAdd}
                    />
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
