import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import globalClasses from "./styles";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import { todosContext } from "../contexts";
const styles = globalClasses;
class AddCheckbox extends Component {
  state = {
    title: "",
    checked: false
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  render() {
    const { classes, todoId } = this.props;
    const { title, checked } = this.state;
    return (
      <todosContext.Consumer>
        {({ postCheck }) => (
          <form
            onSubmit={e => {
              e && e.preventDefault();
              if (title.length > 0) {
                const data = { ...{ title, checked, todoId } };
                this.setState({ title: "", checked: false });
                postCheck(data);
              }
            }}
          >
            <TextField
              id="outlined-name"
              label="Adicionar item"
              className={classes.textField}
              margin="dense"
              value={title}
              onChange={this.handleChange("title")}
              variant="outlined"
              InputProps={
                title.length > 0
                  ? {
                      startAdornment: (
                        <Checkbox
                          checked={checked}
                          style={{ marginLeft: -12 }}
                          onChange={(e, checked) => this.setState({ checked })}
                        />
                      ),
                      endAdornment: (
                        <InputAdornment
                          style={{ marginRight: -4 }}
                          position="end"
                        >
                          <IconButton
                            aria-label="adicionar"
                            onClick={this.submit}
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      )
                    }
                  : null
              }
            />
          </form>
        )}
      </todosContext.Consumer>
    );
  }
}

AddCheckbox.propTypes = {
  todoId: PropTypes.string.isRequired
};

export default withStyles(styles)(AddCheckbox);
