import React from 'react';
import {geolocated} from 'react-geolocated';
import { modelInstance } from '../model/model';

class Geolocation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          coordinates: this.props.coords,
          body: null,
          user_id: null,
          sound_id: null,
          status: 'INITIAL'
        }
    }

    getData = () => {
        modelInstance.fetch_geolocation(this.props.coords)
        .then(response => {
          this.setState({ 
              user_id: response[0].user_id,
              sound_id: response[0].sound_id, 
            });
        });
    }

    render() {
      return !this.props.isGeolocationAvailable
        ? <div>Your browser does not support Geolocation</div>
        : !this.props.isGeolocationEnabled
          ? <div>Geolocation is not enabled</div>
          : this.props.coords
            ? <div>
                {this.getData()}
                <p>latitude: {this.props.coords.latitude}</p>
                <p>longitude: {this.props.coords.longitude}</p>
                <p>altitude: {this.props.coords.altitude}</p>
                <p>heading: {this.props.coords.heading}</p>
                <p>speed: {this.props.coords.speed}</p>
                <p>user_id: {this.state.user_id}</p>
                <p>sound_id: {this.state.sound_id}</p>
            </div>
            : <div>Getting the location data&hellip; </div>;
    }
  }

  export default geolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  })(Geolocation);
