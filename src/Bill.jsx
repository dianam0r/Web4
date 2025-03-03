function Bill({ tableNumber }) { // ✅ Receive the table number as a prop
  return (
    <>
      <h3>Bill for Table {tableNumber}</h3> {/* ✅ Show table number */}
      <ul>
        <li><p>Plate</p> <p>Price</p></li>
      </ul>
      <button>Voucher</button>
      <button>Pay</button>
    </>
  );
}

export default Bill;
