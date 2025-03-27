import { useEffect,useState } from "react";
import Order from "./Order.jsx";
import Bill from "./Bill.jsx";
import "./Overview.css";

function Overview({ incomingReservation, setIncomingReservation }) {
  const [selectedOrderTable, setSelectedOrderTable] = useState(null);
  const [selectedBillTable, setSelectedBillTable] = useState(null);
  const [orders, setOrders] = useState({});
  const getRandomPaidTables = () => {
    const tableCount = 6;
    const randomCount = Math.floor(Math.random() * tableCount) + 1;
    const shuffled = [...Array(tableCount)].map((_, i) => i + 1).sort(() => 0.5 - Math.random());
    return shuffled.slice(0, randomCount);
  };

  const goToOrderTable = (tableNumber) => {
    setSelectedOrderTable(tableNumber);
    setFocusedTable(tableNumber);
  };

  const goToBillTable = (tableNumber) => {
    setSelectedBillTable(tableNumber);
    setFocusedTable(tableNumber);
  };



  const [tableAssignments, setTableAssignments] = useState(() => {
    const savedAssignments = localStorage.getItem("tableAssignments");
    return savedAssignments ? JSON.parse(savedAssignments) : {};
  });

  useEffect(() => {
    localStorage.setItem("tableAssignments", JSON.stringify(tableAssignments));
  }, [tableAssignments]);


  const [paidTables, setPaidTables] = useState(getRandomPaidTables);

  const [focusedTable, setFocusedTable] = useState(null);

  const handleAddToBill = (tableNumber, item, price) => {
    setOrders((prevOrders) => ({
      ...prevOrders,
      [tableNumber]: [...(prevOrders[tableNumber] || []), { name: item, price }], 
    }));
  };

  const handlePay = (tableNumber) => {
    setPaidTables((prev) => [...prev, tableNumber]);
    setTableAssignments((prev) => {
      const updated = { ...prev };
      delete updated[tableNumber];
      localStorage.setItem("tableAssignments", JSON.stringify(updated)); 
      return updated;
    });

    setSelectedBillTable(null);
  };


  const handleActivate = (tableNumber) => {
    setPaidTables((prev) => prev.filter((table) => table !== tableNumber));

    setTableAssignments((prevAssignments) => {
      const updated = { ...prevAssignments };
      delete updated[tableNumber];
      return updated;
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
        [tableNumber]: incomingReservation.name,
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
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const data = e.dataTransfer.getData("text/plain");
                    if (data === "incomingReservation") {
                      handleDropReservation(tableNumber);
                    }
                  }}
                >


                  Table {tableNumber}
                  {tableAssignments[tableNumber] && (
                    <p><strong>Reserved for:</strong> {tableAssignments[tableNumber]}</p>
                  )}

                  {isPaid ? (
                    <button onClick={() => handleActivate(tableNumber)}>Activate</button>
                  ) : (
                    <>
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
                    </>
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
                goToTable={goToOrderTable}
                currentOrder={orders[selectedOrderTable] || []}
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
