import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    name: '',
    password: '',
    error: false,
    message: '',
  }

  changeName = event => {
    this.setState({name: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  triggerSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  submitForm = async event => {
    event.preventDefault()
    const {name, password} = this.state
    const userDetails = {username: name, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.triggerSuccess(data.jwt_token)
    } else {
      this.setState({error: true, message: data.error_msg})
    }
  }

  render() {
    const {name, password, error, message} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="loginContainer">
        <form className="formDesign" onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo"
          />
          <label htmlFor="username">USERNAME</label>
          <input
            type="text"
            value={name}
            id="username"
            placeholder="Username"
            onChange={this.changeName}
          />
          <label htmlFor="password">PASSWORD</label>
          <input
            id="password"
            value={password}
            type="password"
            placeholder="Password"
            onChange={this.changePassword}
          />
          <button type="submit" className="loginButton">
            Login
          </button>
          {error && <p className="error">{message}</p>}
        </form>
      </div>
    )
  }
}

export default Login
