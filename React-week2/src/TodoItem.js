import React, { Component } from 'react';


class TodoOpject extends Component{
    
    render(){
        const todos=this.props.todos
        const changeStatus=this.props.changeStatus
        const completedItems=this.props.completedItems
        return(
            <div className="todoOpject">
                <input type="checkbox" className="itemCheckbox" 
                       defaultChecked={todos.done? "checked":""} 
                       onClick={()=>{changeStatus(todos.id)}} 
                       onChange={()=>{completedItems()}}>
                </input>
                <li className={todos.done? "itemDescription":"notDone"}>{todos.description}</li>
            </div>

        )
    }


                                                                             
}

 class TodoItem extends Component{
    render(){
        const todoItem=this.props.myList.map((todos,index)=>{
        return(
            <TodoOpject 
                myList={this.props.myList}
                key={index}
                todos={todos}
                changeStatus={this.props.changeStatus}
                completedItems={this.props.completedItems}
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