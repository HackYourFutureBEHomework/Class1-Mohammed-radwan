import React, { Component } from 'react';
import todos from './todoList.json';
import TodoItem from './TodoItem.js'
import './App.css';


class App extends Component {
  constructor(props){
      super(props);
      this.state={
        myList:todos,
        complete:[]
      }
    }

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

  completedItems=()=>{
    const completedList=this.state.myList.filter((item)=>{
      return item.done===true
    })
    console.log(completedList)
    this.setState({
      complete:completedList
    })
  }
  
  render(){
    const complete=this.state.complete
    return (

      <div className="container">
        <h1>My Todo List</h1>
        <TodoItem myList={this.state.myList} changeStatus={this.changeStatus} completedItems={this.completedItems}/>
        <h3 >Todo items : {complete.length}{(complete.length===0||complete.length===1)? " item":" items"}</h3> 

      </div>
      );
    }
}

export default App;
