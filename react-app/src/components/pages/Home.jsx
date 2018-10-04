import React, {Component} from 'react'
import {sendGET} from '../helpers/methods'
import './Home.css'

const hostname = 'http://localhost:3000'

export default class Home extends Component {
  constructor (...props) {
    super (...props)

    this.state = {
      user: null,
      home: null,
      err: true,
      loading: true
    }
  }
  render () {
    return (
      (this.state.loading)
      ?
        <h1>Cargando ...................</h1>
      :
      (this.state.err)
        ?
          <h1>Hubo algun error</h1>
        :
          (<div>
            <p>Logeado</p>
            {/* <Carrusel/> */}
          </div>)
    )
  }

  componentDidMount () {
    sendGET(`${hostname}/user`)
      .then((data) => this.setState({
        user: data.user,
        home: data.home,
        loading: false,
        err: false
      }))
      .catch((err) => this.setState({
        err: err.err
      }))
  }

}


// const Head = () => (
//   <head>
//     <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous"/>
//     <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossOrigin="anonymous"/>
//   </head>
// )

