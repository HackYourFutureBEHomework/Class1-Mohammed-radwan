import React, { Component } from 'react';
import './App.css';
import Main from './Main';
// Import json data 
// Download from https://api.github.com/users/[YOUR GITHUB NAME]/repos
import myMovies from './movieList.json';

const RepoItem = (props) => {
  return (
    <Main />
  )
}

class App extends Component {
  render() {
    const repos = myMovies.map((repo, index) => {
      return (
        <RepoItem key={index} repo={repo}/>
      )
    })
    return (
      <ul className="main-List">
        {repos}
      </ul>
      );
  }
}

export default App;