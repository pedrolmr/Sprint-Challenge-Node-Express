import React, { Component } from 'react';
import './App.css';
import ProjectsList from './components/ProjectsList'

import axios from 'axios';
import { Router } from 'react-router-dom';

class App extends Component {
  constructor(){
    super();
    this.state = {
      projects:[]
    }
  }
  componentDidMount() {
    axios
      .get("http://localhost:8000/api/projects")
      .then(res => this.setState({ projects: res.data }))
      .catch(error => console.log(error));
  }
  render() {
    return (
      <div className="App">
        <ProjectsList projects={this.state.projects}/>
      </div>
    );
  }
}

export default App;
