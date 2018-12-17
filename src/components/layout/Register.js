import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerUser } from '../../actions';
import { Header, Main, Footer } from '../containers';

import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    password2: '',
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/users/login');
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.errors !== this.props.errors) {
      this.updateErrorState(this.props.errors);
    }
  }

  updateErrorState = errors => {
    this.setState({ errors: errors });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;
    console.log(this.props);
    return (
      <React.Fragment>
        <Header />

        <div className="signup__container">
          <div className="container__child signup__thumbnail">
            <div className="thumbnail__logo" />
            <div className="thumbnail__content text-center" />
            <div className="signup__overlay" />
          </div>
          <div className="container__child signup__form">
            <form onSubmit={this.onSubmit}>
              <h1>Sign Up</h1>
              <br />
              <br />

              <TextFieldGroup
                id="username"
                placeholder="Username"
                label="Username"
                name="username"
                // type="text"
                value={this.state.username}
                onChange={this.onChange}
                error={errors.username}
              />
              <TextFieldGroup
                id="email"
                placeholder="Email"
                label="Email"
                name="email"
                type="email"
                value={this.state.email}
                onChange={this.onChange}
                error={errors.email}
              />
              <TextFieldGroup
                id="password"
                placeholder="********"
                label="Password"
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.onChange}
                error={errors.password}
              />
              <TextFieldGroup
                id="passwordRepeat"
                placeholder="********"
                label="Repeat Password"
                name="password2"
                type="password"
                value={this.state.password2}
                onChange={this.onChange}
                error={errors.password2}
              />
              <br />
              <button type="submit" className="btn btn--form">
                Register
              </button>
              <br />
            </form>
            <br />
          </div>
        </div>

        <Footer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
