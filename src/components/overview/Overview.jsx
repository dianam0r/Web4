import { useEffect,useState } from "react";
import Order from "./Order.jsx";
import Bill from "./Bill.jsx";
import "./Overview.css";

function Overview({ incomingReservation, setIncomingReservation, setJokes, setThemes }) {
  const [selectedOrderTable, setSelectedOrderTable] = useState(null);
  const [selectedBillTable, setSelectedBillTable] = useState(null);
  const [orders, setOrders] = useState({});
  const [tableAssignments, setTableAssignments] = useState(() => {
    const savedAssignments = localStorage.getItem("tableAssignments");
    return savedAssignments ? JSON.parse(savedAssignments) : {};
  });

  const [uploadedJokes, setUploadedJokes] = useState({});
  
  const [focusedTable, setFocusedTable] = useState(null);

  const getRandomPaidTables = () => {
    const tableCount = 6;
    const randomCount = Math.floor(Math.random() * tableCount) + 1;
    const shuffled = [...Array(tableCount)].map((_, i) => i + 1).sort(() => 0.5 - Math.random());
    return shuffled.slice(0, randomCount);
  };

  const [paidTables, setPaidTables] = useState(getRandomPaidTables);

  const goToOrderTable = (tableNumber) => {
    setSelectedOrderTable(tableNumber);
    setFocusedTable(tableNumber);
  };

  const goToBillTable = (tableNumber) => {
    setSelectedBillTable(tableNumber);
    setFocusedTable(tableNumber);
  };

  useEffect(() => {
    localStorage.setItem("tableAssignments", JSON.stringify(tableAssignments));
  }, [tableAssignments]);

  const handleAddToBill = (tableNumber, item, price) => {
    setOrders((prevOrders) => ({
      ...prevOrders,
      [tableNumber]: [...(prevOrders[tableNumber] || []), { name: item, price }], 
    }));
  };

  const handleRemoveFromBill = (tableNumber, item) => {
    setOrders((prevOrders) => {
      const updatedOrder = [...(prevOrders[tableNumber] || [])];
      const indexToRemove = updatedOrder.findIndex((i) => i.name === item);

      if (indexToRemove !== -1) {
        updatedOrder.splice(indexToRemove, 1);
      }

      return {
        ...prevOrders,
        [tableNumber]: updatedOrder,
      };
    });
  };


  const handlePay = (tableNumber) => {
    setPaidTables((prev) => [...prev, tableNumber]);
    setTableAssignments((prev) => {
      const updated = { ...prev };
      delete updated[tableNumber];
      return updated;
    });

    setSelectedBillTable(null);
  };

  const handleActivate = (tableNumber) => {
    setPaidTables((prev) => prev.filter((table) => table !== tableNumber));

    setTableAssignments((prevAssignments) => {
      const assignmentsUpdated = { ...prevAssignments };
      delete assignmentsUpdated[tableNumber];
      return assignmentsUpdated;
    });

    setOrders((prevOrders) => {
      const updatedOrders = { ...prevOrders };
      delete updatedOrders[tableNumber];
      return updatedOrders;
    });
  };

  const handleDropReservation = (tableNumber) => {
    if (incomingReservation) {
      setTableAssignments((prev) => ({
        ...prev,
        [tableNumber]: {
          name: incomingReservation.name,
          allergies: incomingReservation.allergies,
        },
      }));


      setPaidTables((prev) => prev.filter((num) => num !== tableNumber));

      setIncomingReservation(null);
    }
  };

  return (
    <>

      {incomingReservation && (
        <>
          <div
            className="overview__incoming"
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData("text/plain", "incomingReservation");
            }}
          >
            <h4>Incoming Reservation</h4>
            <p><strong>Name:</strong> {incomingReservation.name}</p>
            <p><strong>Guests:</strong> {incomingReservation.guests}</p>
            <p><strong>Details:</strong> {incomingReservation.details}</p>
            <p><strong>Date:</strong> {incomingReservation.day}</p>
            <p><strong>Time:</strong> {incomingReservation.time}</p>
          </div>

          <p>Drag this reservation to a table</p>
        </>
      )}

      {
            focusedTable && (
          <button onClick={() => {
            setFocusedTable(null);
            setSelectedOrderTable(null);
            setSelectedBillTable(null);
          }}>Show All Tables</button>
            )
        }
      <div className={`overview ${focusedTable ? 'overview_menu' : ''}`}>
        {!focusedTable && <h3>Overview</h3>}

        <ul className={`overview__ul ${focusedTable ? 'overview__ul__focused' : ''}`}>
          {[...Array(6)].map((_, index) => {
            const tableNumber = index + 1;
            const isPaid = paidTables.includes(tableNumber);

            if (focusedTable && focusedTable !== tableNumber) {
              return null;
            }

            return (
              <li
                className="overview__ul__li"
                key={index}
                onDragOver={(e) => {
                  if (!tableAssignments[tableNumber]) {
                    e.preventDefault();
                  }
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  const data = e.dataTransfer.getData("text/plain");
                  if (data === "incomingReservation" && !tableAssignments[tableNumber]) {
                    handleDropReservation(tableNumber);
                  }
                }}
              >
                Table {tableNumber}
                {tableAssignments[tableNumber]?.name && (
                  <>
                    <p><strong>Reserved for:</strong> {tableAssignments[tableNumber].name}</p>
                    {tableAssignments[tableNumber].allergies && (
                      <p><strong>Allergies:</strong> {tableAssignments[tableNumber].allergies}</p>
                    )}
                  </>
                )}

                {tableAssignments[tableNumber] || !isPaid ? (
                  <div className="overview__ul__li__buttons">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedOrderTable(tableNumber);
                        setSelectedBillTable(null);
                        setFocusedTable(tableNumber);
                      }}
                    >
                      Menu
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBillTable(tableNumber);
                        setSelectedOrderTable(null);
                        setFocusedTable(tableNumber);
                      }}
                    >
                      Bill
                    </button>

                    {uploadedJokes?.[tableNumber] && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const file = uploadedJokes[tableNumber];
                          const isVideo = file.name.endsWith(".mp4") || file.name.endsWith(".webm");
                          const mediaElement = document.createElement(isVideo ? "video" : "audio");
                          mediaElement.src = file.url;
                          mediaElement.controls = true;
                          mediaElement.autoplay = true;
                          mediaElement.classList.add("buttons__media_player");
                          const container = document.createElement("div");
                          container.classList.add("buttons__media_container");
                          container.appendChild(mediaElement);
                          const closeBtn = document.createElement("button");
                          closeBtn.textContent = "Close";
                          closeBtn.classList.add("buttons__media_close");
                          closeBtn.onclick = () => document.body.removeChild(container);
                          container.appendChild(closeBtn);
                          document.body.appendChild(container);
                        }}
                      >
                        ▶️ Play Joke
                      </button>
                    )}
                  </div>
                ) : (
                  <button onClick={() => handleActivate(tableNumber)}>Activate</button>
                )}
              </li>
            );
          })}
        </ul>

        {(selectedOrderTable !== null || selectedBillTable !== null) && (
          <div className="overview__menu">
            {selectedOrderTable !== null && (
              <Order
                tableNumber={selectedOrderTable}
                addToBill={handleAddToBill}
                removeFromBill={handleRemoveFromBill} // ← NEW
                goToTable={goToOrderTable}
                currentOrder={orders[selectedOrderTable] || []}
                setJokes={setJokes}
                setThemes={setThemes}
                uploadedJokes={uploadedJokes}
                setUploadedJokes={setUploadedJokes}
              />

            )}

            {selectedBillTable !== null && (
              <Bill
                tableNumber={selectedBillTable}
                orders={orders[selectedBillTable] || []}
                onPay={handlePay}
                goToTable={goToBillTable}
              />
            )}
          </div>
        )}
      </div>

    </>
  );
}

export default Overview;
