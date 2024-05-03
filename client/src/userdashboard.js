import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./userdashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExchangeAlt,
  faChevronLeft,
  faChevronRight,
  faArrowUp,
  faArrowDown,
  faRandom,
} from "@fortawesome/free-solid-svg-icons";
import { Bar, Pie } from "react-chartjs-2";
import Chart from "chart.js/auto"; // Import Chart.js library

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [depamount, setdepAmount] = useState("");
  const [accountno, setaccountNo] = useState("");
  const [depositSuccess, setDepositSuccess] = useState(false);
  const [showDepositForm, setShowDepositForm] = useState(false);
  const [accno, setaccNo] = useState("");
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);
  const [showWithdrawForm, setShowWithdrawForm] = useState(false);
  const [withamount, setwithAmount] = useState("");
  const [transferSuccess, setTransferSuccess] = useState(false);
  const [showTransferForm, setShowTransferForm] = useState(false);
  const [transamount, settransAmount] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(2);
  const [transactions, setTransactions] = useState([]);
  const [showTransactions, setShowTransactions] = useState(false);
  const [monthlyData, setMonthlyData] = useState(null);
  const [overallCounts, setOverallCounts] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [recno, setrecNo] = useState("");

  // Logic to paginate transactions
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // // Fetch transactions when userData changes or component mounts
  // useEffect(() => {
  //   if (userData) {
  //     Axios.get(`http://localhost:3001/transactions/${userData.accountno}`)
  //       .then((response) => {
  //         setTransactions(response.data);
  //         setCurrentPage(1);
  //         // setShowTransactions(true);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching transactions:", error);
  //         setError(
  //           "Error fetching transaction history. Please try again later."
  //         );
  //       });
  //   }
  // }, [userData]);

  // Fetch monthly transaction data and overall counts when userData changes
  useEffect(() => {
    if (userData) {
      // Fetch monthly transaction data
      Axios.get(
        `http://localhost:3001/monthly-transactions/${userData.accountno}`
      )
        .then((response) => {
          setMonthlyData(response.data);
        })
        .catch((error) => {
          setError("Error fetching monthly transaction data.");
        });

      // Fetch overall transaction counts
      Axios.get(
        `http://localhost:3001/overall-transaction-counts/${userData.accountno}`
      )
        .then((response) => {
          setOverallCounts(response.data);
        })
        .catch((error) => {
          setError("Error fetching overall transaction counts.");
        });
    }
  }, [userData]);

  const handleViewTransactions = () => {
    Axios.get(`http://localhost:3001/transactions/${userData.accountno}`)
      .then((response) => {
        setTransactions(response.data);

        setShowTransactions(true);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
        setError("Error fetching transaction history. Please try again later.");
      });
  };

  // const handleViewTransactions = () => {
  //   console.log("Recipient Account Number:", accnum);
  //   Axios.get(`http://localhost:3001/transactions/${userData.accountno}`)
  //     .then((response) => {
  //       const updatedTransactions = response.data.map((transaction) => {
  //         // Check if the transaction type is 'transfer'
  //         if (transaction.type === "transfer") {
  //           // Update the transaction object to include recipient account number
  //           return {
  //             ...transaction,
  //             recipientAccNum: transaction.recipientAccNum, // Corrected to use 'recipientAccNum' field
  //           };
  //         } else {
  //           return transaction;
  //         }
  //       });
  //       // Update state with the updated transactions
  //       setTransactions(updatedTransactions);

  //       setShowTransactions(true);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching transactions:", error);
  //       setError("Error fetching transaction history. Please try again later.");
  //     });
  // };

  // const handleViewTransactions = () => {
  //   Axios.get(`http://localhost:3001/transactions/${userData.accountno}`)
  //     .then((response) => {
  //       const updatedTransactions = response.data.map((transaction) => {
  //         if (transaction.type === "transfer") {
  //           return {
  //             ...transaction,
  //             recipientAccNum: transaction.recipientAccNum,
  //           };
  //         } else {
  //           return transaction;
  //         }
  //       });
  //       setTransactions(updatedTransactions);
  //       setShowTransactions(true);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching transactions:", error);
  //       setError("Error fetching transaction history. Please try again later.");
  //     });
  // };

  // const handleViewTransactions = () => {
  //   Axios.get(`http://localhost:3001/transactions/${userData.accountno}`)
  //     .then((response) => {
  //       console.log("Raw API Response:", response.data);

  //       const updatedTransactions = response.data.map((transaction) => {
  //         if (transaction.type === "transfer") {
  //           console.log("Processing Transfer Transaction:", transaction);
  //           // Update the transaction object to include recipient account number
  //           return {
  //             ...transaction,
  //             recipientAccNum: transaction.recipientAccNum,
  //           };
  //         } else {
  //           return transaction;
  //         }
  //       });

  //       console.log("Updated Transactions:", updatedTransactions);

  //       setTransactions(updatedTransactions);
  //       setShowTransactions(true);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching transactions:", error);
  //       setError("Error fetching transaction history. Please try again later.");
  //     });
  // };

  const handleLogin = () => {
    Axios.post("http://localhost:3001/userlogin", {
      username: username,
      password: password,
    })
      .then((response) => {
        const { userData } = response.data;
        setUserData(userData);
        setError(null); // Clear any previous errors
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        setError("Invalid username or password. Please try again.");
        setUserData(null); // Clear user data in case of error
      });
  };

  const handleLogout = () => {
    setUserData(null);
    setUsername("");
    setPassword("");
  };

  // const handleViewUserData = () => {
  //     Axios.post("http://localhost:3001/user-data", {
  //         username: userData.name,
  //         password: userData.password
  //     })
  //     .then((response) => {
  //         const { userData } = response.data; // Corrected from response.data.userData
  //         setUserData(userData);
  //         setError(null); // Clear any previous errors
  //     })
  //     .catch((error) => {
  //         console.error("Error fetching user data:", error);
  //         setError('Error fetching user data. Please try again later.');
  //         setUserData(null); // Clear user data in case of error
  //     });
  // };

  const handleDepositButtonClick = () => {
    // Show deposit form when "Deposit Money" button is clicked
    setShowDepositForm(true);
  };

  const handleDeposit = () => {
    Axios.post("http://localhost:3001/deposit", {
      accountno: accountno,
      depamount: depamount,
    })
      .then((response) => {
        const updatedBalance = response.data.balance;
        setUserData({ ...userData, balance: updatedBalance });
        setDepositSuccess(true);
        setaccountNo("");
        setdepAmount("");
        setError(null);
      })
      .catch((error) => {
        console.error("Error depositing money:", error);
        setError("Error depositing money. Please try again later.");
      });
  };

  const handlewithdrawButtonClick = () => {
    // Show deposit form when "Deposit Money" button is clicked
    setShowWithdrawForm(true);
  };

  const handleWithdraw = () => {
    Axios.post("http://localhost:3001/withdraw", {
      accno: accno,
      withamount: withamount,
    })
      .then((response) => {
        // Extract the updated balance from the response
        const updatedBalance = response.data.balance;
        // Update the userData state with the new balance
        setUserData({ ...userData, balance: updatedBalance });
        // Set the withdrawal success flag
        setWithdrawSuccess(true);
        // Optionally, reset the form fields
        setaccNo("");
        setwithAmount("");
        // Clear any previous errors
        setError(null);
      })
      .catch((error) => {
        console.error("Error withdrawing money:", error);
        // Update the error state with the error message
        setError("Error withdrawing money. Please try again later.");
      });
  };

  const handletransferButtonClick = () => {
    // Show deposit form when "Deposit Money" button is clicked
    setShowTransferForm(true);
  };

  // const handleTransfer = () => {
  //   Axios.post("http://localhost:3001/transfer", {
  //     senderAccNum: userData.accountno, // Assuming the sender's account number is in the user data
  //     recipientAccNum: recipientAccNum,
  //     transamount: transamount,
  //   })
  //     .then((response) => {
  //       const updatedBalance = response.data.balance;
  //       setUserData({ ...userData, balance: updatedBalance });
  //       setTransferSuccess(true);
  //       setrecipientAccNum("");
  //       settransAmount("");
  //       setError(null);
  //       handleViewTransactions(); // This will re-fetch and update the transaction list
  //     })
  //     .catch((error) => {
  //       console.error("Error transferring money:", error);
  //       setError("Error transferring money. Please try again later.");
  //     });
  // };

  const handleTransfer = () => {
    Axios.post("http://localhost:3001/transfer", {
      senderAccNum: userData.accountno,
      recno: recno,
      transamount: transamount,
    })
      .then((response) => {
        const updatedBalance = response.data.balance;
        setUserData({ ...userData, balance: updatedBalance });
        setTransferSuccess(true);
        setrecNo("");
        settransAmount("");
        setError(null);
      })
      .catch((error) => {
        setError("Error transferring money. Please try again later.");
      });
  };

  // Define a function to render the chart
  const renderChart = () => {
    const canvas = document.getElementById("myChart");
    if (!canvas) {
      console.error("Canvas element not found.");
      return;
    }
    const ctx = canvas.getContext("2d");

    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["January", "February", "March", "April", "May"],
        datasets: [
          {
            label: "Sales",
            data: [10, 20, 30, 40, 50],
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  useEffect(() => {
    renderChart();
  }, []);

  // Fetch monthly transaction data and overall counts when userData changes
  useEffect(() => {
    if (userData) {
      // Fetch monthly transaction data
      Axios.get(
        `http://localhost:3001/monthly-transactions/${userData.accountno}`
      )
        .then((response) => {
          setMonthlyData(response.data);
        })
        .catch((error) => {
          setError("Error fetching monthly transaction data.");
        });

      // Fetch overall transaction counts
      Axios.get(
        `http://localhost:3001/overall-transaction-counts/${userData.accountno}`
      )
        .then((response) => {
          setOverallCounts(response.data);
        })
        .catch((error) => {
          setError("Error fetching overall transaction counts.");
        });
    }
  }, [userData]);

  useEffect(() => {
    // Call renderChart when the component mounts
    renderChart();
  }, []); // Empty dependency array ensures this effect runs once after th

  // Example usage: call renderChart with appropriate data
  const chartData = {
    labels: ["January", "February", "March", "April"],
    values: [200, 300, 400, 500],
  };
  renderChart(chartData);

  // Fetch monthly transaction data for the selected month and year
  const fetchMonthlyTransactionData = () => {
    {
      Axios.get(
        `http://localhost:3001/monthly-transactions/${selectedYear}/${selectedMonth}`
      )
        .then((response) => {
          setMonthlyData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching monthly transaction data:", error);
        });
    }
  };

  // Handle form submission to fetch monthly data
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchMonthlyTransactionData();
  };

  // Dropdown options for months and years
  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const years = [
    { value: "2022", label: "2022" },
    { value: "2023", label: "2023" },
    { value: "2024", label: "2024" },
    // Add more years as needed
  ];

  return (
    <div>
      <h1>User Panel</h1>
      {!userData ? (
        <div className="user-panel">
          <div className="form-group">
            <label>
              Name:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
          </div>
          <br />
          <div className="form-group">
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <br />

          <button onClick={handleLogin}>Login</button>

          {error && (
            <p
              className={
                error.includes("Invalid") ? "error-red" : "error-black"
              }
            >
              {error}
            </p>
          )}
        </div>
      ) : (
        <div>
          <div className="user-details">
            {userData && (
              <>
                <p>Accountno: {userData.accountno}</p>
                <p>Balance: ${userData.balance}</p>
              </>
            )}
          </div>

          <div className="user-action-boxes">
            <div className="user-action-box" onClick={handleDepositButtonClick}>
              <h3>Deposit Money</h3>

              <div className="form-container">
                <label>Account Number:</label>
                <input
                  type="text"
                  value={accountno}
                  onChange={(e) => setaccountNo(e.target.value)}
                />
                <br />
                <label>Deposit Amount:</label>
                <input
                  type="text"
                  value={depamount}
                  onChange={(e) => setdepAmount(e.target.value)}
                />
                <br />
                <button onClick={handleDeposit}>Deposit</button>
                {depositSuccess && <p>Deposit successful!</p>}
                {error && (
                  <p
                    className={
                      error.includes("Invalid") ? "error-red" : "error-black"
                    }
                  >
                    {error}
                  </p>
                )}
              </div>
            </div>
            <div
              className="user-action-box"
              onClick={handlewithdrawButtonClick}
            >
              <h3>Withdraw Money</h3>

              <div className="form-container">
                <label>Account Number:</label>
                <input
                  type="text"
                  value={accno}
                  onChange={(e) => setaccNo(e.target.value)}
                />
                <br />
                <label>Withdraw Amount:</label>
                <input
                  type="text"
                  value={withamount}
                  onChange={(e) => setwithAmount(e.target.value)}
                />
                <br />
                <button onClick={handleWithdraw}>Withdraw</button>
                {withdrawSuccess && <p>Withdraw successful!</p>}
                {error && (
                  <p
                    className={
                      error.includes("Invalid") ? "error-red" : "error-black"
                    }
                  >
                    {error}
                  </p>
                )}
              </div>
            </div>
            <div
              className="user-action-box"
              onClick={handletransferButtonClick}
            >
              <h3>Transfer Money</h3>
              <h4>Sender Account No: {userData.accountno}</h4>
              <div className="form-container">
                <label>Account Number:</label>
                <input
                  type="text"
                  value={recno}
                  onChange={(e) => setrecNo(e.target.value)}
                />
                <br />
                <label>Transfer Amount:</label>
                <input
                  type="text"
                  value={transamount}
                  onChange={(e) => settransAmount(e.target.value)}
                />
                <br />
                <button onClick={handleTransfer}>Transfer</button>
                {transferSuccess && <p>Transfer successful!</p>}
                {error && (
                  <p
                    className={
                      error.includes("Invalid") ? "error-red" : "error-black"
                    }
                  >
                    {error}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="transaction-tab" onClick={handleViewTransactions}>
            <h3>Transactions</h3>
          </div>
          {showTransactions && (
            <div className="transactions">
              <ul className="transaction-list">
                {currentTransactions.map((transaction, index) => (
                  <li key={index} className="transaction-item">
                    <div className="transaction-icon">
                      {/* Use appropriate icon based on transaction type */}
                      {transaction.type === "deposit" && (
                        <FontAwesomeIcon icon={faArrowUp} />
                      )}
                      {transaction.type === "withdraw" && (
                        <FontAwesomeIcon icon={faArrowDown} />
                      )}
                      {transaction.type === "transfer" && (
                        <FontAwesomeIcon icon={faRandom} />
                      )}
                    </div>
                    <div className="transaction-details">
                      <p className="trans-no">
                        <strong>Account No:</strong>
                        {transaction.accountno}
                      </p>
                      <p className="transaction-amount">
                        <strong>$</strong> {transaction.amount}
                      </p>
                      <p className="transaction-type">
                        <strong></strong> {transaction.type}
                      </p>
                      <p className="trans-date">
                        {" "}
                        {new Date(transaction.date).toLocaleDateString(
                          "en-US",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <div>
                <button
                  className="page-button"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button
                  className="page-button"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentTransactions.length < transactionsPerPage}
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>

              {/* Bar Graph */}
              {overallCounts && (
                <div id="container">
                  <div className="graph-container">
                    <h2>Overall Transaction Counts</h2>
                    <div id="graph">
                      <Bar
                        data={{
                          labels: ["Deposit", "Withdrawal", "Transfer"],

                          datasets: [
                            {
                              label: "Total Transactions",
                              data: [
                                overallCounts.deposit,
                                overallCounts.withdrawal,
                                overallCounts.transfer,
                              ],
                              backgroundColor: [
                                "#36A2EB",
                                "#FF6384",
                                "#FFCE56",
                              ],
                              fontColor: ["#FFFFF"],
                            },
                          ],
                        }}
                        // options={{
                        //   scales: {
                        //     yAxes: [
                        //       {
                        //         ticks: {
                        //           beginAtZero: true,
                        //           stepSize: 1,

                        //         },
                        //       },
                        //     ],
                        //   },
                        // }}
                        options={{
                          plugins: {
                            legend: {
                              labels: {
                                color: "white", // Set legend label font color
                              },
                            },
                          },
                          scales: {
                            x: {
                              ticks: {
                                color: "white", // Set x-axis label font color
                              },
                            },
                            y: {
                              ticks: {
                                beginAtZero: true,
                                stepSize: 1,
                                color: "white", // Set y-axis label font color
                              },
                            },
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* <form onSubmit={handleSubmit}>
                <label>Select Month:</label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                >
                  <option value="">-- Select Month --</option>
                  {months.map((month) => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </select>
                <label>Select Year:</label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  <option value="">-- Select Year --</option>
                  {years.map((year) => (
                    <option key={year.value} value={year.value}>
                      {year.label}
                    </option>
                  ))}
                </select>
                <button type="submit">Fetch Monthly Data</button>
              </form> */}

              {/* Pie Chart */}
              {monthlyData && (
                <div id="pie-chart-container">
                  <h2>Monthly Transaction Summary</h2>
                  <div id="pie-chart">
                    <Pie
                      data={{
                        labels: ["Deposit", "Withdrawal", "Transfer"],
                        datasets: [
                          {
                            label: "Monthly Transactions",
                            data: [
                              monthlyData.deposit,
                              monthlyData.withdrawal,
                              monthlyData.transfer,
                            ],
                            backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
                          },
                        ],
                      }}
                      options={{
                        plugins: {
                          legend: {
                            labels: {
                              color: "white",
                            },
                          },
                        },
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Display error message if there's an error */}
              {error && <p>{error}</p>}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
