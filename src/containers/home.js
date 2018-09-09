import React from 'react';
import Sequencer from '../components/sequencer';
// import Geolocation from '../components/geolocation';
import AudioPlayer from 'react-cl-audio-player';
import {Row, Col} from 'react-flexbox-grid';
import Dropdown from '../components/dropdown';
import { modelInstance } from '../model/model';

class HomeContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squaresClicked: Array(16).fill(false),
            sounds: modelInstance.getSounds(),
            activeSound: "clave",
            soundId: "1",
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

    handleSoundChange = function(evt) {
        var targetId = null;

        if (evt.target.value === "clave") {
            targetId = 1;
        } else if (evt.target.value === "hhcl") {
            targetId = 2;
        } else if (evt.target.value === "kick") {
            targetId = 3;
        } else if (evt.target.value === "perc") {
            targetId = 4;
        } else if (evt.target.value === "snare") {
            targetId = 5;
        }

        this.setState({
            activeSound: evt.target.value,
            soundId: targetId
        });
    }

    render() {
        return (
            <div className="home-container">
                <Row>
                    {/* <Col xs={12} sm={12} md={2}>
                        <Geolocation/>
                    </Col> */}
                    <Col xs={12} sm={12} md={4}>
                        <Row>
                            <Col xs={6} sm={6} md={6}><h4>Choose the sound: </h4></Col>
                            <Col xs={6} sm={6} md={6}><Dropdown activeSound={this.state.activeSound} handleSoundChange={this.handleSoundChange.bind(this)}/></Col>
                        </Row>
                        <AudioPlayer songs={this.state.sounds} autoplay id="audio-player"/>
                    </Col>
                    <Col xs={12} sm={12} md={8}>
                        <Sequencer             
                            squaresClicked={this.state.squaresClicked}
                            onClick={i => this.handleClick(i)}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default HomeContainer;