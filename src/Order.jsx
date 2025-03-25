import { useState } from "react";
import FullMenu from "./FullMenu.jsx";

function Order({ tableNumber, addToBill }) {
  const [showFullMenu, setShowFullMenu] = useState(false);

  return (
    <>
      <h3>Order for Table {tableNumber}</h3>
      <ul>
        <li onClick={() => addToBill(tableNumber, "Entrees", 3)}><p>Entrees</p><p>3€</p></li>
        <li onClick={() => addToBill(tableNumber, "Dish", 9)}><p>Dish</p><p>9€</p></li>
        <li onClick={() => addToBill(tableNumber, "Drinks", 2)}><p>Drinks</p><p>2€</p></li>
        <li>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowFullMenu(true);
            }}
          >
            Full Menu
          </button>
        </li>
        <li onClick={() => addToBill(tableNumber, "Soup", 3)}> <p>Soup</p><p>3€</p></li>
        <li onClick={() => addToBill(tableNumber, "Extras", 2)}><p>Chips</p><p>2€</p></li>
        <li onClick={() => addToBill(tableNumber, "Joke", -1)}><p>Joke</p> <p>-1€ (Discount)</p></li>
        <li onClick={() => addToBill(tableNumber, "Dessert", 2)}><p>Dessert</p><p>2€</p></li>
      </ul>
      <div>Arrows</div>
      {showFullMenu && (
        <div>
          <FullMenu />
          <button onClick={() => setShowFullMenu(false)}>Close Menu</button>
        </div>
      )}
    </>
  );
}

export default Order;
