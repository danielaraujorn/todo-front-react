import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Login from "./Auth/login";
const About = () => <h2>About</h2>;
const Users = () => <h2>Users</h2>;

const Router = () => (
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

      <Route path="/" exact component={Login} />
      <Route path="/about/" component={About} />
      <Route path="/users/" component={Users} />
    </div>
  </BrowserRouter>
);

export default Router;
