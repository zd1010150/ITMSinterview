import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Movie from './movie';
import {fetchDetail} from './service/movieService';

class App extends Component {
    state = {
        queryKeyWords: 'Titanic',
        propertyOfMovie: {
            title: '',
            poster: '',
            actors: [],
            crew: []
        },
        loading: false

    }

    async componentDidMount() {
        this.setState({loading: true});
        const result = await fetchDetail(this.state.queryKeyWords);
        this.setState({propertyOfMovie: result, loading: false});
    }

    render() {
        return (
            <div className="App">
                <div className="loading-mask" style={{display: this.state.loading ? 'block' : 'none'}}>
                    <div className="icon-wrapper">
                        <img className="loading-icon" src={logo} alt=""/><br/>
                        <h2>Struggle to load....</h2>
                    </div>

                </div>
                <Movie {...this.state.propertyOfMovie} />
            </div>
        );
    }
}

export default App;
