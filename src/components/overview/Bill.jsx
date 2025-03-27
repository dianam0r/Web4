import { useState } from "react";

function Bill({ tableNumber, orders, onPay }) { 
  const [discountApplied, setDiscountApplied] = useState(false); 

  const totalBeforeDiscount = orders.reduce((sum, item) => sum + item.price, 0);
  const discountAmount = discountApplied ? totalBeforeDiscount * 0.3 : 0; 
  const total = totalBeforeDiscount - discountAmount;

  return (
    <>
      <h4>Bill for Table {tableNumber}</h4>
      <ul className="bill__ul">
        {orders.length > 0 ? (
          orders.map((item, index) => (
            <li key={index} className="bill__ul__li">
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
      <div className="bill__buttons">
        <button
          onClick={() => setDiscountApplied(true)}
          disabled={discountApplied} 
        >
          Voucher (30% Off)
        </button>
        <button onClick={() => onPay(tableNumber)}>Pay</button> 
      </div>
    </>
  );
}

export default Bill;
