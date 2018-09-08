import React from 'react';
import {geolocated} from 'react-geolocated';

class Geolocation extends React.Component {
    render() {
      return !this.props.isGeolocationAvailable
        ? <div>Your browser does not support Geolocation</div>
        : !this.props.isGeolocationEnabled
          ? <div>Geolocation is not enabled</div>
          : this.props.coords
            ? <div>
                <p>latitude: {this.props.coords.latitude}</p>
                <p>longitude: {this.props.coords.longitude}</p>
                <p>altitude: {this.props.coords.altitude}</p>
                <p>heading: {this.props.coords.heading}</p>
                <p>speed: {this.props.coords.speed}</p>
            </div>
            : <div>Getting the location data&hellip; </div>;
    }
  }
   
  export default geolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  })(Geolocation);