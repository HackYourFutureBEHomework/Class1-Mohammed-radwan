import React,{Component} from 'react'

class ExtraInfo extends Component{
    render(){
        const repo=this.props.repo
        return(
            <div className="extraInfo">
                <li className="extaItems"><span className="extraInfoSpan">Full Name :</span><span className="extraspan2">{repo.full_name}</span></li>
                <li className="extaItems"><span className="extraInfoSpan">Forks :</span><span className="extraspan2">{repo.forks}</span></li>
                <li className="extaItems"><p className="extraInfoSpan">Discription :</p><span className="extraspan2">{repo.description}</span></li>
                <li className="extaItems"><span className="extraInfoSpan">html_url :</span><span className="extraspan2"><a href={repo.html_url}>{repo.name}</a></span></li>

                <button className= 'buttonClass' onClick={() => {this.props.deleteRepo(repo.id)}}>Delete</button> 

            </div>
        )
    }

}
export default ExtraInfo