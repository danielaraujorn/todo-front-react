import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { getCookie } from "./utils";
import Login from "./Auth/login";
import Todos from "./Todos/";
import Menu from "./menu";
import { searchTextContext } from "./contexts";
export default class Router extends Component {
  state = {
    logged: !!getCookie("token"),
    searchText: ""
  };
  changeLogged = logged => this.setState({ logged });
  privateRoutes = [
    <Menu key="menu" changeLogged={this.changeLogged} />,
    <Route key="todosRoute" path="/" component={Todos} />
  ];
  publicRoutes = [
    <Route
      key="loginRoute"
      path="/"
      exact
      render={() => <Login changeLogged={this.changeLogged} />}
    />
  ];
  render() {
    return (
      <searchTextContext.Provider
        value={{
          searchText: this.state.searchText,
          setSearchText: text => this.setState({ searchText: text })
        }}
      >
        <BrowserRouter>
          <div>
            {/* <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about/">About</Link>
          </li>
          <li>
            <Link to="/users/">Users</Link>
          </li>
        </ul>
      </nav> */}

            {this.state.logged ? this.privateRoutes : this.publicRoutes}
          </div>
        </BrowserRouter>
      </searchTextContext.Provider>
    );
  }
}
