import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { request, saveTokenCookie } from "../utils";
import { loginRoute } from "../config";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  container: {
    backgroundColor: theme.palette.primary.light,
    display: "flex",
    alignItems: "center",
    height: "100vh",
    justifyContent: "center",
    width: "100vw"
  },
  formContainer: {
    padding: 15,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.common.white,
    display: "flex",
    flexFlow: "column",
    maxWidth: 400,
    minWidth: 290,
    width: "25%"
  },
  form: {
    display: "flex",
    flexFlow: "column"
  },
  input: {
    marginBottom: 5,
    marginTop: 5
  }
});

class Login extends Component {
  state = {
    email: "",
    password: ""
  };
  handleChange = state => event => {
    this.setState({
      [state]: event.target.value
    });
  };
  submit = e => {
    e && e.preventDefault();
    const { email, password } = this.state;
    // fetch("http://localhost:3000/api" + loginRoute, {
    //   method: "POST",
    //   mode: "no-cors",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json"
    //   },
    //   //   credentials: "include",
    //   body: JSON.stringify({ email, password })
    // })
    //   .then(res => res.json())
    //   .then(res => console.log(res));
    request.post(loginRoute, { email, password }).then(response => {
      saveTokenCookie(response.data.id);
      this.props.changeLogged(!!response.data.id);
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <div className={classes.formContainer}>
          <form onSubmit={this.submit} className={classes.form}>
            <TextField
              required={true}
              autoFocus={true}
              className={classes.input}
              label="Email"
              placeholder="email@email.com"
              value={this.state.email}
              onChange={this.handleChange("email")}
            />
            <TextField
              required={true}
              className={classes.input}
              label="Senha"
              placeholder="********"
              value={this.state.password}
              type="password"
              onChange={this.handleChange("password")}
            />
            <input style={{ display: "none" }} type="submit" />
          </form>
          <Button
            className={classes.input}
            onClick={this.submit}
            variant="contained"
            color="primary"
            type="submit"
          >
            Entrar
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Login);
