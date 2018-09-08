import React from 'react';
import Sequencer from '../components/sequencer';

class HomeContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(16).fill(null)
        };
    }

    handleClick(i) {
        console.log("Square " + i + " pressed.");
    }

    render() {
        return (
            <Sequencer             
                squares={this.state.squares}
                onClick={i => this.handleClick(i)}
            />
        );
    }
}

export default HomeContainer;