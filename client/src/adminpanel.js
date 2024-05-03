import React, { useState } from "react";
import "./App.css";
import Axios from "axios";
import { AdminDashboard } from "./admindashboard";

function Adminpanel() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [registerStatus, setRegisterStatus] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const register = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/register", {
      email: email,
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setRegisterStatus(response.data.message);
      } else {
        setRegisterStatus("ACCOUNT CREATED SUCCESSFULLY");
      }
    });
  };

  const login = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        setLoginStatus(response.data[0].email);
        setIsLoggedIn(true);
      }
    });
  };

  if (isLoggedIn) {
    return <AdminDashboard />;
  }

  return (
    <div style={{ height: "670px" }}>
      <div className="container">
        <div className="loginForm">
          <form>
            <h4>{isRegistering ? "Register Here" : "Login Here"}</h4>
            <label htmlFor="username">Username*</label>
            <input
              className="textInput"
              type="text"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your Username"
              required
            />
            <label htmlFor="password">Password*</label>
            <input
              className="textInput"
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your Password"
              required
            />
            {isRegistering && (
              <>
                <label htmlFor="email">Email Address*</label>
                <input
                  className="textInput"
                  type="text"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your Email Address"
                  required
                />
              </>
            )}
            <input
              className="button"
              type="submit"
              onClick={isRegistering ? register : login}
              value={isRegistering ? "Create an account" : "Login"}
            />

            <h1
              style={{
                color: "red",
                fontSize: "15px",
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              {loginStatus}
            </h1>
          </form>
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            {isRegistering
              ? "Already registered? "
              : "Don't have an account? "}
            <button onClick={() => setIsRegistering(!isRegistering)}>
              {isRegistering ? "Login here" : "Register here"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Adminpanel;


// import React, { useState } from "react";
// import "./App.css";
// import Axios from "axios";
// import { AdminDashboard } from "./admindashboard";

// function Adminpanel() {
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [loginStatus, setLoginStatus] = useState("");
//   const [registerStatus, setRegisterStatus] = useState("");
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isRegistering, setIsRegistering] = useState(false);

//   const register = (e) => {
//     e.preventDefault();
//     Axios.post("http://localhost:3001/register", {
//       email: email,
//       username: username,
//       password: password,
//     }).then((response) => {
//       if (response.data.message) {
//         setRegisterStatus(response.data.message);
//       } else {
//         setRegisterStatus("ACCOUNT CREATED SUCCESSFULLY");
//       }
//     });
//   };

//   const login = (e) => {
//     e.preventDefault();
//     Axios.post("http://localhost:3001/login", {
//       username: username,
//       password: password,
//     }).then((response) => {
//       if (response.data.message) {
//         setLoginStatus(response.data.message);
//       } else {
//         setLoginStatus(response.data[0].email);
//         setIsLoggedIn(true);
//       }
//     });
//   };

//   if (isLoggedIn) {
//     return <AdminDashboard />;
//   }

//   return (
//   <div class style={{height: '670px'}}>
//     <div className="container">
//       <div className="loginForm">
//         <form>
//           <h4>{isRegistering ? "Register Here" : "Login Here"}</h4>
//           <label htmlFor="username">Username*</label>
//           <input
//             className="textInput"
//             type="text"
//             name="username"
//             onChange={(e) => setUsername(e.target.value)}
//             placeholder="Enter your Username"
//             required
//           />
//           <label htmlFor="password">Password*</label>
//           <input
//             className="textInput"
//             type="password"
//             name="password"
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Enter your Password"
//             required
//           />
//           {isRegistering && (
//             <>
//               <label htmlFor="email">Email Address*</label>
//               <input
//                 className="textInput"
//                 type="text"
//                 name="email"
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your Email Address"
//                 required
//               />
//             </>
//           )}
//           <input
//             className="button"
//             type="submit"
//             onClick={isRegistering ? register : login}
//             value={isRegistering ? "Create an account" : "Login"}
//           />
          
//           <h1
//             style={{
//               color: "red",
//               fontSize: "15px",
//               textAlign: "center",
//               marginTop: "20px",
//             }}
//           >
//             {loginStatus} 
            
//           </h1>
//         </form>
//         {!isRegistering && (
//           <p style={{ textAlign: "center", marginTop: "20px" }}>
//             Don't have an account?{" "}
//             <button onClick={() => setIsRegistering(true)}>Register here</button>
//           </p>
//         )}
//       </div>
//     </div>
//   </div>
//   );
// }

// export default Adminpanel;
