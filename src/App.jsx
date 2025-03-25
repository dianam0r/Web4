import './App.css'
import { useState } from 'react';
import Reservations from './Reservations.jsx'
import Overview from './Overview.jsx'

function App() {
  const [activeSection, setActiveSection] = useState('reservations');

  return (
    <>
      <div className='general'>
        <div className="main">
          <h1>Restaurant Dashboard</h1>
          <nav className="nav">
            <h2 className="hidden">Main Navigation</h2>
            <button onClick={() => setActiveSection('reservations')}>Reservations</button>
            <button onClick={() => setActiveSection('overview')}>Overview</button>
            <button onClick={() => setActiveSection('joke')}>New Feature!</button>
          </nav>
        </div>

        <div className="section">
          {activeSection === 'reservations' && <Reservations setActiveSection={setActiveSection} />}
          {activeSection === 'overview' && <Overview />}
          {activeSection === 'joke' && (
            <div className="joke_feature">
              <h2>🎤 Joke of the Day Discount</h2>
              <p>
                Add some laughter to the menu! If a customer calls in and shares a holiday-themed joke.
                Think Christmas, Halloween, Thanksgiving, or any seasonal celebration — they’ll receive a
                discount on their meal. Their joke can be recorded (with permission) and featured in the
                restaurant, bringing smiles to other guests too. It’s a tasty way to reward humor and create
                a fun, memorable dining experience.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
