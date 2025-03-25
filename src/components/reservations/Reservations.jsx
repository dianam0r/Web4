import './Reservations.css'
import RegisterForm from './RegisterForm'
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

  const handleSaveEdit = (index, updatedReservation) => {
    setReservations((prev) => {
      const newReservations = [...prev];
      newReservations[index] = updatedReservation;
      return newReservations;
    });
    setEditingIndex(null); 
  };

  const filteredReservations = selectedDate
    ? reservations.filter((reservation) => reservation.day === selectedDate)
    : reservations;

  return (
    <>
    {/* article - dashboard__reservations */}
      <button onClick={handleClearAll}>Clear All Reservations</button>
      <div className="dashboard__reservations__layout">
        <section className="reservations__layout__reserved">
          <h4 className="reserved__title">Reservations</h4>
          <div className="reserved__filter">
            <label htmlFor="dateFilter">Filter by Date:</label>
            <input
              type="date"
              id="dateFilter"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
          <button
            className="reservations__reserved__plus"
            onClick={() => setShowForm((prev) => !prev)}
          >
            {showForm ? '−' : '+'}
          </button>

          {showForm && <RegisterForm setReservations={setReservations} />}

          {reservations.length >= 0 && (
            <ul className="reserved__ul">
              <li
                className="reserved__ul__cards"
                draggable
                onDrag={() => setActiveSection('overview')}
              >
                <div className="cards__header">
                  <p className='cards__header__name'><strong>Name:</strong> Melanie</p>
                  <p className='cards__header__guests'><strong>Guests:</strong> 4</p>
                  <p className='cards__header__details'><strong>Details:</strong> Brings 2 kids</p>
                </div>
                <div className="cards__times">
                  <p className="cards__times__day">2025-02-27</p>
                  <p className="cards__times__time">20:00</p>
                </div>
              </li>

              {filteredReservations.map((reservation, index) => (
                <li
                draggable="true"
                  className="reserved__ul__cards"
                  key={index}
                >
                  {editingIndex === index ? (
                    <div>
                      <input

                        type="text"
                        defaultValue={reservation.name}
                        onChange={(e) => (reservation.name = e.target.value)}
                      />
                      <input

                        type="number"
                        defaultValue={reservation.guests}
                        onChange={(e) => (reservation.guests = e.target.value)}
                      />
                      <input
                        type="text"
                        defaultValue={reservation.details}
                        onChange={(e) => (reservation.details = e.target.value)}
                      />
                      <input
                        type="date"
                        defaultValue={reservation.day}
                        onChange={(e) => (reservation.day = e.target.value)}
                      />
                      <input
                        type="time"
                        defaultValue={reservation.time}
                        onChange={(e) => (reservation.time = e.target.value)}
                      />
                      <button onClick={() => handleSaveEdit(index, reservation)}>Save</button>
                      <button onClick={() => setEditingIndex(null)}>Cancel</button>
                    </div>

                  ) : (
                    <div>
                        <div className="cards__times">
                          <p className="cards__times__day">{reservation.day}</p>
                          <p className="cards__times__time">{reservation.time}</p>
                      </div>
                        <div className="cards__header">
                          <p className="cards__header__name"><strong>Name:</strong> {reservation.name}</p>
                          <div className="cards__header__buttons">
                            <button onClick={() => handleCancel(index)}>Cancel</button>
                            <button onClick={() => setEditingIndex(index)}>Edit</button>
                          </div>
                          <p className="cards__header__guests"><strong>Guests:</strong> {reservation.guests}</p>
                          <p className="cards__header__details"><strong>Details:</strong> {reservation.details}</p>
                        </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="reservations__layout__cancellations">
          <h4 className="cancellations__title">Cancellations</h4>
          <ul className="cancellations__ul">
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
        </section>

      </div>
    </>
  )
}

export default Reservations;
