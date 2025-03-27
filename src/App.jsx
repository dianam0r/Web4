import './App.css'
import { useState, useEffect } from 'react';
import Reservations from './components/reservations/Reservations.jsx'
import Overview from './components/overview/Overview.jsx'

function App() {
  const [activeSection, setActiveSection] = useState('reservations');
  const [incomingReservation, setIncomingReservation] = useState(null);

  const [jokes, setJokes] = useState(() => {
    const jokesStored = localStorage.getItem('jokes');
    return jokesStored ? JSON.parse(jokesStored) : [];
  });
  const [themes, setThemes] = useState(() => {
    const themesStored = localStorage.getItem('themes');
    return themesStored ? JSON.parse(themesStored) : [];
  });

  useEffect(() => {
    localStorage.setItem('jokes', JSON.stringify(jokes));
  }, [jokes]);

  useEffect(() => {
    localStorage.setItem('themes', JSON.stringify(themes));
  }, [themes]);


  return (
    <>
      <div className='dashboard'>
        <div className="dashboard__menu">
          <h1 className="dashboard__menu__title">Table of Giggles</h1>
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
            <Reservations
              setActiveSection={setActiveSection}
              setIncomingReservation={setIncomingReservation}
            />
      {incomingReservation && (
        <>
          <div
            className="overview__incoming"
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData("text/plain", "incomingReservation");
            }}
          >
            <h4>Incoming Reservation</h4>
            <p><strong>Name:</strong> {incomingReservation.name}</p>
            <p><strong>Guests:</strong> {incomingReservation.guests}</p>
            <p><strong>Details:</strong> {incomingReservation.details}</p>
            <p><strong>Date:</strong> {incomingReservation.day}</p>
            <p><strong>Time:</strong> {incomingReservation.time}</p>
          </div>

          <p>Drag this reservation to a table</p>
        </>
      )}

            </article>)}
          {activeSection === 'overview' && (
          <article className="dashboard__overview">
            <Overview
              incomingReservation={incomingReservation}
              setIncomingReservation={setIncomingReservation}
              setJokes={setJokes}
              setThemes={setThemes}
            />

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

            {jokes.length > 0 && (
              <div className="section__joke__submitted">
                <h4>🎉 All Submitted Jokes:</h4>
                <ul>
                  {jokes.map((joke, i) => (
                    <li key={i}>
                      <p>
                        {joke}
                        {themes[i] && <span className="joke__submitted__theme strong"> — {themes[i]}</span>}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </section>
        )}


      </div>
    </>
  );
}

export default App;
