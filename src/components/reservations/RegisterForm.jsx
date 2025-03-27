function RegisterForm({ setReservations }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const guests = parseInt(e.target.guests.value, 10);
    const newReservation = {
      name: e.target.name.value,
      guests: guests,
      details: e.target.details.value,
      allergies: e.target.allergies.value,
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
          <label>Name</label>
      <input type="text" id="name" required placeholder="Maria Jocefina" />

        
          <label>Number of Guests (max 25)</label>
      <input type="number" id="guests" required max="25"  />

        
          <label>Details</label>
      <input type="text" id="details" placeholder="I bring two children" />

        
          <label>Day</label>
          <input type="date" id="day" required min={new Date().toISOString().split("T")[0]} />


        
          <label >Time</label>
          <select id="time" required>
            <option value="">-- Select Time --</option>
            <optgroup label="Lunch">
              <option value="12:00">12:00</option>
              <option value="12:30">12:30</option>
              <option value="13:00">13:00</option>
              <option value="13:30">13:30</option>
              <option value="14:00">14:00</option>
            </optgroup>
            <optgroup label="Dinner">
              <option value="18:00">18:00</option>
              <option value="18:30">18:30</option>
              <option value="19:00">19:00</option>
              <option value="19:30">19:30</option>
              <option value="20:00">20:00</option>
              <option value="20:30">20:30</option>
              <option value="21:00">21:00</option>
              <option value="21:30">21:30</option>
            </optgroup>
          </select>

          <label >Allergies</label>
          <input type="text" id="allergies" placeholder="e.g. nuts, gluten" />


        <button type="submit" className="submitButton">Register</button>
      </form>
  );
}

export default RegisterForm;
