const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const con = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "register",
});

// Create a transactions table
con.query(
  `
    CREATE TABLE IF NOT EXISTS transactions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        sendAccNo VARCHAR(255) NOT NULL, 
        accountno VARCHAR(255) NOT NULL,
        type ENUM('deposit', 'withdraw', 'transfer') NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`,
  (err, result) => {
    if (err) {
      console.error("Error creating transactions table:", err);
    } else {
      console.log("Transactions table created successfully.");
    }
  }
);

// Endpoint to fetch transaction history for a specific account
app.get("/transactions/:accountno", (req, res) => {
  const accountno = req.params.accountno;

  // Fetch transaction history for the specified account
  con.query(
    "SELECT * FROM transactions WHERE accountno = ?",
    [accountno],
    (err, result) => {
      if (err) {
        console.error("Error fetching transaction history:", err);
        res.status(500).send({
          message: "An error occurred while fetching transaction history.",
        });
      } else {
        res.status(200).send(result);
      }
    }
  );
});

app.post("/register", (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  con.query(
    "INSERT INTO users (email, username, password) VALUES (?, ?, ?)",
    [email, username, password],
    (err, result) => {
      if (result) {
        res.send(result);
      } else {
        res.send({ message: "ENTER CORRECT ASKED DETAILS!" });
      }
    }
  );
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  con.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) {
        req.setEncoding({ err: err });
      } else {
        if (result.length > 0) {
          res.send(result);
        } else {
          res.send({ message: "WRONG USERNAME OR PASSWORD!" });
        }
      }
    }
  );
});

app.post("/createAccount", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const accountno = req.body.accountno;
  const password = req.body.password;
  const balance = req.body.balance;
  con.query(
    "INSERT INTO createaccount (name, accountno, email, password, balance) VALUES (?, ?, ?, ?, ?)",
    [name, accountno, email, password, balance],
    (err, result) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .send({ message: "An error occurred while creating the account." });
      } else {
        console.log("Account created successfully.");
        res.status(200).send({ message: "Account created successfully." });
      }
    }
  );
});

// Endpoint to fetch all customers
app.get("/customers", (req, res) => {
  con.query("SELECT * FROM createaccount", (err, result) => {
    if (err) {
      console.error("Error fetching customers:", err);
      res
        .status(500)
        .send({ message: "An error occurred while fetching customers." });
    } else {
      res.status(200).send(result);
    }
  });
});

// Endpoint to fetch transaction history for Admins
app.get("/transactions", (req, res) => {
  // Fetch transaction history for the specified account
  con.query("SELECT * FROM transactions", (err, result) => {
    if (err) {
      console.error("Error fetching transactions:", err);
      res.status(500).send({
        message: "An error occurred while fetching transaction history.",
      });
    } else {
      res.status(200).send(result);
    }
  });
});

app.post("/userlogin", (req, res) => {
  const name = req.body.username;
  const password = req.body.password;

  con.query(
    "SELECT * FROM createaccount WHERE name = ? AND password = ?",
    [name, password],
    (err, result) => {
      if (err) {
        console.error("Error authenticating user:", err);
        res
          .status(500)
          .send({ message: "An error occurred while authenticating user." });
      } else {
        if (result.length > 0) {
          // If user exists in createaccount table and password matches, send success response
          res.send({ message: "Login successful", userData: result[0] });
        } else {
          // If user doesn't exist or password doesn't match, send error response
          res.status(401).send({ message: "Invalid username or password" });
        }
      }
    }
  );
});

// Endpoint to fetch data of the logged-in user
app.post("/user-data", (req, res) => {
  const name = req.body.username;
  const password = req.body.password;

  con.query(
    "SELECT * FROM createaccount WHERE name = ? AND password = ?",
    [name, password],
    (err, result) => {
      if (err) {
        console.error("Error fetching user data:", err);
        res
          .status(500)
          .send({ message: "An error occurred while fetching user data." });
      } else {
        if (result.length > 0) {
          // If user exists in createaccount table and password matches, send success response
          res.send({
            message: "User data retrieved successfully",
            userData: result,
          });
        } else {
          // If user doesn't exist or password doesn't match, send error response
          res.status(401).send({ message: "Invalid username or password" });
        }
      }
    }
  );
});

app.post("/deposit", (req, res) => {
  const accountno = req.body.accountno;
  const depamount = req.body.depamount;

  // Insert deposit transaction record
  con.query(
    "INSERT INTO transactions (accountno, type, amount) VALUES (?, 'deposit', ?)",
    [accountno, depamount],
    (insertErr, insertResult) => {
      if (insertErr) {
        console.error("Error inserting deposit transaction record:", insertErr);
        res
          .status(500)
          .send({ message: "An error occurred while processing the deposit." });
      } else {
        // Update balance in createaccount table
        con.query(
          "UPDATE createaccount SET balance = balance + ? WHERE accountno = ?",
          [depamount, accountno],
          (updateErr, updateResult) => {
            if (updateErr) {
              console.error("Error updating balance:", updateErr);
              res.status(500).send({
                message: "An error occurred while processing the deposit.",
              });
            } else {
              // Fetch and send back the updated balance
              con.query(
                "SELECT balance FROM createaccount WHERE accountno = ?",
                [accountno],
                (fetchErr, fetchResult) => {
                  if (fetchErr) {
                    console.error("Error fetching updated balance:", fetchErr);
                    res.status(500).send({
                      message:
                        "An error occurred while fetching the updated balance.",
                    });
                  } else {
                    // Send back the updated balance in the response
                    res.send({ balance: fetchResult[0].balance });
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

app.post("/withdraw", (req, res) => {
  const accno = req.body.accno;
  const withamount = req.body.withamount;

  // Check current balance before processing the withdrawal
  con.query(
    "SELECT balance FROM createaccount WHERE accountno = ?",
    [accno],
    (fetchErr, fetchResult) => {
      if (fetchErr) {
        console.error("Error fetching balance:", fetchErr);
        res.status(500).send({
          message: "An error occurred while processing the withdrawal.",
        });
      } else {
        const currentBalance = fetchResult[0].balance;

        if (currentBalance >= withamount) {
          // Sufficient balance, proceed with withdrawal
          con.beginTransaction((err) => {
            if (err) {
              console.error("Error starting transaction:", err);
              return res.status(500).send({
                message: "An error occurred while processing the withdrawal.",
              });
            }

            // Insert withdrawal transaction record
            con.query(
              "INSERT INTO transactions (accountno, type, amount) VALUES (?, 'withdraw', ?)",
              [accno, withamount],
              (insertErr, insertResult) => {
                if (insertErr) {
                  console.error("Error inserting withdrawal transaction record:", insertErr);
                  return con.rollback(() => {
                    res.status(500).send({
                      message: "An error occurred while processing the withdrawal.",
                    });
                  });
                }

                // Update balance in createaccount table
                con.query(
                  "UPDATE createaccount SET balance = balance - ? WHERE accountno = ?",
                  [withamount, accno],
                  (updateErr, updateResult) => {
                    if (updateErr) {
                      console.error("Error updating balance:", updateErr);
                      return con.rollback(() => {
                        res.status(500).send({
                          message: "An error occurred while processing the withdrawal.",
                        });
                      });
                    }

                    con.commit((commitErr) => {
                      if (commitErr) {
                        console.error("Error committing transaction:", commitErr);
                        return con.rollback(() => {
                          res.status(500).send({
                            message: "An error occurred while processing the withdrawal.",
                          });
                        });
                      }

                      // Fetch and send back the updated balance
                      con.query(
                        "SELECT balance FROM createaccount WHERE accountno = ?",
                        [accno],
                        (fetchErr, fetchResult) => {
                          if (fetchErr) {
                            console.error("Error fetching updated balance:", fetchErr);
                            return res.status(500).send({
                              message: "An error occurred while fetching the updated balance.",
                            });
                          }

                          res.send({
                            balance: fetchResult[0].balance,
                          });
                        }
                      );
                    });
                  }
                );
              }
            );
          });
        } else {
          // Insufficient balance
          res.status(400).send({
            message: "Insufficient balance for withdrawal.",
          });
        }
      }
    }
  );
});

// app.post("/withdraw", (req, res) => {
//   const accno = req.body.accno;
//   const withamount = req.body.withamount;

//   // Insert withdrawal transaction record
//   con.query(
//     "INSERT INTO transactions (accountno, type, amount) VALUES (?, 'withdraw', ?)",
//     [accno, withamount],
//     (insertErr, insertResult) => {
//       if (insertErr) {
//         console.error(
//           "Error inserting withdrawal transaction record:",
//           insertErr
//         );
//         res.status(500).send({
//           message: "An error occurred while processing the withdrawal.",
//         });
//       } else {
//         // Update balance in createaccount table
//         con.query(
//           "UPDATE createaccount SET balance = balance - ? WHERE accountno = ?",
//           [withamount, accno],
//           (updateErr, updateResult) => {
//             if (updateErr) {
//               console.error("Error updating balance:", updateErr);
//               res.status(500).send({
//                 message: "An error occurred while processing the withdrawal.",
//               });
//             } else {
//               // Fetch and send back the updated balance
//               con.query(
//                 "SELECT balance FROM createaccount WHERE accountno = ?",
//                 [accno],
//                 (fetchErr, fetchResult) => {
//                   if (fetchErr) {
//                     console.error("Error fetching updated balance:", fetchErr);
//                     res.status(500).send({
//                       message:
//                         "An error occurred while fetching the updated balance.",
//                     });
//                   } else {
//                     // Send back the updated balance in the response
//                     res.send({ balance: fetchResult[0].balance });
//                   }
//                 }
//               );
//             }
//           }
//         );
//       }
//     }
//   );
// });


  
// app.post("/transfer", (req, res) => {
//   const senderAccNum = req.body.senderAccNum;
//   const recipientAccNum = req.body.recipientAccNum;
//   const transamount = req.body.transamount;

//   // Insert transfer transaction record for recipient
//   con.query(
//     "INSERT INTO transactions (sendaAccNo, accountno, type, amount) VALUES (?, ?, 'transfer', ?)",
//     [senderAccNum,recipientAccNum, transamount],
//     (err, result) => {
//       if (err) {
//         console.error("Error inserting transfer transaction record:", err);
//         res.status(500).send({
//           message: "An error occurred while processing the transfer.",
//         });
//       } else {
//         // Update recipient's balance
//         con.query(
//           "UPDATE createaccount SET balance = balance + ? WHERE accountno = ?",
//           [transamount, recipientAccNum],
//           (updateErr, updateResult) => {
//             if (updateErr) {
//               console.error("Error updating recipient's balance:", updateErr);
//               res.status(500).send({
//                 message: "An error occurred while processing the transfer.",
//               });
//             } else {
//               // Fetch and send back the updated balance
//               con.query(
//                 "SELECT balance FROM createaccount WHERE accountno = ?",
//                 [recipientAccNum],
//                 (fetchErr, fetchResult) => {
//                   if (fetchErr) {
//                     console.error("Error fetching updated balance:", fetchErr);
//                     res.status(500).send({
//                       message: "An error occurred while fetching the updated balance.",
//                     });
//                   } else {
//                     // Send back the updated balance in the response
//                     res.send({
//                       balance: fetchResult[0].balance,
//                     });
//                   }
//                 }
//               );
//             }
//           }
//         );
//       }
//     }
//   );
// });

app.post("/transfer", (req, res) => {
  const senderAccNum = req.body.senderAccNum;
  const recno = req.body.recno;
  const transamount = req.body.transamount;

  con.beginTransaction((err) => {
    if (err) {
      console.error("Error starting transaction:", err);
      return res.status(500).send({
        message: "An error occurred while processing the transfer.",
      });
    }

    con.query(
      "INSERT INTO transactions (sendAccNo, accountno, type, amount) VALUES (?, ?, 'transfer', ?)",
      [senderAccNum, recno, transamount],
      (insertErr, insertResult) => {
        if (insertErr) {
          console.error("Error inserting transfer transaction record:", insertErr);
          return con.rollback(() => {
            res.status(500).send({
              message: "An error occurred while processing the transfer.",
            });
          });
        }

        con.query(
          "UPDATE createaccount SET balance = balance - ? WHERE accountno = ?",
          [transamount, senderAccNum],
          (updateErr, updateResult) => {
            if (updateErr) {
              console.error("Error updating sender's balance:", updateErr);
              return con.rollback(() => {
                res.status(500).send({
                  message: "An error occurred while processing the transfer.",
                });
              });
            }

            con.query(
              "UPDATE createaccount SET balance = balance + ? WHERE accountno = ?",
              [transamount, recno],
              (updateRecipientErr, updateRecipientResult) => {
                if (updateRecipientErr) {
                  console.error("Error updating recipient's balance:", updateRecipientErr);
                  return con.rollback(() => {
                    res.status(500).send({
                      message: "An error occurred while processing the transfer.",
                    });
                  });
                }

                con.commit((commitErr) => {
                  if (commitErr) {
                    console.error("Error committing transaction:", commitErr);
                    return con.rollback(() => {
                      res.status(500).send({
                        message: "An error occurred while processing the transfer.",
                      });
                    });
                  }

                  // Fetch and send back the updated balance
                  con.query(
                    "SELECT balance FROM createaccount WHERE accountno = ?",
                    [recno],
                    (fetchErr, fetchResult) => {
                      if (fetchErr) {
                        console.error("Error fetching updated balance:", fetchErr);
                        return res.status(500).send({
                          message: "An error occurred while fetching the updated balance.",
                        });
                      }

                      res.send({
                        balance: fetchResult[0].balance,
                      });
                    }
                  );
                });
              }
            );
          }
        );
      }
    );
  });
});

// Handle endpoint to fetch monthly transaction data for a specific account
app.get("/monthly-transactions/:accountno", (req, res) => {
  const accountno = req.params.accountno;

  // Execute SQL query to calculate monthly transaction totals
  const query = `
    SELECT
      SUM(CASE WHEN type = 'deposit' THEN amount ELSE 0 END) AS deposit,
      SUM(CASE WHEN type = 'withdraw' THEN amount ELSE 0 END) AS withdrawal,
      SUM(CASE WHEN type = 'transfer' THEN amount ELSE 0 END) AS transfer
    FROM transactions
    WHERE accountno = ?
      AND MONTH(date) = MONTH(CURRENT_DATE())
  `;

  con.query(query, [accountno], (err, result) => {
    if (err) {
      console.error("Error fetching monthly transaction data:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(result[0]);
    }
  });
});

// Fetch overall transaction counts for a specific account
app.get("/overall-transaction-counts/:accountno", (req, res) => {
  const accountno = req.params.accountno;

  // Execute SQL query to calculate overall transaction counts
  const query = `
    SELECT
      SUM(CASE WHEN type = 'deposit' THEN 1 ELSE 0 END) AS deposit,
      SUM(CASE WHEN type = 'withdraw' THEN 1 ELSE 0 END) AS withdrawal,
      SUM(CASE WHEN type = 'transfer' THEN 1 ELSE 0 END) AS transfer
    FROM transactions
    WHERE accountno = ?
  `;

  con.query(query, [accountno], (err, result) => {
    if (err) {
      console.error("Error fetching overall transaction counts:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (result.length > 0) {
        // Return overall transaction counts as JSON response
        res.json(result[0]);
      } else {
        res
          .status(404)
          .json({ error: "No transactions found for the account." });
      }
    }
  });
});

app.listen(3001, () => {
  console.log("running backend server");
});
