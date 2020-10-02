import './App.css';
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateTodo from "./create-todo.component";


export default class App extends Component {


  componentDidMount() {
    debugger;

    fetch('./api/call').then((e) => {
      debugger;
    })
  }

  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
  
        <Router>
          <div className="container">
            <h2>MERN-Stack Login App</h2>
            <Link to="/create" className="nav-link">Create Todo</Link>
          </div>
          <Route path="/create" component={CreateTodo} />
        </Router>
      </div>
    );
  }
}


