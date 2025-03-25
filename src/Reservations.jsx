import './Reservations.css'
import RegisterForm from './RegisterForm.jsx'
import { useState, useEffect } from "react";


function Reservations({ setActiveSection }) {

  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

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
    localStorage.removeItem("cancellations"); 
  };

  // const handleSaveEdit = (index, updatedReservation) => {
  //   setReservations((prev) => {
  //     const newReservations = [...prev];
  //     newReservations[index] = updatedReservation;
  //     return newReservations;
  //   });
  //   setEditingIndex(null); 
  // };

  const filteredReservations = selectedDate
    ? reservations.filter((reservation) => reservation.day === selectedDate)
    : reservations;

  return (
    <>
      <button onClick={handleClearAll}>Clear All Reservations</button>

      <div className="reservations">
        <p className="reservations__title">Reservations</p>

        {/* ... filter input ... */}

        <div className="reservations__reserved">
          <button
            className="reservations__reserved__plus"
            onClick={() => setShowForm((prev) => !prev)}
          >
            {showForm ? '−' : '+'}
          </button>

          {showForm && <RegisterForm setReservations={setReservations} />}

          {reservations.length >= 0 && (
            <ul className="reservations__reserved__ul">
              {/* Hardcoded reservation for Melanie */}
              <li
                className="reserved__ul__cards"
                draggable
                onDrag={() => setActiveSection('overview')}
              >
                {/* card content here */}
              </li>

              {/* Dynamic reservations */}
              {filteredReservations.map((reservation, index) => (
                <li
                  className="reserved__ul__cards"
                  key={index}
                  draggable
                  onDrag={() => setActiveSection('overview')}
                >
                  {editingIndex === index ? (
                    // editing form...
                    <div> {/* form inputs */} </div>
                  ) : (
                    // static reservation display...
                    <div>
                      <div className="day_time">
                        <p className="cards__flex__day">{reservation.day}</p>
                        <p className="cards__flex__time">{reservation.time}</p>
                      </div>
                      <div className="cards__flex__time__header">
                        <p className="cards__flex__time__header__name"><strong>Name:</strong> {reservation.name}</p>
                        <div className="cards__flex__time__header__buttons">
                          <button onClick={() => handleCancel(index)}>Cancel</button>
                          <button onClick={() => setEditingIndex(index)}>Edit</button>
                        </div>
                        <p className="cards__flex__time__header__guests"><strong>Guests:</strong> {reservation.guests}</p>
                        <p className="cards__flex__time__header__details"><strong>Details:</strong> {reservation.details}</p>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        <p className="reservations__cancellations_title">Cancellations</p>

        <div className="reservations__cancellations">
          <ul className="cancellations__reserved__ul">
            {cancellations.map((canceled, index) => (
              <li className="cancellation__ul__cards" key={index}>
                <div className="cancellation__ul__cards__flex">
                  <div>
                    <p className="cancelled__cards__flex__day">{canceled.day}</p>
                    <p className="cancelled__cards__flex__time">{canceled.time}</p>
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
