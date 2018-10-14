import React, { Component } from 'react';
import ExtaInfo from './ExtaInfo'

class Repo extends Component {
    constructor(props){
        super(props)
        this.state={
            showExta:false
        }
    }
    showExtraInfo ()
    { 
        this.setState({
            showExta:!this.state.showExta
        })
    }

    render () {
        const repo = this.props.repo
        const forked=repo.fork? 'forked': '';
        const classes=`${forked} repoName`
        
        const reposList=(
            <div className='singelRepo'>
                <li onClick= {this.showExtraInfo.bind(this)} 
                    className={classes} >
                    {repo.name}
                </li> 
            </div>
        )
        const extraInfo=(
            <div>
            {reposList}
            <ExtaInfo repo={this.props.repo} deleteRepo={this.props.deleteRepo}/>
            </div>
        )
        return (   
                this.state.showExta ? extraInfo : reposList
        )
    }
}   

class MyRepo extends Component {
    render() {
        const repoElements = this.props.myReposProps.map((repo,index) => {
            return (
                <Repo   
                    key={repo.id} 
                    deleteRepo={this.props.deleteRepo} 
                    repo={repo}
                />
            )
        })

        return (
            <ul>
                {repoElements}
            </ul>
        )
    }
}

export default MyRepo;