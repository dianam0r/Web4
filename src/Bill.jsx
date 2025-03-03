function Bill({ tableNumber, orders }) { // ✅ Receive orders as a prop
  return (
    <>
      <h3>Bill for Table {tableNumber}</h3>
      <ul>
        {orders.length > 0 ? (
          orders.map((item, index) => (
            <li key={index}>
              <p>{item}</p> <p>Price</p>
            </li>
          ))
        ) : (
          <li>No items ordered</li>
        )}
      </ul>
      <button>Voucher</button>
      <button>Pay</button>
    </>
  );
}

export default Bill;
