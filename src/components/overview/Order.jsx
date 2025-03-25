import { useState } from "react";
import "./Order.css";

function Order({ tableNumber, addToBill }) {
  const [showFullMenu, setShowFullMenu] = useState(false);
  const [itemCounts, setItemCounts] = useState({});


  return (
    // overview__menu
    <>
    <div>
      <h4>Order for Table {tableNumber}</h4>
        <ul className="overview__menu__list">
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
            <button
              disabled={(itemCounts["Joke"] || 0) >= 2}
              onClick={() => {
                const currentJokes = itemCounts["Joke"] || 0;
                if (currentJokes >= 2) {
                  alert("Max 2 jokes per table! That's enough laughter.");
                  return;
                }

                addToBill(tableNumber, "Joke", -1);
                setItemCounts((prev) => ({
                  ...prev,
                  Joke: currentJokes + 1,
                }));
              }}
            >
              +
            </button>
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
