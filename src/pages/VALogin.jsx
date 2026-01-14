import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './VALogin.css'

// Credentials for VA form access
const VA_FORM_USERNAME = 'oceanva'
const VA_FORM_PASSWORD = 'OceanVA2025!'

export default function VALogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/va-creation'

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (username === VA_FORM_USERNAME && password === VA_FORM_PASSWORD) {
      // Store authentication in sessionStorage
      sessionStorage.setItem('vaFormAuthenticated', 'true')
      sessionStorage.setItem('vaFormUsername', username)
      // Redirect to the original page or /va-creation
      navigate(from, { replace: true })
    } else {
      setError('Invalid username or password')
    }
  }

  return (
    <div className="va-login-wrapper">
      <div className="va-login-container">
        <header className="va-login-header">
          <h1 className="va-login-title">VA Form Access</h1>
          <p className="va-login-subtitle">Please enter your credentials to access the VA creation form</p>
        </header>

        <form className="va-login-form" onSubmit={handleSubmit}>
          {error && (
            <div className="va-login-error">
              {error}
            </div>
          )}

          <div className="va-login-field">
            <label htmlFor="username" className="va-login-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="va-login-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
              autoFocus
            />
          </div>

          <div className="va-login-field">
            <label htmlFor="password" className="va-login-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="va-login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <button type="submit" className="va-login-btn">
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}

