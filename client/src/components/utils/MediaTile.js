import React, { Component } from 'react';

class MediaTile extends Component {

  render(){
    const { paragraph1, paragraph2, header, imgsrc  } = this.props;
    const tileStyle = { 
      background: `linear-gradient(
        rgba(252, 220, 89, 0.8),
        rgba(0, 0, 0, 0.5)
      ), url(${imgsrc}) no-repeat center center`,
      backgroundSize: 'cover' 
    };

    return(
      <div class="animated fadeIn is-success card article" style={tileStyle}>
        <div class="card-content" style={tileStyle}>
          <div class="content article-body has-text-white">
            <h3 class="has-text-centered has-text-white">{header}</h3>
            <hr/>
            <p>{paragraph1}</p>
            <p>{paragraph2}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default MediaTile;