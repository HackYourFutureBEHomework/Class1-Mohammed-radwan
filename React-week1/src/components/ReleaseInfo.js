import React,{Component} from 'react';

export default class ReleaseInfo extends Component {

    render() {
        return(
        <div className="releaseInfo">
            <span className="extraInfo">{this.props.movie.released} | </span>
            <span className="extraInfo">{this.props.movie.duration} min. | </span>
            <span className="extraInfo">{this.props.movie.genres.join(" , ")}</span>
        </div>
        )   
    }
}

