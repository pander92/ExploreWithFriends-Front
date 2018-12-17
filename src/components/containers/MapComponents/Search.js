import React, { Component } from 'react';
import { Map } from './views';

import { connect } from 'react-redux';
// import { getTeam } from '../../../actions/locationAction';
import { getTeam } from '../../../actions/locationAction';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      map: null,
      zoom: 14
    };
  }

  componentWillMount() {
    if(this.props.auth.user.teamData != null){
    const teamID = this.props.auth.user.teamData._id
    this.props.getTeam(teamID);
    }

  }


  render() {
    const lngCurrentLocation = this.props.map.currentLocation.lng;
    const latCurrentLocation = this.props.map.currentLocation.lat;
    return (
      <div>
        <div className="sidebar-wrapper">
          <Map
            markers={this.props.map.allLocations}
            zoom={this.state.zoom}
            center={{ lat: latCurrentLocation, lng: lngCurrentLocation }}
            //center={this.props.map.currentLocation}
            containerElement={<div style={{ height: 90 + '%' }} />}
            mapElement={<div style={{ height: 90 + 'vh' }} />}
          />
        </div>
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    map: state.map,
    auth: state.auth
  };
};

export default connect(
  stateToProps,
  { getTeam }
)(Search);
