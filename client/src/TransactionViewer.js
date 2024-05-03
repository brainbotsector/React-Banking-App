import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import "./TransactionViewer.css";

const TransactionViewer = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = () => {
    Axios.get(`http://localhost:3001/transactions`)
        .then((response) => {
            setTransactions(response.data);
        })
        .catch((error) => {
            console.error("Error fetching transactions:", error);
        });
  };

  return (
    <div className="transaction-viewer">
      <h2>Transaction History</h2>
      <ul className="transaction-list">
        {transactions.map((transaction, index) => (
          <li key={index} className="transaction-item">
            <FontAwesomeIcon icon={faExchangeAlt} className="transaction-icon" />
            <div className="transaction-details">
              <p><strong>Account Number:</strong> {transaction.accountno}</p>
              <p><strong>Amount:</strong> {transaction.amount}</p>
              <p><strong>Type:</strong> {transaction.type}</p>
              <p><strong>Date:</strong> {transaction.date}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionViewer;
