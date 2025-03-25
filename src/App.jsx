import './App.css'
import { useState } from 'react';
import Reservations from './components/reservations/Reservations.jsx'
import Overview from './components/overview/Overview.jsx'

function App() {
  const [activeSection, setActiveSection] = useState('reservations');

  return (
    <>
      <div className='dashboard'>
        <div className="dashboard__menu">
          <h1 className="dashboard__menu__title">Restaurant Dashboard</h1>
          <nav className="dashboard__menu__nav">
            <h2 className="dashboard__menu__nav__title hidden">Main Navigation</h2>
            <button onClick={() => setActiveSection('reservations')}>Reservations</button>
            <button onClick={() => setActiveSection('overview')}>Overview</button>
            <button onClick={() => setActiveSection('joke')}>New Feature!</button>
          </nav>
        </div>

          {activeSection === 'reservations' && (
          <article className="dashboard__reservations">
            <h3 className='hidden'>Reservations</h3>
            <Reservations setActiveSection={setActiveSection} />
            </article>)}
          {activeSection === 'overview' && (
          <article className="dashboard__overview">
            <Overview />
          </article>)}
          {activeSection === 'joke' && (
            <section className="dashboard__section__joke">
              <h3>🎤 Joke of the Day Discount</h3>
              <p>
                Add some laughter to the menu! If a customer calls in and shares a holiday-themed joke.
                Think Christmas, Halloween, Thanksgiving, or any seasonal celebration — they’ll receive a
                discount on their meal. Their joke can be recorded (with permission) and featured in the
                restaurant, bringing smiles to other guests too. It’s a tasty way to reward humor and create
                a fun, memorable dining experience.
              </p>
            </section>
          )}
      </div>
    </>
  );
}

export default App;
