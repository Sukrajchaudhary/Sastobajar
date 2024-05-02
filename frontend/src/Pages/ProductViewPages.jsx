import React from 'react'
import Home from '../components/Home'
import ProductView from '../components/Product/components/ProductView'
import Footer from '../components/Footer'
const ProductViewPages = () => {
  return (
    <div>
      <Home>
        <ProductView/>
      </Home>
      <Footer/>
    </div>
  )
}

export default ProductViewPages
