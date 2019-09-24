import React, { Component } from 'react';
import Article from '../utils/Article';
import Promo from '../utils/Promo';
import {  mdiGrain } from '@mdi/js'

class Minerals extends Component {
  state = {
    text: [
      'Minerals',
      `There is a constant and complex dance of minerals happening in the body to maintain
      balance and homeostasis. Minerals are the spark plug of life and necessary for the body to perform.`,
      'Consultations may be done in person, online via Zoom, or by telephone. We will review your data to understand your current mineral status. From this we will discuss the specific steps of the Root Cause Protocol and how to proceed. You will be given a recording of our session together for future reference.'
    ]
  }
  render(){

    const { text } = this.state
    return(
      <div>
        <Promo header1={text[0]} header2={text[1]} header3={text[2]} icon={mdiGrain} color='warning'/>

      </div>
    );
  }
}

export default Minerals;
