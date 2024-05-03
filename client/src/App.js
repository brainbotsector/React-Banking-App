import React, { useState } from "react";
import AdminPanel from "./adminpanel";
import UserDashboard from "./userdashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPiggyBank } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

function App() {
  const [selectedTab, setSelectedTab] = useState("Admin");

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleLogout = () => {
    window.location.href = "/"; // Redirect to the main page
  };

  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <div>
          <h1>
            <FontAwesomeIcon icon={faPiggyBank} /> Bank Dank
          </h1>
        </div>
        <nav className="right hide-small">
          {selectedTab === "Admin" && (
            <>
              <a href="#about-section" className="Button">
                <i className="fa fa-th"></i> About
              </a>
              <a href="#contact-section" className="Button">
                <i className="fa fa-usd"></i> Contact
              </a>
            </>
          )}
          <a href="#" className="Button" onClick={handleLogout}>
            Logout
          </a>
        </nav>
      </header>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={selectedTab === "Admin" ? "active" : ""}
          onClick={() => handleTabChange("Admin")}
        >
          Admin
        </button>
        <button
          className={selectedTab === "Customer" ? "active" : ""}
          onClick={() => handleTabChange("Customer")}
        >
          User
        </button>
      </div>

      {/* Content */}
      <div className="background-section">
        {/* Render AdminPanel or UserDashboard based on selected tab */}
        {selectedTab === "Admin" && <AdminPanel />}
        {selectedTab === "Customer" && <UserDashboard />}
      </div>

      {/* About Us Section */}
      {selectedTab === "Admin" && (
        <section id="about-section" className="about-section">
          <h2>About Us</h2>
          <p>
            At Bank Dank, we believe in transparency, integrity, and
            accountability. Our mission is to empower individuals and businesses
            by providing them with reliable financial solutions tailored to their
            needs. With a team of experienced professionals and cutting-edge
            technology, we are committed to delivering excellence in banking
            services.
          </p>
        </section>
      )}

      {/* Contact Section */}
      {selectedTab === "Admin" && (
        <section id="contact-section" className="contact-section">
          <footer className="footer">
            <div className="contact-info">
              <h3>Contact Us</h3>
              <p>Email: info@bankdank.com</p>
              <p>Phone: +1234567890</p>
            </div>
          </footer>
        </section>
      )}
    </div>
  );
}

export default App;




// import React, { useState } from "react";
// import AdminPanel from "./adminpanel"; // Corrected import statement
// import UserDashboard from "./userdashboard";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPiggyBank } from "@fortawesome/free-solid-svg-icons"; // Example icon, replace it with the desired one
// import "./App.css";

// function App() {
//   const [selectedTab, setSelectedTab] = useState("Admin");
//   const [loggedIn, setLoggedIn] = useState(false); // State to track login status
  
//   const handleTabChange = (tab) => {
//     setSelectedTab(tab);
//   };

//   return (
//     <div className="App">
//       {/* Header */}
//       <header className="header">
//         <div>
//           <h1>
//             <FontAwesomeIcon icon={faPiggyBank} /> Bank Dank
//           </h1>
//         </div>
//         <nav className="right hide-small">
//           {/* Anchor links for About and Contact */}
//           <a href="#about-section" className="Button">
//             <i className="fa fa-th"></i> About
//           </a>
//           <a href="#contact-section" className="Button">
//             <i className="fa fa-usd"></i> Contact
//           </a>
//           <a href="#logout-section" className="Button">
//             <i className="fa fa-usd"></i> Logout
//           </a>
//         </nav>
//       </header>

//       {/* Tabs */}
//       <div className="tabs">
//         <button
//           className={selectedTab === "Admin" ? "active" : ""}
//           onClick={() => handleTabChange("Admin")}
//         >
//           Admin
//         </button>
//         <button
//           className={selectedTab === "Customer" ? "active" : ""}
//           onClick={() => handleTabChange("Customer")}
//         >
//           User
//         </button>
//       </div>

//       {/* Content */}
//       <div className="background-section">
//         {/* Render AdminPanel or UserPanel based on selected tab */}
//         {selectedTab === "Admin" && <AdminPanel />}
//         {selectedTab === "Customer" && !loggedIn && (
//           <UserDashboard setLoggedIn={setLoggedIn} />
//         )}
//         {selectedTab === "Customer" && loggedIn && <UserDashboard />}
//       </div>

//       {/* About Us Section */}
//       <section id="about-section" className="about-section">
//         <h2>About Us</h2>
//         <p>
//           At Bank Dank, we believe in transparency, integrity, and
//           accountability. Our mission is to empower individuals and businesses
//           by providing them with reliable financial solutions tailored to their
//           needs. With a team of experienced professionals and cutting-edge
//           technology, we are committed to delivering excellence in banking
//           services.
//         </p>
//       </section>

//       {/* Footer */}
//       <section id="contact-section" className="contact-section">
//        <footer className="footer">
//          <div className="contact-info">
//            <h3>Contact Us</h3>
//            <p>Email: info@bankdank.com</p>
//            <p>Phone: +1234567890</p>
//          </div>
//        </footer>
//       </section>
//     </div>
//   );
// }

// export default App;


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useState } from "react";
// import AdminPanel from "./adminpanel"; // Corrected import statement
// // import UserPanel from './userpanel'; // Corrected import statement
// import "./App.css";
// import UserDashboard from "./userdashboard";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPiggyBank } from "@fortawesome/free-solid-svg-icons"; // Example icon, replace it with the desired one

// function App() {
//   const [selectedTab, setSelectedTab] = useState("Admin");
//   const [loggedIn, setLoggedIn] = useState(false); // State to track login status

//   const handleTabChange = (tab) => {
//     setSelectedTab(tab);
//   };

//   return (
//     <div className="App">
//       {/* Header */}
//       <header className="header">
//         <div>
//           <h1>
//             <FontAwesomeIcon icon={faPiggyBank} /> Bank Dank
//           </h1>
//         </div>
//         <nav className="right hide-small">
          
//           <a href="#work" className="Button">
//             <i className="fa fa-th"></i> About
//           </a>
//           <a href="#pricing" className="Button">
//             <i className="fa fa-usd"></i> Contact
//           </a>
          
//         </nav>
//       </header>

//       {/* Tabs */}
//       <div>
//       <div className="tabs">
//         <button
//           className={selectedTab === "Admin" ? "active" : ""}
//           onClick={() => handleTabChange("Admin")}
//         >
//           Admin
//         </button>
//         <button
//           className={selectedTab === "Customer" ? "active" : ""}
//           onClick={() => handleTabChange("Customer")}
//         >
//           User
//         </button>
//       </div>
      
//       {/* Content */}
//       <div className="background-section">
//         {/* Render AdminPanel or UserPanel based on selected tab */}
//         {selectedTab === "Admin" && <AdminPanel />}
//         {selectedTab === "Customer" && !loggedIn && (
//           <UserDashboard setLoggedIn={setLoggedIn} />
//         )}
//         {selectedTab === "Customer" && loggedIn && <UserDashboard />}
//       </div>
//     </div>
//     <section className="about-section">
//         <h2>About Us</h2>
//         <p>
//           At Bank Dank, we believe in transparency, integrity, and
//           accountability. Our mission is to empower individuals and businesses
//           by providing them with reliable financial solutions tailored to their
//           needs. With a team of experienced professionals and cutting-edge
//           technology, we are committed to delivering excellence in banking
//           services.
//         </p>
//       </section>

//       {/* Footer */}
//       <footer className="footer">
//         <div className="contact-info">
//           <h3>Contact Us</h3>
//           <p>Email: info@bankdank.com</p>
//           <p>Phone: +1234567890</p>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default App;
