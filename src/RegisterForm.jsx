import { useState, useEffect } from "react";

function RegisterForm() {
  const [reservations, setReservations] = useState(() => {
    // get them or just start w empty array
    const savedReservations = localStorage.getItem("reservations");
    return savedReservations ? JSON.parse(savedReservations) : [];
  });

  // useEffect -> React Hook that allows you to run code when something happens in your component
  useEffect(() => {
    // setItem every time we update reservations
    localStorage.setItem("reservations", JSON.stringify(reservations));
  }, [reservations]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newReservation = {
      name: e.target.name.value,
      guests: parseInt(e.target.guests.value, 10) || "",
      details: e.target.details.value,
      day: e.target.day.value,
      time: e.target.time.value,
    };

    // goes to local storage
    setReservations((prev) => [...prev, newReservation]);

    e.target.reset();
  };

  return (
    <div>
      <h2>Reservation Form</h2>

      <form onSubmit={handleSubmit} className="reservation-form">
        <div className="inputGroup">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" required />
        </div>

        <div className="inputGroup">
          <label htmlFor="guests">Guests</label>
          <input type="number" id="guests" required />
        </div>

        <div className="inputGroup">
          <label htmlFor="details">Details</label>
          <input type="text" id="details" />
        </div>

        <div className="inputGroup">
          <label htmlFor="day">Day</label>
          <input type="date" id="day" required />
        </div>

        <div className="inputGroup">
          <label htmlFor="time">Time</label>
          <input type="time" id="time" required />
        </div>

        <button type="submit" className="submitButton">Register</button>
      </form>

      {reservations.length > 0 && (
        <div className="confirmation">
          <h3>Reservations List</h3>
          <ul>
            {reservations.map((res, index) => (
              <li key={index} className="reservation-item">
                <div className="cards__flex">
                  <div>
                    <p className="cards__flex__day">{res.day}</p>
                    <p className="cards__flex__time">{res.time}</p>
                  </div>
                  <div>
                    <p><strong>Name:</strong> {res.name}</p>
                    <p><strong>Guests:</strong> {res.guests}</p>
                    <p><strong>Details:</strong> {res.details}</p>
                  </div>
                  <div>
                    <button>Arrived</button>
                    <button>Cancel</button>
                    <button>Edit</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default RegisterForm;
