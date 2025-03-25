import { useState } from "react";
import Order from "./Order.jsx";
import Bill from "./Bill.jsx";
import "./Overview.css";

function Overview() {
  const [selectedOrderTable, setSelectedOrderTable] = useState(null);
  const [selectedBillTable, setSelectedBillTable] = useState(null);
  const [orders, setOrders] = useState({});
  const [paidTables, setPaidTables] = useState([]); 

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
      <h2>Overview</h2>
      <ul>
        {[...Array(7)].map((_, index) => {
          const tableNumber = index + 1;
          const isPaid = paidTables.includes(tableNumber); 

          return (
            <li key={index}>
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
                    }}
                  >
                    Order
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedBillTable(tableNumber);
                      setSelectedOrderTable(null);
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

      {selectedOrderTable !== null && (
        <Order tableNumber={selectedOrderTable} addToBill={handleAddToBill} />
      )}

      {selectedBillTable !== null && (
        <Bill tableNumber={selectedBillTable} orders={orders[selectedBillTable] || []} onPay={handlePay} />
      )}
    </>
  );
}

export default Overview;
