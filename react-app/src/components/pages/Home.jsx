import React, {Component} from 'react'
import { PageHeader, Carousel } from 'react-bootstrap'


export default class Home extends Component {
  constructor (...props) {
    super (...props)
  }
  render () {
    return (
      <div>
        <Head/>
        <PageHeader>
          DOMOTICA <small>para vivienda</small>
        </PageHeader>

        <Carrusel/>
      </div>
    )
  }
}


const Head = () => (
  <head>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous"/>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossOrigin="anonymous"/>
  </head>
)

const Carrusel = () => (
  <Carousel>>
    <Carousel.Item>
      {/* <img width={900} height={500} alt="900x500" src={imagen1} /> */}
      <Carousel.Caption>
        <h3>Third slide label</h3>
        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
)