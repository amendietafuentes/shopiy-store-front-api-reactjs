import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Products from './components/Products';
import './App.css';

function App() {
  const API_ENDPOINT = 'https://ar-holdings-dev-test.myshopify.com/api/2022-01/graphql.json';

  const HEADERS_REQUEST = new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Shopify-Storefront-Access-Token': process.env.REACT_APP_STORE_FRONT_TOKEN,
  })

  const [products, setProducts] = useState([]);

  const fetchShopifyStoreProducts = async (API_ENDPOINT) => {
    await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: HEADERS_REQUEST,
      body: JSON.stringify({ query: queryProducts() }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data.products);
        setProducts(result.data.products.edges);
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    fetchShopifyStoreProducts(API_ENDPOINT)
  }, []);

  /**
   *  Call Syncronize Method
   */

  const syncProducts = async() => {
    await fetchShopifyStoreProducts(API_ENDPOINT);
  }

  /**
   * The graphql query
   **/
  const queryProducts = () => `
  {
      products(first: 10) {
        edges {
          node {
            id
            title
            totalInventory
            vendor
            images(first: 10) {
              edges {
                node {
                  url
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  price
                  product {
                    totalInventory
                  }
                }
              }
            }
          }
        }
      }
    }
  `

  return (
    <>
      <div className="App">
        <Header
          titleHeader="AR Holding Products"
          syncLabel="Sync Products"
          syncProducts={syncProducts}
        />
        <Products products={products} />
      </div>
    </>
  )
}

export default App
