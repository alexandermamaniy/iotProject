import React, { Component } from 'react'
import {
  Route,
  BrowserRouter as Router,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'

import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import Home from './pages/Home'
import Publico from './pages/Publico'
import {sendGET} from './helpers/methods'
import LoginForm from './pages/LoginForm'
const hostname = 'http://localhost:3000'

class App extends Component {
  constructor (...props) {
    super (...props)

    this.state = {
      authed: false,
      user: null,
      isLogin: false
    }
    
    this.setIsLogin = this.setIsLogin.bind(this)
  }

  componentDidMount () {
    sendGET(`${hostname}/user`)
      .then((data) => {
        this.setState({
          authed: true,
          user: data.user
        })
      })
      .catch(() => {
        this.setState({authed: false})
      })
  }

  setIsLogin (value) {
    this.setState({
      authed: false,
      user: null,
      isLogin: value
    })
    
  }

  render() {
    return (
      <Router>
        <div>
          <ResponsiveContainer authed={this.state.authed} isLogin={this.state.isLogin} setIsLogin={this.setIsLogin} >
          </ResponsiveContainer>
          
        </div>
      </Router>
    )
  }
}




class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children, authed, isLogin, setIsLogin } = this.props
    const { fixed } = this.state
    return (
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility once={false} onBottomPassed={this.showFixedMenu} onBottomPassedReverse={this.hideFixedMenu} >
          <Segment inverted textAlign='center' style={{ minHeight: 700, padding: '1em 0em' }} vertical >
            {
              (isLogin === true) 
              ? 
                <LoginForm authed={authed}/>
              :
                <div>
                  <Menu fixed={fixed ? 'top' : null} inverted={!fixed} pointing={!fixed} secondary={!fixed} size='large' >
                  {
                    (authed === true)
                    ?
                    <Container>
                      <Menu.Item as='a' active>
                        Home
                      </Menu.Item>
                      <Menu.Item as='a'>Ambientes</Menu.Item>
                      <Menu.Item as='a'>Sensores</Menu.Item>
                      <Menu.Item position='right'>
                        <Button as='a' inverted={!fixed} onClick={e => {
                          setIsLogin(false)
                          localStorage.removeItem('Authorization')
                        }} >
                          Log Out
                        </Button>
                      </Menu.Item>
                    </Container>
                    :
                    <Container>
                      <Menu.Item as='a' active>
                        Home
                      </Menu.Item>
                      <Menu.Item position='right'>
                        <Button as='a' inverted={!fixed} onClick={e => {
                          setIsLogin(true)
                        }} >
                          Log in
                        </Button>
                      </Menu.Item>
                    </Container>
                  }
                </Menu>  
                <Publico/>
                </div>
            }
            
            
          </Segment>
        </Visibility>
        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {}

  handlePusherClick = () => {
    const { sidebarOpened } = this.state

    if (sidebarOpened) this.setState({ sidebarOpened: false })
  }

  handleToggle = () => this.setState({ sidebarOpened: !this.state.sidebarOpened })

  render() {
    const { children, authed } = this.props
    const { sidebarOpened } = this.state

    return (
      <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
        <Sidebar.Pushable>
          <Sidebar as={Menu} animation='uncover' inverted vertical visible={sidebarOpened}>
            <Menu.Item as='a' active>
              Home
            </Menu.Item>
            <Menu.Item as='a'>Ambientes</Menu.Item>
            <Menu.Item as='a'>Sensores</Menu.Item>
            <Menu.Item as='a'>Log in</Menu.Item>
          </Sidebar>

          <Sidebar.Pusher dimmed={sidebarOpened} onClick={this.handlePusherClick} style={{ minHeight: '100vh' }} >
            <Segment inverted textAlign='center' style={{ minHeight: 350, padding: '1em 0em' }} vertical >
              <Container>
                <Menu inverted pointing secondary size='large'>
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name='sidebar' />
                  </Menu.Item>
                  <Menu.Item position='right'>
                    <Button as='a' inverted>
                      Log in
                    </Button>
                  </Menu.Item>
                </Menu>
              </Container>
              
            </Segment>
            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children, authed, isLogin, setIsLogin }) => (
  <div>
    <DesktopContainer authed={authed} isLogin={isLogin} setIsLogin={setIsLogin} >{children}</DesktopContainer>
    <MobileContainer authed={authed} isLogin={isLogin} setIsLogin={setIsLogin} >{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const HomepageLayout = () => (
  <ResponsiveContainer>
    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='About' />
              <List link inverted>
                <List.Item as='a'>Sitemap</List.Item>
                <List.Item as='a'>Contact Us</List.Item>
                <List.Item as='a'>Religious Ceremonies</List.Item>
                <List.Item as='a'>Gazebo Plans</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Services' />
              <List link inverted>
                <List.Item as='a'>Banana Pre-Order</List.Item>
                <List.Item as='a'>DNA FAQ</List.Item>
                <List.Item as='a'>How To Access</List.Item>
                <List.Item as='a'>Favorite X-Men</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as='h4' inverted>
                Footer Header
              </Header>
              <p>
                Extra space for a call to action inside the footer that could help re-engage users.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
)

const PublicRoute = ({component: Component, authed, rest}) => (
  <Route
    {...rest}
    render={
      () => authed ===false
        ? <Component  />
        : <Redirect to="/" />
    }
  />
)

const PrivateRouteForm = ({component: Component, authed, rest}) => (
  <Route
    {...rest}
    render={
      () => authed ===false
        ? <Component  />
        : <Redirect to="/" />
    }
  />
)

export default App
