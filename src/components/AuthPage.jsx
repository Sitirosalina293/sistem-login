import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { authLogin } from '../features/auth/authSlice'
import { Toaster } from 'react-hot-toast'

function AuthPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const auth = useSelector((state) => state.auth.auth)
  const loading = useSelector((state) => state.auth.loading)

  const [passwordShown, setPasswordShown] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const togglePassword = () => {
    setPasswordShown(!passwordShown)
  }
  const emailChange = (e) => {
    setEmail(e.target.value)
  }
  const passwordChange = (e) => {
    setPassword(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(authLogin({ email, password }))
  }
  useEffect(() => {
    if (auth.email && auth.password) {
      window.location.href = 'https://hacktiv8.com'
      setEmail('')
      setPassword('')
    } else {
      navigate('/')
    }
  }, [auth, navigate])
  return (
    <>
      <Toaster />
      <div className="container min-vh-100">
      <div className="mx-auto">
        <div className="mx-auto" style={{ textAlign:'center' }}>
          <h4>User Login</h4>
        </div>
        <div className="my-3 mx-auto px-4 col-sm-5">
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="username"
              onChange={emailChange}
              placeholder='Email'
              value={email}
              required
            />
            <label for="floatingInput">Username</label>
          </div>
          <div class="form-floating">
            <input
              class="form-control"
              id="password"
              placeholder="Password"
              type={passwordShown ? 'text' : 'password'}
              value={password}
              onChange={passwordChange}
              required
            />
            <label for="floatingPassword">Password</label>
          </div>
          <div class="mx-auto mt-5" style={{ width:'100px' }}>
            <button
              class="btn btn-primary"
              type="button"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default AuthPage
