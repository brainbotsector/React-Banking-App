import React, { useState } from 'react';
import Axios from 'axios';
import "./App.css";

const Userpanel = ({ loggedIn, setLoggedIn }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await Axios.post('http://localhost:3001/userlogin', {
        username: name,
        password: password,
      });
      setLoggedIn(true);
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Login failed. Please check your credentials.');
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  if (!loggedIn) {
    return (
      <div className="user-panel">
        <h1>User Panel</h1>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit">Login</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    );
  }
  
  return (
    <div className="user-panel">
      <h1>Welcome, {name}!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Userpanel;



// const UserDashboard = () => {
//   const [userData, setUserData] = useState(null);
//   const [error, setError] = useState(null);
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [depamount, setdepAmount] = useState('');
//   const [accountno, setaccountNo] = useState('');
//   const [depositSuccess, setDepositSuccess] = useState(false);
//   const [showDepositForm, setShowDepositForm] = useState(false);
//   const [accno, setaccNo] = useState('');
//   const [withdrawSuccess, setWithdrawSuccess] = useState(false);
//   const [showWithdrawForm, setShowWithdrawForm] = useState(false);
//   const [withamount, setwithAmount] = useState('');
//   const [accnum, setaccNum] = useState('');
//   const [transferSuccess, setTransferSuccess] = useState(false);
//   const [showTransferForm, setShowTransferForm] = useState(false);
//   const [transamount, settransAmount] = useState('');