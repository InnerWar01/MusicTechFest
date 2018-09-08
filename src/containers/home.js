import React from 'react';
import Sequencer from '../components/sequencer';

class HomeContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(16).fill(null),
            squaresClicked: Array(16).fill(false),
        };
    }

    handleClick(i) {
        const newSquaresClicked = this.state.squaresClicked.slice(); //copy the array

        newSquaresClicked[i] = (newSquaresClicked[i] === true) ? false : true;; //execute the manipulations

        this.setState({
            squaresClicked: newSquaresClicked,
        }); //set the new state
        
        console.log("Square " + i + " pressed.");
    }

    render() {
        return (
            <Sequencer             
                squares={this.state.squares}
                squaresClicked={this.state.squaresClicked}
                onClick={i => this.handleClick(i)}
            />
        );
    }
}

export default HomeContainer;