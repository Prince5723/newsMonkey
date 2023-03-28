import React, { Component } from 'react';
import { useEffect } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';

export class News extends Component {

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + (string).slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    }
    document.title = this.capitalizeFirstLetter(this.props.category) + " - NewsMonkey";
  }

  updateData = async (e) => {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f24c1951d22d4e95aa97fc8baaba3719&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    this.setState({ loading: true })
    let response = await fetch(url);
    this.props.setProgress(30)
    let data = await response.json();
    this.props.setProgress(60)
    this.setState({ articles: data.articles, totalResults: data.totalResults, loading: false });
    this.props.setProgress(100);
    console.log(this.state.page + " i am at the end of updateData")
  }

  handleNextBtn = async (e) => {
    this.setState({ page: this.state.page + 1 }, this.updateData) //setState is async, so we are using callback.

  }

  handlePreviousBtn = async (e) => {
    this.setState({ page: this.state.page - 1 }, this.updateData)

  }


  componentDidMount() {
    this.updateData()
  }
  render() {

    let { country, category, pageSize } = this.props;

    return (

      <div className='container my-3'>
        <h1 className='text-center' style={{ margin: '25px' }}>{`NewsMonkey: Top ${this.capitalizeFirstLetter(this.props.category)} Headlines`}</h1>
        {this.state.loading && <Spinner />}


        {!this.state.loading && <div className="row">
          {this.state.articles.map((element) => {
            return <div className=" my-3 col-md-4" key={element.url}>
              <NewsItem url={element.url} title={element.title} desc={element.description} urlToImage={element.urlToImage} author={element.author} publishedAt={element.publishedAt} source={element.source.name} />
            </div>
          })}
        </div>}

        <hr />
        <div className=' container d-flex justify-content-evenly'>
          <button disabled={this.state.page <= 1} type="button" onClick={this.handlePreviousBtn} className="btn btn-dark ">&larr; Previous</button>
          <button disabled={Math.ceil(this.state.totalResults / this.props.pageSize) <= this.state.page} type="button" onClick={this.handleNextBtn} className="btn btn-dark">Next &rarr;</button>
        </div>


      </div >
    )
  }
}

export default News
