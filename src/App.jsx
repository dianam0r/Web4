import './App.css'
import { useState } from 'react';
import Reservations from './Reservations.jsx'
import Overview from './Overview.jsx'

function App() {
  const [activeSection, setActiveSection] = useState('reservations');
  const reservationData = {
    name: "Melanie",
    guests: 4,
    details: "brings 2 children",
    day: "13 April",
    time: "8pm",
  };

  const { name, guests, details, day, time } = reservationData;

  return (
    <>
      <h1>Restaurant Dashboard</h1>
      <nav>
        <button onClick={() => setActiveSection('reservations')}>Reservations</button>
        <button onClick={() => setActiveSection('overview')}>Overview</button>
      </nav>
    
      {activeSection === 'reservations' && <Reservations name={name} guests={guests} details={details} day={day} time={time} />}
        {activeSection === 'overview' && <Overview />}
     
    </>
  )
}

export default App
