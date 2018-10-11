import React, { Component } from 'react';
import todos from './todoList.json';
import TodoItem from './TodoItem.js'
import CompletedList from './CompletedList'
import './App.css';


class App extends Component {
  constructor(props){
      super(props);
      this.state={
        myList:todos,
        searchString : ''

      }
    }
////////////////Toggle done//////////////
  changeStatus=(index)=>{
    const newChangedTodo=this.state.myList.map((item)=>{
      if(index===item.id)
      item.done=!item.done
      return item
    })
    this.setState({
      myList:newChangedTodo
    })
  }
//////////////Hide Completed Items///////////
  hideCompleted=(index)=>{
    const completedList=this.state.myList.filter((item)=>{
      return item.done===false
    })
    console.log(completedList)
    this.setState({
      myList:completedList,
    })
  }
  ////////////////Delete////////////////
  deleteItem=(index)=>{
    const filteredList=this.state.myList.filter((item)=>{
      return item.id !== index
    })
    this.setState({
      myList:filteredList
    })
  }
  /////////////////////Search////////////////
  
  searchItem = (event) => {
		const searchString = event.target.value
		this.setState({searchString : searchString})
  }
  

  render(){
    const myFilteredItems = this.state.myList.filter((repo) => {
			const regex = new RegExp(this.state.searchString, 'g')
			return regex.test(repo.description)
		})
    const myList=this.state.myList
    return (
      <div className="container">

        <h1>My Todo List</h1>
        <input type='text'className="searchInput" onChange={this.searchItem}></input>
        <TodoItem myFilteredItems={myFilteredItems} changeStatus={this.changeStatus} deleteItem={this.deleteItem}/>
        <CompletedList hideCompleted={this.hideCompleted} />
        <h3 >Todo items : {myList.length}{(myList.length===0||myList.length===1)? " item":" items"}</h3> 
        
      </div>
      );
    }
}

export default App;
  