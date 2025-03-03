import './App.css'
import { useState } from 'react';
import Reservations from './Reservations.jsx'
import Overview from './Overview.jsx'

function App() {
  const [activeSection, setActiveSection] = useState('reservations');

  // ✅ Store reservation data in state
  const [reservationData, setReservationData] = useState({
    name: '',
    guests: '',
    details: '',
    day: '',
    time: ''
  });

  return (
    <>
      <h1>Restaurant Dashboard</h1>
      <nav className="nav">
        <h2 className="hidden">Main Navigation</h2>
        <button onClick={() => setActiveSection('reservations')}>Reservations</button>
        <button onClick={() => setActiveSection('overview')}>Overview</button>
      </nav>

      {activeSection === 'reservations' && (
        <Reservations
          name={reservationData.name}
          guests={reservationData.guests}
          details={reservationData.details}
          day={reservationData.day}
          time={reservationData.time}
        />
      )}

      {activeSection === 'overview' && <Overview />}
    </>
  );
}

export default App;
