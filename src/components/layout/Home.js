import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Footer } from '../containers';

class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/users/login');
    }
  }

  render() {
    return (
      <div id="page-wrapper">
        <React.Fragment>
          <Header />
          <Footer />
        </React.Fragment>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Home);
