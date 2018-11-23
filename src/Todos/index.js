import React, { Component } from "react";
import Todo from "./Todo";
import { request } from "../utils";
import { getMyTodosRoute } from "../config";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import globalClasses from "./styles";
// import Card from "@material-ui/core/Card";
// import TextField from "@material-ui/core/TextField";
// import CardContent from "@material-ui/core/CardContent";
// import IconButton from "@material-ui/core/IconButton";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import Visibility from "@material-ui/icons/Visibility";
const styles = globalClasses;
class Todos extends Component {
  state = {
    todos: []
  };
  componentWillMount() {
    request(getMyTodosRoute).then(response => {
      const { todos } = response.data;
      this.setState({ todos });
    });
  }
  render() {
    // const { classes } = this.props;
    return (
      <Grid container>
        {this.state.todos.map(todo => (
          <Grid key={todo.id} item xs={12}>
            <Todo {...todo} />{" "}
            {/* <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <TextField
                  className={classes.input}
                  placeholder="título"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          // onClick={this.handleClickShowPassword}
                        >
                          <Visibility />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  // value={this.state.email}
                  // onChange={this.handleChange("email")}
                />
              </CardContent>
            </Card> */}
          </Grid>
        ))}
      </Grid>
    );
  }
}

Todos.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Todos);
