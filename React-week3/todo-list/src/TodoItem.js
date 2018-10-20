import React, { Component } from 'react';


class TodoOpject extends Component{
    constructor(props){
        super(props)
        this.state={
            editing:false,
            editiedTItem:this.props.todos.description
        }
    }
    ChangeEditingStatus(){
        this.setState({
            editing:!this.state.editing
        })
    }
    editingChange(event){
        const newtext=event.target.value
        this.setState({
            editiedTItem:newtext
        })
    }
    editingDone(event){
        if(event.keyCode===13)
        this.setState({
            editing:false
        })
    }
    cancelEditing(){
        this.setState({
            editing:!this.state.editing,
            editiedTItem:this.props.todos.description
        })

    }
    
    render(){

        const todos=this.props.todos
        const changeStatus=this.props.changeStatus
        const deleteItem=this.props.deleteItem

        const viewMode=(        
            <div className="todoOpject">
                <input type="checkbox" 
                       className="itemCheckbox" 
                       checked={todos.done? "checked":""} 
                       onChange={()=>{changeStatus(todos.id)}} >
                </input>
                <li onDoubleClick={this.ChangeEditingStatus.bind(this)} 
                    className={todos.done? "itemDescription":"notDone"}>{this.state.editiedTItem}
                </li>
                <p className="dateSpan">{todos.deadline}</p>
                <button type="button" className="editButton"
                        onClick={()=>{this.ChangeEditingStatus(todos.id)}}>Edit
                </button> 
                <button type="button" className="deleteButton"
                        onClick={()=>{deleteItem(todos.id)}}>Delete
                </button> 
            </div>
        )
        const editingMode=(
            <div>
               <input type="text" value={this.state.editiedTItem} className="editingInput"
               onKeyDown={this.editingDone.bind(this)}
               onChange={this.editingChange.bind(this)}></input>
               <button type="button" className="CancelEditButton"
                        onClick={()=>{this.cancelEditing()}}>Cancel
                </button> 
                <button type="button" className="CancelEditButton"
                        onClick={()=>{this.ChangeEditingStatus()}}>Done
                </button> 
            </div>

        )
                
        return (this.state.editing ? editingMode : viewMode)

    }
                                                                         
}

 class TodoItem extends Component{
    render(){
        const todoItem=this.props.myFilteredItems.map((todos)=>{
        return(
            <TodoOpject 
                key={todos.id}
                todos={todos}
                changeStatus={this.props.changeStatus}
                deleteItem={this.props.deleteItem}
            />   
        )
    })
    return(
        <div>

        <ul className="itemsListUl">
            {todoItem}
            
        </ul>

        </div>
    )
    }

 }
  export default TodoItem;