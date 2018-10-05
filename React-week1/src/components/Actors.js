import React,{Component} from 'react';

export default class Actors extends Component {
    
    render(){
        return(
            <div className="actorsDiv">
                <span className="actorsSpan">{this.props.movie.director} |</span>
                <span className="actorsSpan">{this.props.movie.actors.join(" , ")}</span>
            </div>
        )
    }
}