import { useState } from "react";
import FullMenu from "./FullMenu.jsx";

function Order({ tableNumber }) { // ✅ Receive the table number as a prop
  const [showFullMenu, setShowFullMenu] = useState(false);

  return (
    <>
      <h3>Order for Table {tableNumber}</h3> {/* ✅ Show table number */}
      <ul>
        <li>Entrees</li>
        <li>Dish</li>
        <li>Drinks</li>
        <li>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevents <li> click from triggering
              setShowFullMenu(true);
            }}
          >
            Full Menu
          </button>
        </li>
        <li>Soup</li>
        <li>Extras</li>
        <li>Joke</li>
        <li>Desert</li>
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
