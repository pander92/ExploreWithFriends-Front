import React, { Component } from 'react';
import {
  withGoogleMap,
  GoogleMap
} from 'react-google-maps';
import InfoWindowMap from './InfoWindowMap';
import { connect } from 'react-redux';


class Map extends Component {
  constructor() {
    super();
    this.state = {
      map: null
    };
  }

  zoomChanged() {
    // console.log('zoomChanged: '+this.state.map.getZoom())
  }

  mapLoaded(map) {
    if (this.state.map != null) return;
  }

  componentDidMount() {
    // console.log(this.props)
  }

  render() {

    // const markers = this.props.markers || [];

    let markersMap;

    markersMap = this.props.map.allLocations.map((item, index) => {
      let lat = item.position.lat;
      let lng = item.position.lng;
      let name = item.position.name;
      let title = item.position.challenge
      let title2 = item.position.team
      let pic = item.position.picture
      let iconColor;
      if (item.position.hasOwnProperty('challenge')) {
        iconColor = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
      } else {
        iconColor = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
      }
      let teamId = item.position.teamId;
      return <InfoWindowMap key={index} lat={lat} lng={lng} info={name} title={title} title2={title2} pic={pic} icon={iconColor} teamId={teamId} />;
    })

    return (
      <GoogleMap
        ref={this.mapLoaded.bind(this)}
        defaultZoom={this.props.zoom}
        defaultCenter={this.props.center}
        center={this.props.center}
      >
        {markersMap}
      </GoogleMap>
    );
  }
}

const stateToProps = state => {
  return {

    map: state.map
  };
};

export default connect(
  stateToProps,
  null)(withGoogleMap(Map));
