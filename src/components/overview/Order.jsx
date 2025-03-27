import { useState } from "react";
import { useEffect } from "react"; 

function Order({ tableNumber, addToBill, goToTable, currentOrder }) {

  const jokeAlreadyInBill = currentOrder.some((item) => item.name === "Joke");

  useEffect(() => {
    setItemCounts({});
  }, [tableNumber]);

  const [showFullMenu, setShowFullMenu] = useState(false);
  const [itemCounts, setItemCounts] = useState({});
  const [jokeInput, setJokeInput] = useState("");
  const [jokeSubmitted, setJokeSubmitted] = useState(false);

  useEffect(() => {
    setItemCounts({});
    setJokeInput("");
    setJokeSubmitted(false);
  }, [tableNumber]);

  

  return (
    <>
    <div>
      <h4>Order for Table {tableNumber}</h4>
        <ul className="overview__menu__list">
          <li className="overview__menu__list__li">
            <p className="menu__list__li__name"><span>Entrees</span><span>3€</span></p>
            <div className="menu__list__li__add">
              <button onClick={() => {
                addToBill(tableNumber, "Entrees", 3);
                setItemCounts((prev) => ({
                  ...prev,
                  Entrees: (prev.Entrees || 0) + 1,
                }));
              }}>+</button>
              <p>{itemCounts["Entrees"] || 0}</p>
            </div>
          </li>

          <li className="overview__menu__list__li">
            <p className="menu__list__li__name"><span>Dish</span><span>9€</span></p>
            <div className="menu__list__li__add">
              <button onClick={() => {
                addToBill(tableNumber, "Dish", 9);
                setItemCounts((prev) => ({
                  ...prev,
                  Dish: (prev.Dish || 0) + 1,
                }));
              }}>+</button>
              <p>{itemCounts["Dish"] || 0}</p>
            </div>
          </li>

          <li className="overview__menu__list__li">
            <p className="menu__list__li__name"><span>Drinks</span><span>2€</span></p>
            <div className="menu__list__li__add">
              <button onClick={() => {
                addToBill(tableNumber, "Drinks", 2);
                setItemCounts((prev) => ({
                  ...prev,
                  Drinks: (prev.Drinks || 0) + 1,
                }));
              }}>+</button>
              <p>{itemCounts["Drinks"] || 0}</p>
            </div>
          </li>

          <li className="overview__menu__list__li">
            <p className="menu__list__li__name"><span>Soup</span><span>3€</span></p>
            <div className="menu__list__li__add">
              <button onClick={() => {
                addToBill(tableNumber, "Soup", 3);
                setItemCounts((prev) => ({
                  ...prev,
                  Soup: (prev.Soup || 0) + 1,
                }));
              }}>+</button>
              <p>{itemCounts["Soup"] || 0}</p>
            </div>
          </li>

          <li className="overview__menu__list__li">
            <p className="menu__list__li__name"><span>Chips</span><span>2€</span></p>
            <div className="menu__list__li__add">
              <button onClick={() => {
                addToBill(tableNumber, "Extras", 2);
                setItemCounts((prev) => ({
                  ...prev,
                  Extras: (prev.Extras || 0) + 1,
                }));
              }}>+</button>
              <p>{itemCounts["Extras"] || 0}</p>
            </div>
          </li>

          <li className={itemCounts["Joke"] === 1
            ? "overview__menu__list__li__joke"
            : "overview__menu__list__li"}>

            <p className="menu__list__li__name">
              <span>Joke</span>
              <span>-1€ (Discount)</span>
            </p>

            <div className="menu__list__li__add">
              <button
                disabled={itemCounts["Joke"] === 1 || jokeAlreadyInBill}
                onClick={() => {
                  if (!jokeAlreadyInBill && itemCounts["Joke"] !== 1) {
                    setItemCounts((prev) => ({
                      ...prev,
                      Joke: 1,
                    }));
                  }
                }}
              >
                +
              </button>

              <p>{itemCounts["Joke"] || 0}</p>
            </div>

            {itemCounts["Joke"] === 1 && !jokeSubmitted && (
              <div className="menu__list__li__joke-form">
                <p>Submit your joke:</p>
                <input
                  type="text"
                  placeholder="Type a joke or video link"
                  value={jokeInput}
                  onChange={(e) => setJokeInput(e.target.value)}
                />
                <button
                  onClick={() => {
                    if (jokeInput.trim() === "") {
                      alert("Please submit something funny or entertaining 😄");
                      return;
                    }
                    addToBill(tableNumber, "Joke", -1);
                    setJokeSubmitted(true);
                  }}
                >
                  Submit
                </button>
              </div>
            )}

            {jokeSubmitted && (
              <p className="joke__thankyou">✅ Discount applied. Thanks for the laugh!</p>
            )}
          </li>

          <li className="overview__menu__list__li">
            <p className="menu__list__li__name"><span>Dessert</span><span>2€</span></p>
            <div className="menu__list__li__add">
              <button onClick={() => {
                addToBill(tableNumber, "Dessert", 2);
                setItemCounts((prev) => ({
                  ...prev,
                  Dessert: (prev.Dessert || 0) + 1,
                }));
              }}>+</button>
              <p>{itemCounts["Dessert"] || 0}</p>
            </div>
          </li>
        </ul>


        <div className="order__arrows">
          <button
            onClick={() => goToTable(Math.max(1, tableNumber - 1))}
            disabled={tableNumber === 1}
          >
            ←
          </button>
          <span style={{ margin: '0 1rem' }}>Table {tableNumber}</span>
          <button
            onClick={() => goToTable(Math.min(6, tableNumber + 1))}
            disabled={tableNumber === 6}
          >
            →
          </button>
        </div>


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
