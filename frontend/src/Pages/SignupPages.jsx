import React from 'react'
import Home from '../components/Home'
import Signup from '../components/Auth/components/Signup'
import Footer from '../components/Footer'
const SignupPages = () => {
  return (
    <div>
      <Home>
        <Signup/>
      </Home>
      <Footer/>
    </div>
  )
}

export default SignupPages
