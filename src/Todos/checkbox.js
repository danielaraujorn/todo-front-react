import React, { Component } from "react";
// import { request } from "../utils";
// import { getMyTodosRoute } from "../config";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import globalClasses from "./styles";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
const styles = globalClasses;
class MyCheckbox extends Component {
  state = {
    todos: []
  };
  render() {
    const { classes } = this.props;
    return (
      <FormControlLabel
        className={classes.checkboxContainer}
        control={
          <Checkbox
            checked={this.props.checked}
            // onChange={this.handleChange('checkedA')}
            // value="checkedA"
          />
        }
        label={this.props.title}
      />
    );
  }
}

MyCheckbox.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  title: PropTypes.bool.isRequired
};

export default withStyles(styles)(MyCheckbox);
