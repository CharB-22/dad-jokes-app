import React, { Component } from "react";
import "./Joke.css";

class Joke extends Component {
    constructor(props) {
        super(props);
        this.handleThumbsUp = this.handleThumbsUp.bind(this);
        this.handleThumbsDown = this.handleThumbsDown.bind(this); 
    }

    handleThumbsUp() {
        console.log(this.props.id)
        this.props.handleVote(this.props.id, 1);
    }

    handleThumbsDown() {
        
        this.props.handleVote(this.props.id, -1);
    }

    render() {
        let score = this.props.score;
        let color;
        let emoji;
        if (score > 15) {
            color = "#4CAF50";
            emoji = <i class="em em-rolling_on_the_floor_laughing" aria-role="presentation" aria-label="ROLLING ON THE FLOOR LAUGHING"></i>
        } else if (score >= 12) {
            color = "#8BC34A";
            emoji = <i class="em em-laughing" aria-role="presentation" aria-label="SMILING FACE WITH OPEN MOUTH AND TIGHTLY-CLOSED EYES"></i>;
        } else if (score >= 8) {
            color = "#FFEB3B";
            emoji = <i class="em em-grinning" aria-role="presentation" aria-label="GRINNING FACE"></i>;
        } else if (score >= 4) {
            color = "#FF9800";
            emoji = <i class="em em-neutral_face" aria-role="presentation" aria-label="NEUTRAL FACE"></i>;
        } else {
            color = "#F44336";
            emoji = <i class="em em-slightly_frowning_face" aria-role="presentation" aria-label="SLIGHTLY FROWNING FACE"></i>;
        }
 
        return(
            <div className="Joke">
                <div className="Joke-score">
                    <i className="far fa-thumbs-up fa-lg" onClick={this.handleThumbsUp}></i>
                    <div style={{border: `3px solid ${color}`}} className="Joke-score-num">{this.props.score}</div>
                    <i className="far fa-thumbs-down fa-lg" onClick={this.handleThumbsDown}></i>
                </div>
                <div className="Joke-text">
                    <div className="Joke-text-div">{this.props.text}</div>
                    {emoji}
                </div>
            </div>
        )
    }
}

export default Joke;