import React, { Component } from 'react';

class Article extends Component {

  render(){

    const { paragraph1, paragraph2, paragraph3, header  } = this.props;

    return(
      <div class="animated fadeIn is-success card article">
        <div class="card-content">
          <div class="content article-body">
            <p>{paragraph1}</p>
            <p>{paragraph2}</p>
            <h3 class="has-text-centered">{header}</h3>
            <p>{paragraph3}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Article;