import './Reservations.css'
import RegisterForm from './RegisterForm.jsx'

function Reservations({ name, guests, details, day, time }) {
  

  return (
    <>
      <div className="reservations">
        <ul className="reserved__days">
          <li><button>1 Today</button></li>
          <li><button>2 Tomorrow</button></li>
          <li><button>3 Wednesday</button></li>
        </ul>
        <div className="reservations__reserved">
        
          <ul className="reserved__cards">
            <li>
              <div className="cards__flex">
                <div>
                  <p className="cards__flex__day"> {day}</p>
                  <p className="cards__flex__time"> {time}</p>
                </div>
                <div>
                  <p> <strong>Name:</strong>{name}</p>
                  <p> <strong>Guests:</strong>{guests}</p>
                  <p> <strong>Details:</strong> {details}</p>
                </div>
                <div>
                  <button>Arrived</button>
                  <button>Cancel</button>
                  <button>Edit</button>
                </div>
              </div>
            </li>
          </ul>
          <button>+</button>
          <RegisterForm/>
        </div>
        <p className="reserved__cancellations_title">Cancellations</p>
        <div className="reservations__cancellations">
          
          <ul className="reserved__cards">
            <li>
              <div className="cards__flex">
                <div>
                  <p className="cards__flex__day"> 13 April</p>
                  <p className="cards__flex__time"> 8pm</p>
                </div>
                <div>
                  <p> <strong>Name:</strong>Melanie</p>
                  <p> <strong>Guests:</strong> 4</p>
                  <p> <strong>Details:</strong> 2 children</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <p>PLUS</p>
      </div>
    </>
  )
}

export default Reservations
