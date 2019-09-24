import React, { Component } from 'react';
import Article from '../utils/Article';
import Promo from '../utils/Promo';

class Minerals extends Component {

  state = {
    text: [
      'Non arcu risus quis varius quam quisque. Dictum varius duis at consectetur lorem. Posuere sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper.',
      'Metus aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices. In hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit. Accumsan lacus vel facilisis volutpat. Non sodales neque sodales ut etiam. Est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus.',
      'Molestie ac feugiat sed lectus vestibulum. Feugiat sed lectus vestibulum mattis. Volutpat diam ut venenatis tellus in metus vulputate. Feugiat in fermentum posuere urna nec. Pharetra convallis posuere morbi leo urna molestie at. Accumsan lacus vel facilisis volutpat est velit egestas. Fermentum leo vel orci porta. Faucibus interdum posuere lorem ipsum.',
      'Feugiat sed lectus vestibulum mattis.',
      'Massage',
      'Minerals are substances found in food that your body needs for growth and health',

    ]
  }

  render(){

    const { text } = this.state

    return(
      <div>
      <Promo header1={text[4]} header2={text[5]}/>
      <Article paragraph1={text[0]} paragraph2={text[1]} paragraph3={text[2]} header={text[3]}/>
      <Promo header1={text[4]} header2={text[5]}/>
      <Article paragraph1={text[0]} paragraph2={text[1]} paragraph3={text[2]} header={text[3]}/>
      </div>
    );
  }
}

export default Minerals;
