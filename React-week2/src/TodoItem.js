import React, { Component } from 'react';


class TodoOpject extends Component{
    
    render(){
        const todos=this.props.todos
        const changeStatus=this.props.changeStatus
        const deleteItem=this.props.deleteItem
            return(
            <div className="todoOpject">
                <input type="checkbox" className="itemCheckbox" 
                       checked={todos.done? "checked":""} 
                       onChange={()=>{changeStatus(todos.id)}} >
                </input>

                <li className={todos.done? "itemDescription":"notDone"}>{todos.description}
                </li>
                <button type="button" className="deleteButton"
                         onClick={()=>{deleteItem(todos.id)}}>Delete
                </button>
            </div>

        )
    }
                                                                         
}

 class TodoItem extends Component{
    render(){
        const todoItem=this.props.myFilteredItems.map((todos,index)=>{
        return(
            <TodoOpject 
                key={index}
                todos={todos}
                changeStatus={this.props.changeStatus}
                deleteItem={this.props.deleteItem}
            />   
        )
    })
    return(
        <div>

        <ul>
            {todoItem}
            
        </ul>

        </div>
    )
    }

 }
  export default TodoItem;