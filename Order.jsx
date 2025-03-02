// import { useState } from 'react'
import Full_Menu from './Full_Menu.jsx'
import Bill from './Bill.jsx'

function Order() {

  return (
    <>
      <h3>Order</h3>
      <div>
      1
      <button>Order</button>
      <button>Bill</button>
      <button>Check out</button>
      </div>
      <ul>
        <li>Entrees</li>
        <li>Dish</li>
        <li>Drinks</li>
        <li>Full Menu</li>
        <li>Soup</li>
        <li>Extras</li>
        <li>Joke</li>
        <li>Desert</li>
      </ul>
      <div>Arrows</div>
      <Full_Menu />
      <Bill/>
    </>
  )
}

export default Order
