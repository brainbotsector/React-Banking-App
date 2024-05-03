# For Full Codes and Folders change the "main" branch to "master"
Simple Banking System for Administrators and Account Holders. Developed Using React.js ,Node.js, Express and MySQL
Technologies Used:
  Frontend (User/Admin Panel):
    -Developed using React.js for interactive UI components.
    -Utilizes Axios for handling HTTP requests to the backend server.
    -Incorporates Chart.js library for graphical visualization of transaction data.
  Backend (Node.js, Express):
    -Implements an Express.js server to handle API requests from the frontend.
    -Uses MySQL database to store and retrieve data related to usersaccounts, transactions, and admins.
  Database (MySQL):
    -Manages account and transaction data using MySQL database.
    -Schema includes tables for admins, customers (account holders), and transactions.

## Admin and User Panel 
Admin Registration and Login:
 -Admins can register by providing their details (username, password).
 -After registration, admins can log in using their credentials.
User Login:
 -Users (account holders) must log in using credentials provided by admins during account creation.
 -After successful login, users gain access to their dashboard.
![b1](https://github.com/brainbotsector/React-Banking-App/assets/88769793/3d1c8d15-4400-4e89-a84c-839199cce8ce)
## Admin Dashboard- Create Account for Customers
 -Upon successful login, admins can access the dashboard.
 -Admins have the ability to create new customer accounts.
Create Customer Accounts:
 -Admins can create new customer accounts by entering customer details (e.g., name, account number, initial balance).
 -Each customer account created will have unique credentials (username, password) provided by admins for customer login.
![b2](https://github.com/brainbotsector/React-Banking-App/assets/88769793/1a50ad0f-070a-4252-b56b-45ccab864cfd)
## Admin Dashboard- View All Users(Account Holders)
 -Admins can view a list of all account holders (customers) registered in the system.
 -This list includes basic information about each customer.
![b3](https://github.com/brainbotsector/React-Banking-App/assets/88769793/841d2f55-67e3-4eb1-bd10-eb9747460ec4)
## Admin Dashboard- View All Customers Transactions History
 -Admins can view a comprehensive history of all transactions performed by users (account holders).
 -Transaction details include type (deposit, withdrawal, transfer), amount, date/time, and involved account numbers.
![b4](https://github.com/brainbotsector/React-Banking-App/assets/88769793/458d7d74-195f-4691-a5e6-4bb48995a1f2)
## User Dashboard- Transactions Form & Transaction History
 -After successful login, users gain access to their dashboard.
Transaction Methods:
  Users have access to three transaction methods:
  -Deposit Money: Users can deposit money into their account by specifying the amount.
  -Withdraw Money: Users can withdraw money from their account by specifying the amount.
  -Transfer Money: Users can transfer money to another account by specifying the recipient's account number and amount.
Transaction History:
  -After logging in, users can view their transaction history list.
  -The list displays all transactions (deposit, withdrawal, transfer) initiated by the user.
  -Each transaction entry includes details such as type, amount, recipient (for transfers), and date/time.
![b5](https://github.com/brainbotsector/React-Banking-App/assets/88769793/7df4d3d0-6f5a-4aa8-acb9-e5a7e9ff7b4d)
## User Dashboard- User Overall Transactions Graph
 -Users can visualize their overall transaction history through a graph.
 -The graph illustrates the total number of transactions (e.g., deposits, withdrawals, transfers) in a visualized format (e.g., bar chart).
![b6](https://github.com/brainbotsector/React-Banking-App/assets/88769793/e130bd56-ef3e-45c4-9f95-ec80fe60d79e)
## User Dashboard- User Currrent Month Transactions Pie Chart
 -Users can view their current month's transaction summary through a pie chart.
 -The chart displays the distribution of total deposited, withdrawn, and transferred Amounts for the current month.
![b7](https://github.com/brainbotsector/React-Banking-App/assets/88769793/224dcc7e-ef6f-440d-a92a-c2fea58d6ba7)
