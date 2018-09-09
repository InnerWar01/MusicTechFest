import React from 'react';
import Sequencer from '../components/sequencer';
import Geolocation from '../components/geolocation';
import AudioPlayer from 'react-cl-audio-player';
import {Row, Col} from 'react-flexbox-grid';
import Test from '../components/test';
import { modelInstance } from '../model/model';

class HomeContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(16).fill(null),
            squaresClicked: Array(16).fill(false),
            sounds: modelInstance.getSounds(),
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
            <div className="home-container">
                <Row>
                    <Col xs={12} sm={2} md={2}>
                        <Geolocation/>
                    </Col>
                    <Col xs={12} sm={6} md={6}>
                        <AudioPlayer songs={this.state.sounds} autoplay className="audio-player"/>
                    </Col>
                    <Col xs={12} sm={4} md={4}>
                        <Sequencer             
                            squares={this.state.squares}
                            squaresClicked={this.state.squaresClicked}
                            onClick={i => this.handleClick(i)}
                        />
                    </Col>
                </Row>
                <div>
                    <Test/>
                </div>
            </div>
        );
    }
}

export default HomeContainer;