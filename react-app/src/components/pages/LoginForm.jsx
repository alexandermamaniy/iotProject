import React, {Component} from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import './LoginForm.css'
import {sendPOST} from '../helpers/methods'
const hostname = 'http://localhost:3000'

export default class LoginForm extends Component {
  constructor (...props) {
    super (...props)

    this.state = {
      logingMessage: false
    }
    this.handleOnSubmit = this.handleOnSubmit.bind(this)
  }

  handleOnSubmit (e) {
    let formData = ''
    let form = document.forms[0]
    
    let email = form.querySelector('#email')
    let password = form.querySelector('#password')
    
    formData = `email=${email.value}&password=${password.value}&`
  
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
      <div className='login-form'>
        <Grid textAlign='center' verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              <Image src='/logo.png' /> Log-in to your account
            </Header>
            <Form  id="form-login" size='large'>
              <Segment stacked>
                <Form.Input id="email" fluid icon='user' iconPosition='left' placeholder='E-mail address' />
                <Form.Input id="password" fluid icon='lock' iconPosition='left' placeholder='Password' type='password' />
                <Button color='teal' fluid size='large' onClick={this.handleOnSubmit }>
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              New to us? <a href='#'>Sign Up</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    )
  }

} 
