// import { useState } from 'react'
import Order from './Order.jsx'
import './Overview.css'

function Overview() {

  return (
    <>
      <h2>Overview</h2>
      <ul>
        <li>
          1
          <button>Order</button>
          <button>Bill</button>
          <button>Check out</button>
        </li>
        <li>
          2
          <button>Activate</button>
        </li>
      </ul>

      <Order />
    </>
  )
}

export default Overview
