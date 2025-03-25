import { useState } from "react";
import Order from "./Order.jsx";
import Bill from "./Bill.jsx";
import "./Overview.css";

function Overview() {
  const [selectedOrderTable, setSelectedOrderTable] = useState(null);
  const [selectedBillTable, setSelectedBillTable] = useState(null);
  const [orders, setOrders] = useState({});
  const [paidTables, setPaidTables] = useState([]); 
  const [focusedTable, setFocusedTable] = useState(null);

  const handleAddToBill = (tableNumber, item, price) => {
    setOrders((prevOrders) => ({
      ...prevOrders,
      [tableNumber]: [...(prevOrders[tableNumber] || []), { name: item, price }], 
    }));
  };

  const handlePay = (tableNumber) => {
    setPaidTables((prev) => [...prev, tableNumber]);
    setSelectedBillTable(null); 
  };

  const handleActivate = (tableNumber) => {
    setPaidTables((prev) => prev.filter((table) => table !== tableNumber));
    setOrders((prevOrders) => {
      const updatedOrders = { ...prevOrders };
      delete updatedOrders[tableNumber]; 
      return updatedOrders;
    });
  };

  return (
    <>
    <div className="overview__layout">
      {
            focusedTable && (
              <button onClick={() => setFocusedTable(null)}>Show All Tables</button>
            )
          }
        <div className={`overview ${focusedTable ? 'overview_menu' : ''}`}>
          {!focusedTable && <h2>Overview</h2>}

          
          <ul className="overview__ul">
            {[...Array(6)].map((_, index) => {
              const tableNumber = index + 1;
              const isPaid = paidTables.includes(tableNumber);

              if (focusedTable && focusedTable !== tableNumber) {
                return null;
              }

              return (
                <li className="overview__ul__li" key={index}>
                  Table {tableNumber}

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
                        Order
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

          <div className="order">
            {selectedOrderTable !== null && (
              <Order tableNumber={selectedOrderTable} addToBill={handleAddToBill} />
            )}

            {selectedBillTable !== null && (
              <Bill tableNumber={selectedBillTable} orders={orders[selectedBillTable] || []} onPay={handlePay} />
            )}
          </div>

      </div>
    </div>
    </>
  );
}

export default Overview;
