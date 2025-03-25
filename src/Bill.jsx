import { useState } from "react";

function Bill({ tableNumber, orders, onPay }) { 
  const [discountApplied, setDiscountApplied] = useState(false); 

  const totalBeforeDiscount = orders.reduce((sum, item) => sum + item.price, 0); // ✅ Calculate total before discount
  const discountAmount = discountApplied ? totalBeforeDiscount * 0.3 : 0; // ✅ 30% discount if applied
  const total = totalBeforeDiscount - discountAmount; // ✅ Final total

  return (
    <>
      <h3>Bill for Table {tableNumber}</h3>
      <ul>
        {orders.length > 0 ? (
          orders.map((item, index) => (
            <li key={index}>
              <p>{item.name}</p> <p>{item.price}€</p> {/* ✅ Show item name & price */}
            </li>
          ))
        ) : (
          <li>No items ordered</li>
        )}
      </ul>
      <h4>Total: {totalBeforeDiscount.toFixed(2)}€</h4> {/* ✅ Show total before discount */}
      {discountApplied && <h4>Discount: -{discountAmount.toFixed(2)}€</h4>} {/* ✅ Show discount if applied */}
      <h4>Final Total: {total.toFixed(2)}€</h4> {/* ✅ Show final total after discount */}

      <button
        onClick={() => setDiscountApplied(true)}
        disabled={discountApplied} 
      >
        Voucher (30% Off)
      </button>
      <button onClick={() => onPay(tableNumber)}>Pay</button> {/* ✅ Call handlePay */}
    </>
  );
}

export default Bill;
