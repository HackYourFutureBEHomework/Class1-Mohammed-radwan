import React, { Component } from 'react';
import MyRepo from './MyRepo.js'
import './App.css';
import myRepos from './myrepos.json'

class App extends Component {
	constructor(props) {
		super(props)

		// Initial component state
		this.state = {
			myRepos : myRepos,
			loading : false,
			searchString : ''
		}
	}
	// function that is going to fetch the data and updates the Components state with that data
	getData = () => {

		this.setState({loading:true}) //update loading state to true

		fetch('https://api.github.com/users/mohammed-radwan/repos')
			.then((response) => {
				return response.json();
			})
			.then((myJson) => {
				this.setState({
					myRepos: myRepos,
					loading: false
				})
			})
	}

	// delete the repo with repoID from the state
	deleteRepo = (repoID) => {
		const myNewListOfRepos = this.state.myRepos.filter((repo)=> {
			return repoID !== repo.id
		})

		this.setState({
			myRepos: myNewListOfRepos
		})
	}

	searchRepo = (event) => {
		const searchString = event.target.value
		this.setState({searchString : searchString})
	}

	render() {
		const myFilteredRepos = this.state.myRepos.filter((repo) => {
			const regex = new RegExp(this.state.searchString, 'g')
			return regex.test(repo.name)
		})
		return (
			<div className="container">
				{this.state.loading? 'loading':''}
				<button onClick={this.getData} >Refresh</button>
				<input type='text' onChange={this.searchRepo}></input>
				<MyRepo myReposProps={myFilteredRepos} deleteRepo={this.deleteRepo} />
			</div>
		);
	}
}

export default App;
