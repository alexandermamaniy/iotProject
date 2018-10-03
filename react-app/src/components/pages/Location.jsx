import './css/default.css'
import './css/font-awesome.css'
import './css/main.css'
import React, {Component} from 'react'

export default class Location extends Component {
  constructor (...props) {
    super(...props)
  }

  render () {
    return (
      <div className="col-md-3 col-sm-6 col-xs-12 portfolio-item">
          <figure className="wow zoomIn" data-wow-delay="1000ms" data-wow-duration="1000ms">

          <img src="./images/portfolio5.jpg" alt="portfolio-5"/>

          <figcaption className="text-center">
              <a className="portfolio-icon" href="#"><i className="fa fa-plus"></i></a>
              <a className="portfolio-icon" href="#"><i className="fa fa-glass"></i></a>
              <a className="portfolio-icon" href="#"><i className="fa fa-twitter"></i></a>
          </figcaption>

          </figure>
      </div>
    )
  }
}
