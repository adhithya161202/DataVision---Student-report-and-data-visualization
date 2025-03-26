import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login.js';
import Registration from './Pages/Registration.js';
import Dashboard from './Pages/Dashboard.js';
import Preferences from './Pages/Account.js';
import Placement from './Pages/Placement.js';
import Publications from './Pages/Publications.js';
import Events from './Pages/Events.js';
import Societies from './Pages/Societies.js';
import Account from './Pages/Account.js';



import Contact from './Pages/Contact.js';






function App() {
  return (
    <>
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={
            <>   
              <Login />
            </>
          } />
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/Registration" element={<Registration/>} />
          <Route path="/Dashboard" element={<Dashboard/>} />
          <Route path="/Preferences" element={<Preferences/>} />
          <Route path="/Placement" element={<Placement />} />
          <Route path="/events" element={<Events/>} />
          <Route path="/publications" element={<Publications/>} />
          <Route path="/Societies" element={<Societies/>} />
          <Route path="/Contact" element={<Contact/>} />
          <Route path="/Account" element={<Account/>} />
        </Routes>
      </Router>
    </div>
    </>
  );
}

export default App;




