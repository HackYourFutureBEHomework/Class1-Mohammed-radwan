import React,{Component} from 'react'


class CompletedList extends Component{
    render(){
        return(
            <div className="hideButton">
                <button type="text" className="hideCompleted" onClick={()=>{this.props.hideCompleted()}}>
                Hide Completed
                </button>
            </div>
        )
    }
}
 export default CompletedList