import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let { url, title, desc, urlToImage, author, publishedAt, source } = this.props;
    return (
      <>
        <div className="card">
          <img src={!urlToImage ? `https://c.ndtvimg.com/2023-01/2c15k6tg_twitter_625x300_18_January_23.jpg` : urlToImage} className="card-img-top" alt="..." />
          <div className="card-body">
            <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:"90%", zIndex:'1'}}>
              {source}
            </span>

            <h5 className="card-title">{title}</h5>
            <p className="card-text">{desc}</p>
            <p className="card-text"><small className="text-muted">By {!author ? 'Unknown' : author} on {new Date(publishedAt).toLocaleString()}</small></p>
            <a href={url} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
          </div>
        </div>
      </>
    )
  }
}

export default NewsItem
