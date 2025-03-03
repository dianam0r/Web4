import { useState } from "react";
import Order from "./Order.jsx";
import Bill from "./Bill.jsx";
import "./Overview.css";

function Overview() {
  const [selectedOrderTable, setSelectedOrderTable] = useState(null);
  const [selectedBillTable, setSelectedBillTable] = useState(null);
  const [orders, setOrders] = useState({});

  const handleAddToBill = (tableNumber, item) => {
    setOrders((prevOrders) => ({
      ...prevOrders,
      [tableNumber]: [...(prevOrders[tableNumber] || []), item],
    }));
  };


  return (
    <>
      <h2>Overview</h2>
      <ul>
        {[...Array(7)].map((_, index) => (
          <li key={index}>
            Table {index + 1} {/* ✅ Show table number */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedOrderTable(index + 1); // ✅ Pass correct table number
                setSelectedBillTable(null);
              }}
            >
              Order
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedBillTable(index + 1); // ✅ Pass correct table number
                setSelectedOrderTable(null);
              }}
            >
              Bill
            </button>
          </li>
        ))}
      </ul>

      {/* Show <Order /> only when an "Order" button is clicked */}
      {selectedOrderTable !== null && <Order tableNumber={selectedOrderTable} />}

      {/* Show <Bill /> only when a "Bill" button is clicked */}
      {selectedBillTable !== null && <Bill tableNumber={selectedBillTable} />}
    </>
  );
}

export default Overview;
