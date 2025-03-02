function RegisterForm({ setReservations }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const newReservation = {
      name: e.target.name.value,
      guests: parseInt(e.target.guests.value, 10) || "",
      details: e.target.details.value,
      day: e.target.day.value,
      time: e.target.time.value,
    };

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
    </div>
  );
}

export default RegisterForm;
