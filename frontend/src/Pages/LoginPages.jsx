import React from 'react'
import Home from '../components/Home'
import Login from '../components/Auth/components/Login'
import Footer from '../components/Footer'
const LoginPages = () => {
  return (
    <div>
      <Home>
        <Login/>
      </Home>
      <Footer/>
    </div>
  )
}

export default LoginPages
