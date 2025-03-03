import { useState } from "react";
import FullMenu from "./FullMenu.jsx";

function Order({ tableNumber, addToBill }) { // ✅ Receive addToBill function
  const [showFullMenu, setShowFullMenu] = useState(false);

  return (
    <>
      <h3>Order for Table {tableNumber}</h3>
      <ul>
        <li onClick={() => addToBill(tableNumber, "Entrees")}>Entrees</li>
        <li onClick={() => addToBill(tableNumber, "Dish")}>Dish</li>
        <li onClick={() => addToBill(tableNumber, "Drinks")}>Drinks</li>
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
        <li onClick={() => addToBill(tableNumber, "Soup")}>Soup</li>
        <li onClick={() => addToBill(tableNumber, "Extras")}>Extras</li>
        <li onClick={() => addToBill(tableNumber, "Joke")}>Joke</li>
        <li onClick={() => addToBill(tableNumber, "Dessert")}>Dessert</li>
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
