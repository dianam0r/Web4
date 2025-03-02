import './Reservations.css'
import RegisterForm from './RegisterForm.jsx'
import { useState, useEffect } from "react";

function Reservations() {
  const [showForm, setShowForm] = useState(false);
  const [reservations, setReservations] = useState(() => {
    const savedReservations = localStorage.getItem("reservations");
    return savedReservations ? JSON.parse(savedReservations) : [];
  });

  const [cancellations, setCancellations] = useState(() => {
    const savedCancellations = localStorage.getItem("cancellations");
    return savedCancellations ? JSON.parse(savedCancellations) : [];
  });

  useEffect(() => {
    localStorage.setItem("reservations", JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    localStorage.setItem("cancellations", JSON.stringify(cancellations));
  }, [cancellations]);

  const handleCancel = (indexToRemove) => {
    const isConfirmed = window.confirm("Are you sure you want to cancel this reservation?");

    if (!isConfirmed) return;

    setReservations((prev) => {
      return prev.filter((_, index) => index !== indexToRemove);
    });

    setCancellations((prevCancellations) => {
      return [...prevCancellations, reservations[indexToRemove]];
    });
  };


  const handleClearAll = () => {
    setReservations([]); 
    setCancellations([]); 
    localStorage.removeItem("reservations"); 
    localStorage.removeItem("cancellations"); // Remove cancellations from localStorage
  };

 

  return (
    <>
      <button onClick={handleClearAll}>Clear All Reservations</button>

      <div className="reservations">
        <ul className="reserved__days">
          <li><button>1 Today</button></li>
          <li><button>2 Tomorrow</button></li>
          <li><button>3 Wednesday</button></li>
        </ul>
        <div className="reservations__reserved">
          <button onClick={() => setShowForm((prev) => !prev)}>+</button>
          {showForm && <RegisterForm setReservations={setReservations} />}

          {reservations.length >= 0 && (
            <ul className="reserved__cards">
              <li>
                <div className="cards__flex">
                  <div>
                    <p className="cards__flex__day">2025-02-27</p>
                    <p className="cards__flex__time">20:00</p>
                  </div>
                  <div>
                    <p><strong>Name:</strong> Melanie</p>
                    <p><strong>Guests:</strong> 4</p>
                    <p><strong>Details:</strong> Brings 2 kids</p>
                  </div>
                </div>
              </li>

              {reservations.map((reservation, index) => (
                <li key={index}>
                  <div className="cards__flex">
                    <div>
                      <p className="cards__flex__day">{reservation.day}</p>
                      <p className="cards__flex__time">{reservation.time}</p>
                    </div>
                    <div>
                      <p><strong>Name:</strong> {reservation.name}</p>
                      <p><strong>Guests:</strong> {reservation.guests}</p>
                      <p><strong>Details:</strong> {reservation.details}</p>
                    </div>
                    <div>
                      <button>Arrived</button>
                      <button onClick={() => handleCancel(index)}>Cancel</button>
                      <button>Edit</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <p className="reserved__cancellations_title">Cancellations</p>
        <div className="reservations__cancellations">
          <ul className="reserved__cards">
            {cancellations.map((canceled, index) => (
              <li key={index}>
                <div className="cards__flex">
                  <div>
                    <p className="cards__flex__day">{canceled.day}</p>
                    <p className="cards__flex__time">{canceled.time}</p>
                  </div>
                  <div>
                    <p><strong>Name:</strong> {canceled.name}</p>
                    <p><strong>Guests:</strong> {canceled.guests}</p>
                    <p><strong>Details:</strong> {canceled.details}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Reservations;
