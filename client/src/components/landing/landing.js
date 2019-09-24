import React, { Component } from 'react';
import Icon from '@mdi/react'
import {  mdiHumanHandsup, mdiRun, mdiGrain } from '@mdi/js'
import Fade from 'react-reveal/Fade';
import { NavLink } from 'react-router-dom';



const NavBarLink = props => <NavLink {...props} className="nav-link tile is-parent" activeClassName="active"/>;


export default class Landing extends Component {

  render(){
    return(
      <body>
        <section class="animated fadeIn hero is-info is-fullheight">
          <div class="hero-body">
            <div class="container has-text-centered">
              <div class="column is-6 is-offset-3">
              <div class="tile is-parent">
                <article class="tile is-child notification is-success landing">
                  <div class="content">
                    <p class="title">Healthihost</p>
                    <p class="subtitle">Enabling the Vitality of the body Naturally</p>

                  </div>
                </article>
              </div>


              <br/>
              <br/>
                <br/>
                <br/>
              </div>
            </div>
          </div>
        </section>
        <div class="box is-white">
        <br/>
        <br/>
        <br/>
        <Fade>
        <div class="container has-text-centered">
          <div class="subtitle has-text-centered">
            A healthy body allows us to live an optimal life with energy and enthusiasm.
            Do you want to be in balance, free from pain, able to be active, and doing your heart’s desires?
          </div>
          <br/>
          <div class="subtitle has-text-centered">
            Let’s Talk!
          </div>
        </div>
        </Fade>
        <br/>
        <br/>
        <br/>
        <Fade >
        <div class="tile is-ancestor">
          <div class="tile is-vertical">
            <div class="tile">

              <NavBarLink exact to="/massage">
                <article class="tile is-child notification is-primary">
                  <span class="icon is-large is-pulled-left" >
                    <Icon path={mdiHumanHandsup}
                    size={2}
                    color="white"
                    />
                  </span>
                  <p class="title">Massage Therapy</p>
                  <br/>
                  <p class="subtitle">Learn More</p>
                </article>
                </NavBarLink>



              <NavBarLink exact to="/minerals">

                <article class="tile is-child notification is-warning has-text-white">
                <span class="icon is-large is-pulled-left" >
                  <Icon path={mdiGrain}
                  size={2}
                  color="white"
                  />
                </span>
                  <p class="title">Mineral Therapy</p>
                  <br/>
                  <p class="subtitle">Learn More</p>
                </article>

              </NavBarLink>

              <NavBarLink exact to="/movement">

              <article class="tile is-child notification is-success">
              <span class="icon is-large is-pulled-left" >
                <Icon path={mdiRun}
                size={2}
                color="white"
                />
              </span>
                <p class="title">Movement Therapy</p>
                <br/>
                <p class="subtitle">Learn More</p>
              </article>

              </NavBarLink>


            </div>

          </div>

        </div>
        </Fade>
        </div>
      </body>
    );
  }
}
