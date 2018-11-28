import React, { Component } from "react";
import Todo from "./Todo";
import { request } from "../utils";
import {
  getMyTodosRoute,
  checkboxRoute,
  updateCheck,
  todosRoute,
  createTodo
} from "../config";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import globalClasses from "./styles";
import { todosContext } from "../contexts";
import AddTodo from "./addTodo";
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
  postTodo = data => {
    request.post(createTodo, data).then(response => {
      if (response.status === 200) {
        const todos = [...this.state.todos, response.data.todo];
        this.setState({ todos });
      }
    });
  };
  putTodo = data => {
    request.put(todosRoute, data).then(response => {
      if (response.status === 200) {
        let todosCopia = [...this.state.todos];
        const indexTodo = todosCopia.findIndex(
          ({ id }) => id === response.data.id
        );
        todosCopia[indexTodo] !== undefined &&
          (todosCopia[indexTodo] = {
            ...todosCopia[indexTodo],
            ...response.data
          });

        this.setState({ todos: todosCopia });
      }
    });
  };
  postCheck = data => {
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
  putCheck = data => {
    request.put(updateCheck, data).then(response => {
      if (response.status === 200) {
        let todosCopia = [...this.state.todos];
        const indexTodo = todosCopia.findIndex(
          ({ id }) => id === response.data.checkbox.todoId
        );
        console.log(response, indexTodo);
        const indexCheckbox =
          indexTodo > 0 &&
          todosCopia[indexTodo].checkboxes.findIndex(
            ({ id }) => id === response.data.checkbox.id
          );
        todosCopia[indexTodo] !== undefined &&
          todosCopia[indexTodo].checkboxes !== undefined &&
          (todosCopia[indexTodo].checkboxes[indexCheckbox] =
            response.data.checkbox);
        this.setState({ todos: todosCopia });
      }
    });
  };
  deleteTodo = id => {
    request.delete(todosRoute + "/" + id).then(response => {
      if (response.status === 200) {
        this.setState({
          todos: [...this.state.todos].filter(item => item.id !== id)
        });
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
            postCheck: this.postCheck,
            putCheck: this.putCheck,
            deleteTodo: this.deleteTodo,
            postTodo: this.postTodo,
            putTodo: this.putTodo
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
          <Grid item xs={12}>
            <AddTodo />
          </Grid>
        </todosContext.Provider>
      </Grid>
    );
  }
}

Todos.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Todos);
