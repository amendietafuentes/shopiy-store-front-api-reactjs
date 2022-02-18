import React from 'react'

export const Header = ({titleHeader, syncLabel, syncProducts}) => {
  
  const handlesyncProducts = () => {
    syncProducts()
  }
  
  return (
    <header>
        <nav className='nav-bar'>
            <div className='container'>
                <div>
                  <h1>{titleHeader}</h1>
                </div>
                <div>
                 <button onClick={handlesyncProducts} id='syc-products'>{syncLabel}</button>
                </div>
            </div>
        </nav>
    </header>
  )
}

export default Header