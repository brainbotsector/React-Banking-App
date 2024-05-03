import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";

const AdminDashboard = ({ userData }) => {
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [showAllCustomers, setShowAllCustomers] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [customerTransactions, setCustomerTransactions] = useState([]);
  const [showTransactions, setShowTransactions] = useState(false);
  const [transactionsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [setTransactions] = useState(null); // Define setTransactions function

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = () => {
    Axios.get(`http://localhost:3001/transactions`)
      .then((response) => {
        setCustomerTransactions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  };

  useEffect(() => {
    if (userData) {
      Axios.get(`http://localhost:3001/transactions/${userData.accountno}`)
        .then((response) => {
          setTransactions(response.data);
          setCurrentPage(1);
          // setShowTransactions(true);
        })
        .catch((error) => {
          console.error("Error fetching transactions:", error);
        });
    }
  }, [userData]);

  const handleCreateAccountClick = () => {
    setShowCreateAccount(true);
    setShowAllCustomers(false);
    setShowTransactions(false);
  };

  const handleViewAllCustomersClick = () => {
    setShowAllCustomers(true);
    setShowCreateAccount(false);
    setShowTransactions(false);
  };

  const handleViewTransactionsClick = () => {
    setShowTransactions(true);
    setShowCreateAccount(false);
    setShowAllCustomers(false);
  };

  // Pagination Logic
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = customerTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const nextPage = () => {
    if (indexOfLastTransaction < customerTransactions.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    if (showAllCustomers) {
      Axios.get("http://localhost:3001/customers")
        .then((response) => {
          setCustomers(response.data);
        })
        .catch((error) => {
          console.error("Error fetching customers:", error);
        });
    }
  }, [showAllCustomers]);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div className="tabs-admin">
        <button onClick={handleViewAllCustomersClick}>View All Users</button>
        <button onClick={handleCreateAccountClick}>
          Create Account of Users
        </button>

        <button onClick={handleViewTransactionsClick}>View Transactions</button>
      </div>
      {showCreateAccount && <CreateAccount />}
      {showAllCustomers && <AllCustomers customers={customers} />}
      {showTransactions && (
        <div>
          <h2>Transactions</h2>
          {currentTransactions.length > 0 && (
            <>
              <div className="table-container">
                <table className="transactions-table">
                  <thead>
                    <tr>
                      <th className="column-header">Sender Account No</th>
                      <th className="column-header">Receiver Account No</th>
                      <th className="column-header">Amount</th>
                      <th className="column-header">Type of Transaction</th>
                      <th className="column-header">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentTransactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <td className="transaction-data">
                          {transaction.sendAccNo}
                        </td>
                        <td className="transaction-data">
                          {transaction.accountno}
                        </td>
                        <td className="transaction-data">
                          {transaction.amount}
                        </td>
                        <td className="transaction-data">{transaction.type}</td>
                        <td className="transaction-data">{transaction.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="pagination" style={{ marginTop: "50px" }}>
                <button
                  style={{ height: "35px", width: "110px;", color: "purple" }}
                  onClick={prevPage}
                >
                  &#8249; Previous
                </button>
                <button
                  style={{ height: "35px", width: "140px;" }}
                  onClick={nextPage}
                >
                  Next &#8250;
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

const AllCustomers = ({ customers }) => {
  const handleUpdate = (customer_id) => {
    console.log("Update customer with ID:", customer_id);
  };
  const [currPage, setCurrPage] = useState(1); //  for  all customers pagination
  const [customersPerPage] = useState(10);

  const handleDelete = (customer_id) => {
    console.log("Delete customer with ID:", customer_id);
  };

  // Logic for pagination all Customers
  const indexOfLastCustomer = currPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = customers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );

  // Function to handle page navigation
  const pagination = (pageNumber) => {
    setCurrPage(pageNumber);
  };

  const next = () => {
    if (indexOfLastCustomer < customers.length) {
      setCurrPage(currPage + 1);
    }
  };

  const prev = () => {
    if (currPage > 1) {
      setCurrPage(currPage - 1);
    }
  };

  return (
    <div className="all-customers">
      <h2 className="customer-text">All Users</h2>
      <table>
        <thead>
          <tr>
            <th className="column-header">Name</th>
            <th className="column-header">Email</th>
            <th className="column-header">Account Number</th>
            <th className="column-header">Balance</th>
            <th className="column-header">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentCustomers.map((customer) => (
            <tr key={customer.customer_id}>
              <td className="customer-data">{customer.name}</td>
              <td className="customer-data">{customer.email}</td>
              <td className="customer-data">{customer.accountno}</td>
              <td className="customer-data">{customer.balance}</td>
              <td>
                <button
                  className="update-btn"
                  onClick={() => handleUpdate(customer.customer_id)}
                >
                  Update
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(customer.customer_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination" style={{ marginTop: "50px" }}>
        <button
          style={{ height: "35px", width: "110px;", color: "purple" }}
          onClick={prev}
        >
          &#8249; Previous
        </button>
        <button style={{ height: "35px", width: "140px;" }} onClick={next}>
          Next &#8250;
        </button>
      </div>
    </div>
  );
};

const CreateAccount = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [accountno, setAccountno] = useState("");
  const [password, setPassword] = useState("");
  const [balance, setBalance] = useState("");

  const handleCreateAccount = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/createAccount", {
      name: name,
      email: email,
      accountno: accountno,
      password: password,
      balance: balance,
    })
      .then((response) => {
        console.log(response.data);
        setName("");
        setEmail("");
        setAccountno("");
        setPassword("");
        setBalance("");
        // Reset the form
        e.target.reset();
        alert("Account created successfully.");
      })
      .catch((error) => {
        console.error("Error creating account:", error);
        alert("Error creating account. Please try again later.");
      });
  };

  return (
    <div className="container">
      <div className="createAccountForm">
        <form onSubmit={handleCreateAccount}>
          <div className="form-group">
            <label htmlFor="name">Name*</label>
            <input
              className="textInput"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email*</label>
            <input
              className="textInput"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="accountno">Account No*</label>
            <input
              className="textInput"
              type="number"
              name="accountno"
              value={accountno}
              onChange={(e) => setAccountno(e.target.value)}
              placeholder="Enter Account No"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password*</label>
            <input
              className="textInput"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="balance">Initial Balance*</label>
            <input
              className="textInput"
              type="number"
              name="balance"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              placeholder="Enter Initial Balance"
              required
            />
          </div>
          <input className="button" type="submit" value="Submit" />
        </form>
        <h1
          style={{
            color: "red",
            fontSize: "15px",
            textAlign: "center",
            marginTop: "20px",
          }}
        ></h1>
      </div>
    </div>
  );
};

export { AdminDashboard, CreateAccount };

// import React, { useState, useEffect } from "react";
// import Axios from "axios";
// import "./App.css";

// const AdminDashboard = () => {
//   const [showCreateAccount, setShowCreateAccount] = useState(false); // State to manage whether to show create account form or not
//   const [showAllCustomers, setShowAllCustomers] = useState(false);
//   const [customers, setCustomers] = useState([]);
//   const [customerTransactions, setCustomerTransactions] = useState([]); // State to store customer transactions
//   const [showTransactions, setShowTransactions] = useState(false); // State to manage whether to show transactions
//   const [transactions, setTransactions] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [transactionsPerPage] = useState(10);

//   useEffect(() => {
//     fetchTransactions();
//   }, []);

//   const fetchTransactions = () => {
//     Axios.get(`http://localhost:3001/transactions`)
//       .then((response) => {
//         setTransactions(response.data); // Update transactions state
//         setCustomerTransactions(response.data); // Update customerTransactions state
//       })
//       .catch((error) => {
//         console.error("Error fetching transactions:", error);
//       });
//   };

//   // Pagination Logic
//   const indexOfLastTransaction = currentPage * transactionsPerPage;
//   const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
//   const currentTransactions = transactions.slice(
//     indexOfFirstTransaction,
//     indexOfLastTransaction
//   );

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const handleCreateAccountClick = () => {
//     setShowCreateAccount(true); // Set state to true when create account button is clicked
//     setShowAllCustomers(false);
//     setShowTransactions(false);
//   };

//   const handleViewAllCustomersClick = () => {
//     setShowAllCustomers(true);
//     setShowCreateAccount(false); // Hide the create account section when view all customers button is clicked
//     setShowTransactions(false);
//   };

//   const handleViewTransactionsClick = () => {
//     setShowTransactions(true);
//     setShowCreateAccount(false);
//     setShowAllCustomers(false);
//   };

//   useEffect(() => {
//     if (showAllCustomers) {
//       // Fetch list of customers from the server
//       Axios.get("http://localhost:3001/customers")
//         .then((response) => {
//           setCustomers(response.data);
//         })
//         .catch((error) => {
//           console.error("Error fetching customers:", error);
//         });
//     }
//   }, [showAllCustomers]);

//   return (
//     <div>
//       <h2>Admin Dashboard</h2>
//       <div className="tabs-admin">
//         <button onClick={handleViewAllCustomersClick}>View All Users</button>
//         <button onClick={handleCreateAccountClick}>
//           Create Account of Users
//         </button>
//         <button onClick={handleViewTransactionsClick}>View Transactions</button>
//       </div>
//       {showCreateAccount && <CreateAccount />}
//       {showAllCustomers && <AllCustomers customers={customers} />}
//       {showTransactions && (
//         <div>
//           <h2>Transactions</h2>
//           <div className="table-container">
//             <table className="transactions-table">
//               <thead>
//                 <tr>
//                   <th className="column-header">Account Number</th>
//                   <th className="column-header">Type of Transaction</th>
//                   <th className="column-header">Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {customerTransactions.map((transaction) => (
//                   <tr key={transaction.id}>
//                     <td className="transaction-data">
//                       {transaction.accountno}
//                     </td>
//                     <td className="transaction-data">{transaction.type}</td>
//                     <td className="transaction-data">{transaction.date}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//         </div>
//       )}
//     </div>
//   );
// };

// // Pagination Component
// const Pagination = ({ transactionsPerPage, totalTransactions, paginate }) => {
//   const pageNumbers = [];

//   for (
//     let i = 1;
//     i <= Math.ceil(totalTransactions / transactionsPerPage);
//     i++
//   ) {
//     pageNumbers.push(i);
//   }

//   return (
//     <nav>
//       <ul className="pagination">
//         {pageNumbers.map((number) => (
//           <li key={number} className="page-item">
//             <a onClick={() => paginate(number)} href="#" className="page-link">
//               {number}
//             </a>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// };

// const AllCustomers = ({ customers }) => {
//   const handleUpdate = (customer_id) => {
//     // Implement update logic here
//     console.log("Update customer with ID:", customer_id);
//   };

//   const handleDelete = (customer_id) => {
//     // Implement delete logic here
//     console.log("Delete customer with ID:", customer_id);
//   };

//   return (
//     <div className="all-customers">
//       <h2 className="customer-text">All Users</h2>
//       <table>
//         <thead>
//           <tr>
//             <th className="column-header">Name</th>{" "}
//             {/* Apply a different class for column headers */}
//             <th className="column-header">Email</th>
//             <th className="column-header">Account Number</th>
//             <th className="column-header">Balance</th>
//             <th className="column-header">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {customers.map((customer) => (
//             <tr key={customer.customer_id}>
//               <td className="customer-data">{customer.name}</td>{" "}
//               {/* Apply a different class for customer data */}
//               <td className="customer-data">{customer.email}</td>
//               <td className="customer-data">{customer.accountno}</td>
//               <td className="customer-data">{customer.balance}</td>
//               <td>
//                 <button
//                   className="update-btn"
//                   onClick={() => handleUpdate(customer.customer_id)}
//                 >
//                   Update
//                 </button>
//                 <button
//                   className="delete-btn"
//                   onClick={() => handleDelete(customer.customer_id)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };
// const CreateAccount = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [accountno, setAccountno] = useState("");
//   const [password, setPassword] = useState("");
//   const [balance, setBalance] = useState("");

//   const handleCreateAccount = (e) => {
//     e.preventDefault();
//     Axios.post("http://localhost:3001/createAccount", {
//       name: name,
//       email: email,
//       accountno: accountno,
//       password: password,
//       balance: balance,
//     })
//       .then((response) => {
//         console.log(response.data);
//         // Clear the form fields by setting state values to empty strings
//         // setName("");
//         // setEmail("");
//         // setAccountno("");
//         // setPassword("");
//         // setBalance("");
//         e.target.reset();
//         // Display a success message
//         alert("Account created successfully.");
//       })
//       .catch((error) => {
//         console.error("Error creating account:", error);
//         // Display an error message if account creation fails
//         alert("Error creating account. Please try again later.");
//       });
//   };

//   return (
//     <div className="container">
//       <div className="createAccountForm">
//         <form onSubmit={handleCreateAccount}>
//           <div className="form-group">
//             <label htmlFor="name">Name*</label>
//             <input
//               className="textInput"
//               type="text"
//               name="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Enter Name"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="email">Email*</label>
//             <input
//               className="textInput"
//               type="email"
//               name="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter Email"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="accountno">Account No*</label>
//             <input
//               className="textInput"
//               type="number"
//               name="accountno"
//               value={accountno}
//               onChange={(e) => setAccountno(e.target.value)}
//               placeholder="Enter Account No"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="password">Password*</label>
//             <input
//               className="textInput"
//               type="password"
//               name="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter Password"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="balance">Initial Balance*</label>
//             <input
//               className="textInput"
//               type="number"
//               name="balance"
//               value={balance}
//               onChange={(e) => setBalance(e.target.value)}
//               placeholder="Enter Initial Balance"
//               required
//             />
//           </div>
//           <input
//             className="button"
//             type="submit"
//             value="Submit"
//             onChange={(e) => setBalance(e.target.reset)}
//           />
//         </form>
//         <h1
//           style={{
//             color: "red",
//             fontSize: "15px",
//             textAlign: "center",
//             marginTop: "20px",
//           }}
//         ></h1>
//       </div>
//     </div>

//     // <div className="container">
//     //   <div className="loginForm">
//     //     <h2>Create Account of Customers</h2>
//     //       <form onSubmit={handleCreateAccount}>
//     //       <input className="textInput" type="text" placeholder="Name" name="username" onChange={(e) => setName(e.target.value)} />
//     //       <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
//     //       <input type="number" placeholder="Accountno" onChange={(e) => setAccountno(e.target.value)} />
//     //       <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
//     //       <input type="number" placeholder="Initial Balance" onChange={(e) => setBalance(e.target.value)} />
//     //       <button type="submit" >Submit</button>
//     //       </form>
//     //   </div>
//     // </div>
//   );
// };

// export { AdminDashboard, CreateAccount };
