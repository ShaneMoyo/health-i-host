import React, { Component } from 'react';
import Article from '../utils/Article';
import Promo from '../utils/Promo';

class Massage extends Component {

  state = {
    text: [
      'Massage',
      'An intuitive art form rooted in scientific and experiential hands on healing to allow the body to move freely in its surroundings.',
    ]
  }

  render(){

    const { text } = this.state

    return(
      <div>
        <Promo header1={text[0]} header2={text[1]}/>
      </div>
    );
  }
}

export default Massage;
