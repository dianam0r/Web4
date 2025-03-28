import { useState, useEffect } from "react";

function Order({ tableNumber, addToBill, goToTable, currentOrder, setJokes, setThemes, setUploadedJokes, removeFromBill }) {
  const jokeAlreadyInBill = currentOrder.some((item) => item.name === "Joke");

  const [showFullMenu, setShowFullMenu] = useState(false);
  const [itemCounts, setItemCounts] = useState({});
  const [jokeInput, setJokeInput] = useState("");
  const [jokeSubmitted, setJokeSubmitted] = useState(false);
  const [isRainbow, setisRainbow] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [holiday, setHoliday] = useState("");

  useEffect(() => {
    setItemCounts({});
    setJokeInput("");
    setJokeSubmitted(false);
  }, [tableNumber]);

  const renderMenuItem = (label, price, keyName = label) => (
    <li className="overview__menu__list__li">
      <p className="menu__list__li__name"><span>{label}</span><span>{price}€</span></p>
      <div className="menu__list__li__add">
        <button
          onClick={() => {
            if ((itemCounts[keyName] || 0) > 0) {
              removeFromBill(tableNumber, keyName); 
              setItemCounts((prev) => ({
                ...prev,
                [keyName]: prev[keyName] - 1,
              }));
            }
          }}
          disabled={(itemCounts[keyName] || 0) === 0}
        >−</button>

        <p>{itemCounts[keyName] || 0}</p>

        <button
          onClick={() => {
            addToBill(tableNumber, keyName, price);
            setItemCounts((prev) => ({
              ...prev,
              [keyName]: (prev[keyName] || 0) + 1,
            }));
          }}
        >+</button>
      </div>
    </li>
  );


  return (
    <div>
      <h4>Order for Table {tableNumber}</h4>
      <ul className={`overview__menu__list ${isRainbow ? 'rainbow' : ''}`}>
        {renderMenuItem("Entrees", 3)}
        {renderMenuItem("Dish", 9)}
        {renderMenuItem("Drinks", 2)}
        {renderMenuItem("Soup", 3)}
        {renderMenuItem("Chips", 2, "Extras")}
        {renderMenuItem("Dessert", 2)}

        <li className={itemCounts["Joke"] === 1 ? "overview__menu__list__li__joke" : "overview__menu__list__li"}>
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
            >+</button>
            <p>{itemCounts["Joke"] || 0}</p>
          </div>

          {itemCounts["Joke"] === 1 && !jokeSubmitted && (
            <form
              className="menu__list__li__joke-form"
              onSubmit={(e) => {
                e.preventDefault();
                addToBill(tableNumber, "Joke", -1);
                setJokeSubmitted(true);
                setisRainbow(true);
                setTimeout(() => setisRainbow(false), 600);
                setJokes((prev) => [...prev, jokeInput]);
                setThemes((prev) => [...prev, holiday]);
              }}
            >
              <p>Submit your joke:</p>
              <textarea
                className="joke_form__joke"
                placeholder="Type a joke or video link"
                value={jokeInput}
                required
                onChange={(e) => setJokeInput(e.target.value)}
                rows={4}
              />
              <label>Choose a holiday:</label>
              <select
                id="holiday"
                value={holiday}
                required
                onChange={(e) => setHoliday(e.target.value)}
              >
                <option value="">-- Select a holiday --</option>
                <option value="Christmas">🎄 Christmas</option>
                <option value="Halloween">🎃 Halloween</option>
                <option value="Thanksgiving">🦃 Thanksgiving</option>
                <option value="Valentine's Day">❤️ Valentine's Day</option>
                <option value="New Year's Eve">🎆 New Year's Eve</option>
                <option value="Easter">🐣 Easter</option>
                <option value="April Fools">😜 April Fools</option>
                <option value="Other">✨ Other</option>
              </select>
              <input
                type="file"
                accept="audio/*,video/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const fileURL = URL.createObjectURL(file);
                    setUploadedFile({ name: file.name, url: fileURL });
                    setUploadedJokes((prev) => ({
                      ...prev,
                      [tableNumber]: { name: file.name, url: fileURL },
                    }));
                  }
                }}
              />
              <button type="submit">Submit</button>
              {uploadedFile && (
                <a href={uploadedFile.url} download={uploadedFile.name}>
                  📥 Download your joke file: {uploadedFile.name}
                </a>
              )}
            </form>
          )}

          {jokeSubmitted && <p>✅ Discount applied. Thanks for the laugh!</p>}
        </li>
      </ul>

      <div className="order__arrows">
        <button
          onClick={() => goToTable(Math.max(1, tableNumber - 1))}
          disabled={tableNumber === 1}
        >←</button>
        <span>Table {tableNumber}</span>
        <button
          onClick={() => goToTable(Math.min(6, tableNumber + 1))}
          disabled={tableNumber === 6}
        >→</button>
      </div>

      {showFullMenu && (
        <div>
          <FullMenu />
          <button onClick={() => setShowFullMenu(false)}>Close Menu</button>
        </div>
      )}
    </div>
  );
}

export default Order;
