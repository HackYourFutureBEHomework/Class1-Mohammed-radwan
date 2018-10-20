import React, { Component } from 'react'
import todos from './todoList.json'
import TodoItem from './TodoItem.js'
import CompletedList from './CompletedList'
//import DatePicker from 'react-date-picker';
import './App.css'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class App extends Component {
  constructor(props){
      super(props);
      this.state={
        myList:todos,
        searchString : '',
        newItem:'',
        id:5,
        deadline: moment()
      }
      this.getDate = this.getDate.bind(this);
    }

    getDate(date) {
      this.setState({deadline:date});
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
  hideCompleted=()=>{
    const completedList=this.state.myList.filter((item)=>{
      return item.done===false
    })
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
  newTodoItem=(event)=>{
    this.setState({newItem:event.target.value,})
  }

  onSubmit = (event) => {
    event.preventDefault();
    if(this.state.newItem)
    {
      const todo = {description: this.state.newItem, id:this.state.id,done:false,deadline:this.state.deadline.format("dddd Y-MM-DD")}
      this.state.myList.push(todo);
      const id = this.state.id+1;
      this.setState({
        newItem:'',
        myList:this.state.myList,
        id:id
      })
    }
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
        <input type='text' className="searchInput" onChange={this.searchItem} placeholder="Search Todo "></input>
        <form className="App" 
              onSubmit={this.onSubmit}>
              <input type='text' className="NewTodo" onChange={this.newTodoItem} ></input>
              <DatePicker selected={this.state.deadline} 
                          onChange={this.getDate} 
                          placeholderText="Click to select a date" 
                          isClearable={true}/>
              <button>Add</button>
        </form>

        <TodoItem myFilteredItems={myFilteredItems} 
                  changeStatus={this.changeStatus} 
                  deleteItem={this.deleteItem}/>

        <CompletedList hideCompleted={this.hideCompleted} />

        <h3 >Todo items : {myList.length}{(myList.length===0||myList.length===1)? " item":" items"}</h3> 
        
      </div>
      );
    }
}

export default App;
  