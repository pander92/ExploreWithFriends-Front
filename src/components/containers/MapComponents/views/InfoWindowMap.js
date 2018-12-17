import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Marker, InfoWindow } from 'react-google-maps';
import { checkChallenge } from '../../../../actions/locationAction';


class InfoWindowMap extends Component {
  state = {
    isOpen: false,
    test: 'working!'
  };
  
  handleToggle = () => {
    this.setState({
      isOpen: true
    });
  };

  render() {
    return (
      <Marker
        key={this.props.index}
        title={this.props.title}
        position={{
          lat: this.props.lat,
          lng: this.props.lng
        }}
        icon={this.props.icon}
        onClick={this.handleToggle}
      >
        {this.state.isOpen && (
          <InfoWindow onCloseClick={() => this.setState({ isOpen: false })}>
            <div>
              <strong>{this.props.title}{this.props.title2}</strong>
              <hr />
              {this.props.info}
              <hr />
              <img src={`/images/${this.props.pic}`} height="100" width="100" alt='Image Not Loaded' />
              <br />
              <button onClick={checkChallenge.bind(this, this.props.index, this.props.lat, this.props.lng, this.props.title, this.props.auth.user.teamData._id)}>Check in</button>
            </div>
          </InfoWindow>
        )}
      </Marker>
    );
  }
}

const stateToProps = state => {
  return {
    isOpen: state.isOpen,
    test: state.test,
    map: state.map,
    auth: state.auth
  };
};

export default connect(
  stateToProps,
  null)(InfoWindowMap);
