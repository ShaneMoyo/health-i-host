import React from 'react';
import {  mdiHumanHandsup, mdiRun, mdiGrain} from '@mdi/js'
import Fade from 'react-reveal/Fade';
import { NavLink } from 'react-router-dom';
import ServiceTile from './ServiceTile';
import ScheduleAppointment from './ScheduleAppointment';
import LandingMain from './LandingMain'

const NavBarLink = props => <NavLink {...props} className="nav-link tile is-parent" activeClassName="active"/>;

export default function Landing(){
  return(
    <body>
      <LandingMain/>
      <div class="box is-white">

        <br/><br/><br/>
        <br/><br/><br/>

        <Fade >
          <div class="tile is-ancestor">
            <div class="tile is-vertical">
              <div class="tile">
                <ServiceTile icon={mdiHumanHandsup} color="primary"/>
                <ServiceTile icon={mdiGrain} color="warning"/>
                <ServiceTile icon={mdiRun} color="success"/>
              </div>
            </div>
          </div>
        </Fade>

        <br/><br/>

        <Fade>
          <ScheduleAppointment/>
        </Fade>
      </div>
    </body>
  );  
}
