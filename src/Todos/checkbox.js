import React, { Component } from "react";
// import { request } from "../utils";
// import { getMyTodosRoute } from "../config";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import globalClasses from "./styles";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import { todosContext } from "../contexts";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import TextField from "@material-ui/core/TextField";
const styles = globalClasses;
class MyCheckbox extends Component {
  state = {
    checked: this.props.checked,
    editMode: false,
    title: this.props.title
  };
  componentWillReceiveProps(np) {
    if (np.title !== this.state.title) {
      this.setState({ title: np.title });
    }
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  render() {
    const { classes, id, todoId } = this.props;
    const { editMode, title } = this.state;
    return (
      <>
        {editMode ? (
          <todosContext.Consumer>
            {({ putCheck }) => (
              <div
                className={classes.checkboxContainer}
                style={{ paddingLeft: 0 }}
              >
                <Checkbox disabled checked={this.state.checked} />

                <form
                  onSubmit={e => {
                    e.preventDefault();
                    putCheck({
                      id,
                      title,
                      checked: this.state.checked,
                      todoId
                    });
                    this.setState({ editMode: false });
                  }}
                >
                  <TextField
                    autoFocus={true}
                    fullWidth
                    className={classes.textField}
                    value={title}
                    onChange={this.handleChange("title")}
                  />
                </form>
                <div className={classes.todoButtons}>
                  <IconButton
                    aria-label="cancelar"
                    onClick={() =>
                      this.setState({
                        title: this.props.title,
                        editMode: false
                      })
                    }
                  >
                    <CancelIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    color="primary"
                    aria-label="salvar"
                    onClick={() => {
                      putCheck({
                        id,
                        title,
                        checked: this.state.checked,
                        todoId
                      });
                      this.setState({ editMode: false });
                    }}
                  >
                    <SaveIcon fontSize="small" />
                  </IconButton>
                </div>
              </div>
            )}
          </todosContext.Consumer>
        ) : (
          <div className={classes.checkboxContainer}>
            <FormControlLabel
              control={
                <todosContext.Consumer>
                  {({ putCheck }) => (
                    <Checkbox
                      checked={this.state.checked}
                      onChange={(e, checked) => {
                        this.setState({ checked });
                        putCheck({
                          id,
                          todoId,
                          title,
                          checked
                        });
                      }}
                    />
                  )}
                </todosContext.Consumer>
              }
              label={title}
            />
            <div className={classes.todoButtons}>
              <IconButton
                onClick={() => this.setState({ editMode: true })}
                fontSize="small"
                aria-label="cancelar"
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </div>
          </div>
        )}
      </>
    );
  }
}

MyCheckbox.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  todoId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

export default withStyles(styles)(MyCheckbox);
