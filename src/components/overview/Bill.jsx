import { useState } from "react";

function Bill({ tableNumber, orders, onPay }) { 
  const [discountApplied, setDiscountApplied] = useState(false); 

  const totalBeforeDiscount = orders.reduce((sum, item) => sum + item.price, 0); // total before discount
  const discountAmount = discountApplied ? totalBeforeDiscount * 0.3 : 0; // discount
  const total = totalBeforeDiscount - discountAmount; //Final total

  return (
    <>
      <h3>Bill for Table {tableNumber}</h3>
      <ul>
        {orders.length > 0 ? (
          orders.map((item, index) => (
            <li key={index}>
              <p>{item.name}</p> <p>{item.price}€</p>
            </li>
          ))
        ) : (
          <li>No items ordered</li>
        )}
      </ul>
      <h4>Total: {totalBeforeDiscount.toFixed(2)}€</h4>
      {discountApplied && <h4>Discount: -{discountAmount.toFixed(2)}€</h4>}
      <h4>Final Total: {total.toFixed(2)}€</h4> 

      <button
        onClick={() => setDiscountApplied(true)}
        disabled={discountApplied} 
      >
        Voucher (30% Off)
      </button>
      <button onClick={() => onPay(tableNumber)}>Pay</button> 
    </>
  );
}

export default Bill;
