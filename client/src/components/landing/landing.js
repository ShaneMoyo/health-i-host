import React, { Component } from 'react';


export default class Landing extends Component {

  render(){
    return(
      <body>
        <section class="animated fadeIn hero is-info is-fullheight">
          <div class="hero-body">
            <div class="container has-text-centered">
              <div class="column is-6 is-offset-3">
                <br/>
                <br/>
                <br/>
                <h1 class="animated fadeIn title">
                    Healthihost
                </h1>
                <h2 class="animated fadeIn subtitle">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis <strong>nostrud</strong> ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </h2>
              </div>
            </div>
          </div>
        </section>
      </body>
    );
  }
}
