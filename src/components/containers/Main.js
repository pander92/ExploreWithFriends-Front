import React, { Component } from 'react';
import Input from './MapComponents/Input';
import Search from './MapComponents/Search';
import { getUserCurrentLocation } from '../../actions/locationAction';
import { connect } from 'react-redux';

class Main extends Component {
  componentWillMount() {
    this.props.getUserCurrentLocation();
    //pass in user as an argument in ^^ to be able to update that users info
  }

  render() {
    return (
      <section id="main">
        <div className="container">
          <div id="content">
            <article className="box post">
              <span className="image featured">
                <img src="/images/hero.jpg" alt="" />
              </span>
              <Search />
              {/* <p>
                Phasellus laoreet massa id justo mattis pharetra. Fusce suscipit
                ligula vel quam viverra sit amet mollis tortor congue. Sed quis
                mauris sit amet magna accumsan tristique. Curabitur leo nibh,
                rutrum eu malesuada in, tristique at erat lorem ipsum dolor sit
                amet lorem ipsum sed consequat magna tempus veroeros lorem sed
                tempus aliquam lorem ipsum veroeros consequat magna tempus lorem
                ipsum consequat Phasellus laoreet massa id justo mattis
                pharetra. Fusce suscipit ligula vel quam viverra sit amet mollis
                tortor congue. Sed quis mauris sit amet magna accumsan
                tristique. Curabitur leo nibh, rutrum eu malesuada in tristique
              </p>
              <p>
                Erat lorem ipsum veroeros consequat magna tempus lorem ipsum
                consequat Phasellus laoreet massa id justo mattis pharetra.
                Fusce suscipit ligula vel quam viverra sit amet mollis tortor
                congue. Sed quis mauris sit amet magna accumsan tristique.
                Curabitur leo nibh, rutrum eu malesuada in, tristique Curabitur
                leo nibh, rutrum eu malesuada in, tristique at erat lorem ipsum
                dolor sit amet lorem ipsum sed consequat magna tempus veroeros
                lorem sed tempus aliquam lorem ipsum veroeros consequat magna
                tempus
              </p>
              <p>
                Phasellus laoreet massa id justo mattis pharetra. Fusce suscipit
                ligula vel quam viverra sit amet mollis tortor congue. Sed quis
                mauris sit amet magna accumsan tristique. Curabitur leo nibh,
                rutrum eu malesuada in, tristique at erat lorem ipsum dolor sit
                amet lorem ipsum sed consequat consequat magna tempus lorem
                ipsum consequat Phasellus laoreet massa id in, tristique at erat
                lorem ipsum dolor sit amet lorem ipsum sed consequat magna
                tempus veroeros lorem sed tempus aliquam lorem ipsum veroeros
                consequat magna tempus lorem ipsum consequat Phasellus laoreet
                massa id justo mattis pharetra. Fusce suscipit ligula vel quam
                viverra sit amet mollis tortor congue. Sed quis mauris sit amet
                magna accumsan tristique. Curabitur leo nibh, rutrum eu
                malesuada in tristique
              </p>
              <h3>Accumsan lorem ipsum veroeros</h3>
              <p>
                Consequat Phasellus laoreet massa id in, tristique at erat lorem
                ipsum dolor sit amet lorem ipsum sed consequat magna tempus
                veroeros consequat magna tempus lorem ipsum consequat Phasellus
                laoreet massa id justo mattis pharetra. Fusce suscipit ligula
                vel quam viverra sit amet mollis tortor congue. Sed quis mauris
                sit amet magna.
              </p>
              <p>
                Phasellus laoreet massa id justo mattis pharetra. Fusce suscipit
                ligula vel quam viverra sit amet mollis tortor congue. Sed quis
                mauris sit amet magna accumsan tristique. Curabitur leo nibh,
                rutrum eu malesuada in, tristique at erat lorem ipsum dolor sit
                amet lorem ipsum sed consequat consequat magna tempus lorem
                ipsum consequat Phasellus laoreet massa id in, tristique at erat
                lorem ipsum dolor sit amet lorem ipsum sed consequat magna
                tempus veroeros lorem sed tempus aliquam lorem ipsum veroeros
                consequat magna tempus lorem ipsum consequat Phasellus laoreet
                massa id justo mattis pharetra. Fusce suscipit ligula vel quam
                viverra sit amet mollis tortor congue. Sed quis mauris sit amet
                magna accumsan tristique. Curabitur leo nibh, rutrum eu
                malesuada in tristique
              </p>
              <h3>Ligula suspcipit fusce veroeros</h3>
              <p>
                Nullam dolore etiam sed massa id in, tristique at erat lorem
                ipsum dolor sit amet lorem ipsum sed consequat magna tempus
                veroeros consequat magna tempus lorem ipsum consequat Phasellus
                laoreet massa id justo mattis pharetra. Fusce suscipit ligula
                vel quam viverra sit amet mollis tortor congue. Sed quis mauris
                sit amet magna.
              </p>
              <p>
                Sed massa id justo mattis pharetra. Fusce suscipit ligula vel
                quam viverra sit amet mollis tortor congue. Sed quis mauris sit
                amet magna accumsan tristique. Curabitur leo nibh, rutrum eu
                malesuada in, tristique at erat lorem ipsum dolor sit amet lorem
                ipsum sed consequat consequat magna tempus lorem ipsum consequat
                Phasellus laoreet massa id in, tristique at erat lorem ipsum
                dolor sit amet lorem ipsum sed consequat magna tempus veroeros
                lorem sed tempus aliquam lorem ipsum veroeros consequat magna
                tempus lorem ipsum consequat Phasellus laoreet massa id justo
                mattis pharetra. Fusce suscipit ligula vel quam viverra sit amet
                mollis tortor congue. Sed quis mauris sit amet magna accumsan.
              </p> */}
            </article>
          </div>
        </div>
      </section>
    );
  }
}

// export default Main;

export default connect(
  null,
  { getUserCurrentLocation }
)(Main);
