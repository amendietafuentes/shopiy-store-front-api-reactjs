import React from 'react'

const Products = ({products = []}) => {
    
  return (
    <div id='products'>
        {   
            products.map((item, index) => (
                
                <div key={index} className='container'>
                    <div className='img-product'>
                        <img src={item.node.images.edges[0].node.url} alt={item.node.title} title={item.node.title} />
                    </div>
                    <div className='info-product'>
                        <h1 className='title-product'>{item.node.title}</h1>
                        <p className='vendor-product'>{item.node.vendor}</p>
                    </div>
                    <div className="price-product">
                        <span>Quantity: {item.node.totalInventory}</span>    
                        <span className="price">{item.node.variants.edges[0].node.price}</span>    
                    </div>   
                </div>
                
            ))
        }              
    </div>
  )
}

export default Products