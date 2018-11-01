import React from 'react';
import './App.css';

class Movie extends React.Component {
    state = {
        isShowMoreActor: true,
        isShowMoreCrew: true,
    }
    toggleMoreActor = () => {
        this.setState({isShowMoreActor: !this.state.isShowMoreActor});
    }
    toggleMoreCrew = () => {
        this.setState({isShowMoreCrew: !this.state.isShowMoreCrew});
    }


    render() {
        const {poster, title, actors, crew} = this.props;
        return (
            <div className="movie">
                <div className="movie-poster">
                    <img src={poster} alt=""/>
                </div>
                <div className="movie-info">
                    <h2 className="title">{title}</h2>
                    <p className="actor"><span>Actors</span></p>
                    <ul className="actor-list">
                        {
                            (this.state.isShowMoreActor ? actors.slice(0, 5) : actors).map(actor => <li
                                key={actor.id}> {actor.character} By {actor.name}</li>)
                        }
                    </ul>
                    {actors.length > 5 ? <button onClick={this.toggleMoreActor}>click
                        to {this.state.isShowMoreActor ? 'show more actors' : 'collapse list'}</button> : ''}
                    <p className="producer">Crew</p>
                    <ul className="producer-list">
                        {
                            (this.state.isShowMoreCrew ? crew.slice(0, 5) : crew).map(c => <li key={crew.id}> {c.job} : {c.name}</li>)
                        }
                    </ul>
                    {crew.length > 5 ? <button onClick={this.toggleMoreCrew}>click
                        to {this.state.isShowMoreCrew ? 'show more crew' : 'collapse list'}</button> : ''}

                </div>
            </div>
        );
    }
}


export default Movie;
