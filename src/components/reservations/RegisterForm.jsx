function RegisterForm({ setReservations }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const guests = parseInt(e.target.guests.value, 10);

    const newReservation = {
      name: e.target.name.value,
      guests: guests,
      details: e.target.details.value,
      day: e.target.day.value,
      time: e.target.time.value,
    };

    setReservations((prev) => [newReservation, ...prev]);

    alert(
      `Reservation added:\nName: ${newReservation.name}\nGuests: ${newReservation.guests}\nDetails: ${newReservation.details || "None"}\nDate: ${newReservation.day}\nTime: ${newReservation.time}`
    );

    e.target.reset();

    

    if (isNaN(guests) || guests < 1 || guests > 25) {
      alert("Please enter a valid number of guests (1 to 25).");
      return;
    }
  };

  return (
   
      <form onSubmit={handleSubmit} className="reservations__layout__reserved__form">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" required />

        
          <label htmlFor="guests">Guests (max 25)</label>
          <input type="number" id="guests" required max="25" />

        
          <label htmlFor="details">Details</label>
          <input type="text" id="details" />

        
          <label htmlFor="day">Day</label>
          <input type="date" id="day" required />

        
          <label htmlFor="time">Time</label>
          <input type="time" id="time" required/>

        <button type="submit" className="submitButton">Register</button>
      </form>
  );
}

export default RegisterForm;
