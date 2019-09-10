import React, { Component } from 'react';
import Article from './Article'; 

class Tile extends Component {

  state = {
    text: [
      'Non arcu risus quis varius quam quisque. Dictum varius duis at consectetur lorem. Posuere sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper.',
      'Metus aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices. In hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit. Accumsan lacus vel facilisis volutpat. Non sodales neque sodales ut etiam. Est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus.',
      'Molestie ac feugiat sed lectus vestibulum. Feugiat sed lectus vestibulum mattis. Volutpat diam ut venenatis tellus in metus vulputate. Feugiat in fermentum posuere urna nec. Pharetra convallis posuere morbi leo urna molestie at. Accumsan lacus vel facilisis volutpat est velit egestas. Fermentum leo vel orci porta. Faucibus interdum posuere lorem ipsum.',
      'Feugiat sed lectus vestibulum mattis.',
      'Massage Therapy',
      'A natural, effective way to relieve stress and reduce pain and inflammation.',

    ]
  }

  render(){
    const { text } = this.state;
    return(
      <div>
        <div class="tile is-ancestor">
          <div class="tile is-vertical is-12">
            <div class="tile">
              <div class="tile is-parent is-vertical">
                <article class="tile is-child notification is-warning">
                  <p class="title">Stuff.....</p>
                  <p class="subtitle">{ text[1]}</p>
                  <p class="subtitle">{ text[0]}</p>
                  <p class="subtitle">{ text[3]}</p>
                </article>
              </div>
            </div>
          </div> 
        </div>
      </div>
    );
  }
}

export default Tile;