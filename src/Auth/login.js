import React, { Component, Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { request } from "../utils";
import { loginRoute } from "../config";
export default class Login extends Component {
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
    request
      .post(loginRoute, { email, password })
      .then(response => console.log(response));
  };
  render() {
    return (
      <Fragment>
        <form onSubmit={this.submit}>
          <TextField
            label="Email"
            placeholder="email@email.com"
            value={this.state.email}
            onChange={this.handleChange("email")}
          />
          <TextField
            label="Senha"
            placeholder="********"
            value={this.state.password}
            type="password"
            onChange={this.handleChange("password")}
          />
          <input style={{ display: "none" }} type="submit" />
        </form>
        <Button
          onClick={this.submit}
          variant="contained"
          color="primary"
          type="submit"
        >
          Entrar
        </Button>
      </Fragment>
    );
  }
}
