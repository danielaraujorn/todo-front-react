import React, { Component } from "react";
// import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import globalClasses from "./styles";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { todosContext } from "../contexts";
import classnames from "classnames";
const styles = globalClasses;
class AddCheckbox extends Component {
  state = {
    title: ""
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  render() {
    const { classes } = this.props;
    const { title } = this.state;
    return (
      <Paper className={classnames(classes.card, classes.paperAddTodo)}>
        <todosContext.Consumer>
          {({ postTodo }) => (
            <form
              autoComplete="true"
              style={{ padding: 10 }}
              onSubmit={e => {
                e && e.preventDefault();
                if (title.length > 0) {
                  const data = { title };
                  this.setState({ title: "" });
                  postTodo(data);
                }
              }}
            >
              <div>
                <TextField
                  name="todoTitle"
                  id="outlined-name"
                  label="Adicionar Lista"
                  className={classes.textfield}
                  margin="dense"
                  value={title}
                  onChange={this.handleChange("title")}
                  variant="outlined"
                  InputProps={
                    title.length > 0
                      ? {
                          endAdornment: (
                            <InputAdornment
                              position="end"
                              style={{ marginRight: -4 }}
                            >
                              <IconButton
                                aria-label="adicionar"
                                onClick={() => {
                                  const data = { title };
                                  this.setState({ title: "" });
                                  postTodo(data);
                                }}
                              >
                                <AddIcon fontSize="small" />
                              </IconButton>
                            </InputAdornment>
                          )
                        }
                      : null
                  }
                />
              </div>
            </form>
          )}
        </todosContext.Consumer>
      </Paper>
    );
  }
}

AddCheckbox.propTypes = {};

export default withStyles(styles)(AddCheckbox);
