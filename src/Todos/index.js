import React, { Component } from "react";
import Todo from "./Todo";
import { request } from "../utils";
import { getMyTodosRoute, checkboxRoute } from "../config";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import globalClasses from "./styles";
import { todosContext } from "../contexts";
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
  submitCheck = data => {
    request.post(checkboxRoute, data).then(response => {
      if (response.status === 200) {
        const todosCopia = [...this.state.todos];
        const index = todosCopia.findIndex(
          ({ id }) => id === response.data.todoId
        );
        todosCopia[index].checkboxes !== undefined
          ? todosCopia[index].checkboxes.push(response.data)
          : (todosCopia[index].checkboxes = [response.data]);
        this.setState({ todos: todosCopia });
      }
    });
  };
  render() {
    // const { classes } = this.props;
    const { todos } = this.state;
    return (
      <Grid container>
        <todosContext.Provider
          value={{
            todos: todos,
            submitCheck: this.submitCheck
          }}
        >
          {todos.map(todo => (
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
        </todosContext.Provider>
      </Grid>
    );
  }
}

Todos.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Todos);
