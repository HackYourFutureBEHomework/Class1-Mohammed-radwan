import React,{ Component } from 'react';
import movies from '../data/movieList';
import ReleaseInfo from './ReleaseInfo'
import Actors from './Actors'
import Description from './Description'
import Header from './Header'
import '../style/App.css' 

const MovieItem=(props)=>{
    return(
        
            <nav className="mainNav">
                <img className="Avatar"
                src={props.item.imgSrc}
                alt={props.item.name}
                />
                <div>
                    <h1 className="movieName">{props.item.name}</h1>
                    <ReleaseInfo movie={props.item}/>
                    <Actors movie={props.item} />
                    <Description movie={props.item}/>
                </div>
                
            </nav>
        
    )
}

 class Main extends Component {
    render(){
        const movie =movies.map((item,index)=>{
            return(
                <MovieItem key={index} item={item}/>
            )
        })
        return(
            <div>
                <Header/>
                <div className="layoutDiv">
                    {movie}
                </div>
            </div>
        )  
        
    }
}

export default Main;