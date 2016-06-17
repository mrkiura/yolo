import React, { Component } from 'react';
import IconButton from 'material-ui/lib/icon-button';
import FlatButton from 'material-ui/lib/flat-button';
import { ListItem } from 'material-ui/lib/lists';
import Checkbox from 'material-ui/lib/checkbox';
import Divider from 'material-ui/lib/divider';
import ImageEdit from 'material-ui/lib/svg-icons/image/edit';
import Delete from 'material-ui/lib/svg-icons/action/delete';
import Dialog from 'material-ui/lib/dialog';
import TextField from 'material-ui/lib/text-field';


const style = {
  float: 'right',
  'font-weight': 'normal',
  right: {
    float: 'right',
  },
  itemAction: {
    transform: 'translateY(-35%)',
    float: 'right',
  },
  checkbox: {
    marginBottom: 16,
  },
  label: {
    fontWeight: 'normal',
  },
  validationError: {
    float: 'left',
    color: 'red',
    fontSize: '12px',
  },
};

export default class BucketListItem extends Component {
    constructor() {
      super();
      this.state = {
        showEditDialog: false,
        showDeleteDialog: false,
        newItemName: '',
        editName: true,
        done: false,
        deleteName: true,
        editItemError: false,
      };
      this.handleEditDialog = this.handleEditDialog.bind(this);
      this.handleDeleteDialog = this.handleDeleteDialog.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.handleFieldChange = this.handleFieldChange.bind(this);
      this.handleCancelEdit = this.handleCancelEdit.bind(this);
      this.handleConfirmEdit = this.handleConfirmEdit.bind(this);
      this.handleCancelDelete = this.handleCancelDelete.bind(this);
      this.handleConfirmDelete = this.handleConfirmDelete.bind(this);
      this.handleEdit = this.handleEdit.bind(this);
      this.handleCheckbox = this.handleCheckbox.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
    }

    handleEditDialog() {
      this.setState({
        showEditDialog: !this.state.showEditDialog,
      });
    }

    handleDeleteDialog() {
      this.setState({
        showDeleteDialog: !this.state.showDeleteDialog,
      });
    }

    handleClick() {
      this.setState({ open: true });
    }

    handleFieldChange(event) {
      event.preventDefault();
      const key = event.target.name;
      const value = event.target.value;
      this.setState({
        [key]: value,
      }, () => {
        if (this.state.newItemName === '') {
          this.setState({
            editItemError: true,
          });
        } else {
          this.setState({
            editItemError: false,
          });
        }
      });
    }

    handleCheckbox(event, isInputChecked) {
      event.preventDefault();
      this.setState({
        done: isInputChecked,
      });
    }

    handleConfirmEdit() {
      if (this.state.newItemName !== '') {
        this.handleEditDialog();
        this.setState({
          editName: true,
        }, () => {
          this.handleEdit();
        });
      } else {
        this.setState({
          editName: true,
        }, () => {
          this.handleEdit();
        });
      }
    }

    handleConfirmDelete() {
      this.handleDeleteDialog();
      this.setState({
        deleteName: true,
      }, () => {
        this.handleDelete();
      });
    }

    handleCancelDelete() {
      this.handleDeleteDialog();
      this.setState({
        deleteList: false,
      });
    }

    handleCancelEdit() {
      this.handleEditDialog();
      this.setState({
        editName: false,
      });
    }

    handleEdit() {
      if (this.state.editName) {
        const item = {
          item_name: this.state.newItemName,
          done: this.state.done,
        };
        this.props.onEditItem(item, this.props.item, this.props.bucketlist);
      }
    }

    handleDelete() {
      if (this.state.deleteName) {
        this.props.onDeleteItem(this.props.item, this.props.bucketlist)
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
      ];
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
      ];
      return (
        <div>
          <ListItem
            primaryText={this.props.itemName}
            className={this.props.className}
            id="list-item"
            disabled={true}
            children={
              <div style={style.itemAction} >
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
              onChange={this.handleFieldChange}
            />
            <br />
            {
              this.state.editItemError ?
            <span style={style.validationError}>This field is required</span>
            : null
            }
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
  );
    }
}
