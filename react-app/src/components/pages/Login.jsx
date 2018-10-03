import React, {Component} from 'react'
import {sendPOST} from '../helpers/methods'
import {Redirect} from 'react-router-dom'
const hostname = 'http://localhost:3000'

export default class Login extends Component {
  constructor (...props) {
    super (...props)

    this.state = {
      logingMessage: false
    }
    this.handleOnSubmit = this.handleOnSubmit.bind(this)
  }

  handleOnSubmit (e) {
    let formData = ''
    let formElements = document.querySelectorAll('[required]')
    e.preventDefault()
    formElements.forEach(input => {
      formData += `${input.id}=${input.value}&`
    })
    sendPOST(`${hostname}/login`, formData)
      .then(data => {
        localStorage.setItem('Authorization', data.token)
        document.location = '/'
      })
      .catch(err => {
        document.querySelector('#form-login').reset()
        this.setState({
          logingMessage: true
        })
      })
  }

  render () {
    return (
      <div>
        <form onSubmit={this.handleOnSubmit } id="form-login" >
          <input required id="email" type="email" placeholder="Email" />
          <input required id="password" type="password" placeholder="password"/>
          <input type="submit" value='Login' />
        </form>
        {            
          this.state.loginMessage && <div > Error: {this.state.loginMessage} </div>
        }
      </div>
    )
  }
}