import React, { Component } from "react";
import Joke from "./Joke";
import emoji from "./emoji.png";
import "./ListOfJokes.css";
import axios from "axios";

class ListOfJokes extends Component {
    static defaultProps = {
        numJokesGet: 10
    };
    constructor(props) {
        super(props);
        this.state = {
            JokeList: JSON.parse(window.localStorage.getItem("jokes") || "[]"),
            loading: false,
        } 
        this.seenJokes = new Set (this.state.JokeList.map(j => j.jokes))
        this.handleVote = this.handleVote.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    async componentDidMount() {
        // If there is no jokes stored in Local Storage
        if (this.state.JokeList.length === 0) {
            this.getJokes();
        }
    }

    async getJokes() {
        try {
                let jokes = [];
                while (jokes.length < this.props.numJokesGet){
                    // Load the data for one joke
                    let res = await axios.get("https://icanhazdadjoke.com/",
                    {
                        headers: {Accept: "application/json"}
                    })
                    let newJoke = res.data.joke;
                    if (!this.seenJokes.has(newJoke)){
                        jokes.push({id: res.data.id, joke: res.data.joke, score: 0});
                    } else {
                        console.log("FOUND A DUPLICATE");
                        console.log(newJoke);
                    }
                }
                    // Make sure no jokes are duplicated:

                this.setState(st =>({
                    JokeList: [...st.JokeList, ...jokes],
                    loading: false
                }),
                    () => window.localStorage.setItem("jokes", JSON.stringify(this.state.JokeList))
                );
        } catch(e) {
            alert(e);
            this.setState({loading: false});
        }
    }

    handleVote(id, delta) {
        this.setState( st =>({
            JokeList: this.state.JokeList.map(joke =>
                joke.id === id ? {...joke, score: joke.score + delta} : joke)}
                ),
                // Store the updated object in LocalStorage
                () => window.localStorage.setItem(
                    "jokes",
                    JSON.stringify(this.state.JokeList)))
    }

    handleClick() {
        this.setState({loading: true}, this.getJokes)
    }

    render() {
        let sortedJokes = this.state.JokeList.sort((a,b) => b.score - a.score)
        console.log(sortedJokes)
        const jokeDisplay = sortedJokes.map(joke => 
        <Joke 
        key={joke.id} 
        id={joke.id} 
        text={joke.joke}
        score={joke.score}
        handleVote = {this.handleVote}
        />)

        return(
            <div className="ListOfJokes">
                <div className="ListOfJokes-sidebar">
                    <h1><span>Dad </span>Jokes</h1>
                    <img src={emoji} alt="Laughing emoji" />
                    <button onClick={this.handleClick}>New Jokes</button>
                </div>
                <div className="ListOfJokes-jokes">
                    {this.state.loading ? 
                    <div className="JokeList-spinner">
                        <i className="far fa-8x fa-laugh fa-spin" />
                        <h1 className="ListOfJokes">Loading...</h1>
                    </div>    
                    : jokeDisplay }
                </div> 
            </div>
        )
    }
}

export default ListOfJokes;