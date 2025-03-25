import { useState } from "react";

function Bill({ tableNumber, orders, onPay }) { 
  const [discountApplied, setDiscountApplied] = useState(false); 

  const totalBeforeDiscount = orders.reduce((sum, item) => sum + item.price, 0); // total before discount
  const discountAmount = discountApplied ? totalBeforeDiscount * 0.3 : 0; // discount
  const total = totalBeforeDiscount - discountAmount; //Final total

  return (
    <>
      <h4>Bill for Table {tableNumber}</h4>
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
      <p>Total: {totalBeforeDiscount.toFixed(2)}€</p>
      {discountApplied && <p>Discount: -{discountAmount.toFixed(2)}€</p>}
      <p>Final Total: {total.toFixed(2)}€</p> 

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
