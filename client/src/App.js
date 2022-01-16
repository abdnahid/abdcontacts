import './App.css';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alerts from './components/layout/Alert'
import setAuthToken from './utils/setAuthToken';
import PrivateOutlet from './components/routing/PrivateOutlet';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <div className="App">
              <Navbar title="Personal Contact Keeper" />
              <div className="container">
                <Alerts />
                <Routes>
                  <Route path="/*" element={<PrivateOutlet />}>
                    <Route path="" element={<Home />} />
                  </Route>
                  <Route exact path="/about" element={<About />} />
                  <Route exact path="/register" element={<Register />} />
                  <Route exact path="/login" element={<Login />} />
                </Routes>
              </div>
            </div>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;
