import {Component} from 'react'
import './index.css'

class CreateAnAccount extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    showSubmitError: false,
    errorMsg1: '',
    errorMsg2: '',
    errorMsg3: '',
    errorMsg4: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangeEmail = event => {
    this.setState({email: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeConfirmPassword = event => {
    this.setState({confirmPassword: event.target.value})
  }

  onCreateAnAccount = event => {
    event.preventDefault()
    const {username, email, password, confirmPassword} = this.state
    if (username === '') {
      this.setState({
        showSubmitError: true,
        errorMsg1: 'Please Fill Username Field',
      })
    }
    if (email === '') {
      this.setState({
        showSubmitError: true,
        errorMsg2: 'Please Fill Email Field',
      })
    }
    if (password === '') {
      this.setState({
        showSubmitError: true,
        errorMsg3: 'Please Fill Password Field',
      })
    }
    if (confirmPassword === '') {
      this.setState({
        showSubmitError: true,
        errorMsg4: 'Please Fill Confirm Password Field',
      })
    }
    if (
      username !== '' &&
      email !== '' &&
      password !== '' &&
      confirmPassword !== '' &&
      password === confirmPassword
    ) {
      const userData = {username, email, password, confirmPassword}
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization:
            'Bearer 00f3f8fde06120db02b587cc372c3d85510896e899b45774068bb750462acd9f',
        },
        body: JSON.stringify(userData),
      }
      const url = 'https://apis.ccbp.in/users'
      fetch(url, options)
        .then(function (response) {
          return response.json()
        })
        .then(function (jsonData) {
          console.log(jsonData)
          if (jsonData.code === 422) {
            if (jsonData.data[0].message === 'has already been taken') {
              this.setState({errorMsg2: 'Email Already has Taken'})
            }
          }
        })
    }
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="input-field"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
      </>
    )
  }

  renderEmailField = () => {
    const {email} = this.state
    return (
      <>
        <label className="input-label" htmlFor="email">
          EMAIL ADDRESS
        </label>
        <input
          type="text"
          id="email"
          className="input-field"
          value={email}
          onChange={this.onChangeEmail}
          placeholder="Email Address"
        />
      </>
    )
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </>
    )
  }

  renderConfirmPasswordField = () => {
    const {confirmPassword} = this.state
    return (
      <>
        <label className="input-label" htmlFor="confirmPassword">
          PASSWORD
        </label>
        <input
          type="password"
          id="confirmPassword"
          className="input-field"
          value={confirmPassword}
          onChange={this.onChangeConfirmPassword}
          placeholder="Confirm Password"
        />
      </>
    )
  }

  render() {
    const {
      showSubmitError,
      errorMsg1,
      errorMsg2,
      errorMsg3,
      errorMsg4,
    } = this.state
    return (
      <div className="login-form-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          className="login-website-logo-mobile-img"
          alt="website logo"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          className="login-img"
          alt="website login"
        />
        <form className="form-container" onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            className="login-website-logo-desktop-img"
            alt="website logo"
          />
          <div className="input-container">{this.renderUsernameField()}</div>
          {showSubmitError && <p className="error-message">{errorMsg1}</p>}
          <div className="input-container">{this.renderEmailField()}</div>
          {showSubmitError && <p className="error-message">{errorMsg2}</p>}
          <div className="input-container">{this.renderPasswordField()}</div>
          {showSubmitError && <p className="error-message">{errorMsg3}</p>}
          <div className="input-container">
            {this.renderConfirmPasswordField()}
          </div>
          {showSubmitError && <p className="error-message">{errorMsg4}</p>}
          <button
            type="submit"
            className="login-button"
            onClick={this.onCreateAnAccount}
          >
            CREATE ACCOUNT
          </button>
        </form>
      </div>
    )
  }
}

export default CreateAnAccount
