import React, { Component } from "react";
// import { request } from "../utils";
// import { getMyTodosRoute } from "../config";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import globalClasses from "./styles";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CancelIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import { todosContext } from "../contexts";
const styles = globalClasses;
class MyCheckbox extends Component {
  state = {
    checked: this.props.checked
  };
  render() {
    const { classes } = this.props;
    return (
      <todosContext.Consumer>
        {({ putCheck }) => (
          <>
            <div className={classes.checkboxContainer}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.checked}
                    onChange={(e, checked) => {
                      this.setState({ checked });
                      putCheck({
                        id: this.props.id,
                        checked
                      });
                    }}
                  />
                }
                label={this.props.title}
              />
              <div className={classes.todoButtons}>
                <IconButton fontSize="small" aria-label="cancelar">
                  <CancelIcon fontSize="small" />
                </IconButton>
              </div>
            </div>
          </>
        )}
      </todosContext.Consumer>
    );
  }
}

MyCheckbox.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired
};

export default withStyles(styles)(MyCheckbox);
