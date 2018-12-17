import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <section id="footer">
        <div className="container">
          <header>
            <h2>
              Questions or comments? <strong>Get in touch:</strong>
            </h2>
          </header>
          <div className="row">
            <div className="col-6 col-12-medium">
              <section>
                <form method="post" action="#">
                  <div className="row gtr-50">
                    <div className="col-6 col-12-small">
                      <input name="name" placeholder="Name" type="text" />
                    </div>
                    <div className="col-6 col-12-small">
                      <input name="email" placeholder="Email" type="text" />
                    </div>
                    <div className="col-12">
                      <textarea
                        name="message"
                        placeholder="Message"
                        defaultValue={'Tell us how you really feel!'
                        }
                      />
                    </div>
                  </div>
                </form>
              </section>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Footer;
