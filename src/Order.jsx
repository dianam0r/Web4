import { useState } from "react";
import FullMenu from "./FullMenu.jsx";
import "./Order.css";

function Order({ tableNumber, addToBill }) {
  const [showFullMenu, setShowFullMenu] = useState(false);
  const [itemCounts, setItemCounts] = useState({});


  return (
    <>
    <div>
      <h3>Order for Table {tableNumber}</h3>
        <ul className="menu_list">
          <li>
            <p><span>Entrees</span><span>3€</span></p>
            <button onClick={() => {
              addToBill(tableNumber, "Entrees", 3);
              setItemCounts((prev) => ({
                ...prev,
                Entrees: (prev.Entrees || 0) + 1,
              }));
            }}>+</button>
            <p>{itemCounts["Entrees"] || 0}</p>
          </li>

          <li>
            <p><span>Dish</span><span>9€</span></p>
            <button onClick={() => {
              addToBill(tableNumber, "Dish", 9);
              setItemCounts((prev) => ({
                ...prev,
                Dish: (prev.Dish || 0) + 1,
              }));
            }}>+</button>
            <p>{itemCounts["Dish"] || 0}</p>
          </li>

          <li>
            <p><span>Drinks</span><span>2€</span></p>
            <button onClick={() => {
              addToBill(tableNumber, "Drinks", 2);
              setItemCounts((prev) => ({
                ...prev,
                Drinks: (prev.Drinks || 0) + 1,
              }));
            }}>+</button>
            <p>{itemCounts["Drinks"] || 0}</p>
          </li>

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

          <li>
            <p><span>Soup</span><span>3€</span></p>
            <button onClick={() => {
              addToBill(tableNumber, "Soup", 3);
              setItemCounts((prev) => ({
                ...prev,
                Soup: (prev.Soup || 0) + 1,
              }));
            }}>+</button>
            <p>{itemCounts["Soup"] || 0}</p>
          </li>

          <li>
            <p><span>Chips</span><span>2€</span></p>
            <button onClick={() => {
              addToBill(tableNumber, "Extras", 2);
              setItemCounts((prev) => ({
                ...prev,
                Extras: (prev.Extras || 0) + 1,
              }));
            }}>+</button>
            <p>{itemCounts["Extras"] || 0}</p>
          </li>

          <li>
            <p><span>Joke</span><span>-1€ (Discount)</span></p>
            <button onClick={() => {
              addToBill(tableNumber, "Joke", -1);
              setItemCounts((prev) => ({
                ...prev,
                Joke: (prev.Joke || 0) + 1,
              }));
            }}>+</button>
            <p>{itemCounts["Joke"] || 0}</p>
          </li>

          <li>
            <p><span>Dessert</span><span>2€</span></p>
            <button onClick={() => {
              addToBill(tableNumber, "Dessert", 2);
              setItemCounts((prev) => ({
                ...prev,
                Dessert: (prev.Dessert || 0) + 1,
              }));
            }}>+</button>
            <p>{itemCounts["Dessert"] || 0}</p>
          </li>
        </ul>

      <div>Arrows</div>
      {showFullMenu && (
        <div>
          <FullMenu />
          <button onClick={() => setShowFullMenu(false)}>Close Menu</button>
        </div>
      )}
      </div>
    </>
  );
}

export default Order;
