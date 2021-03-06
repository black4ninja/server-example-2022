import React from "react";
 
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";
import AuthenticationExists from "./authenticate.js";
  
// Here, we display our Navbar
export default function Navbar() { 
 return (
   <div>
     <nav className="navbar navbar-expand-lg navbar-light bg-light">
       <button
         className="navbar-toggler"
         type="button"
         data-toggle="collapse"
         data-target="#navbarSupportedContent"
         aria-controls="navbarSupportedContent"
         aria-expanded="false"
         aria-label="Toggle navigation"
       >
         <span className="navbar-toggler-icon"></span>
       </button>
 
       <div className="collapse navbar-collapse" id="navbarSupportedContent">
         <ul className="navbar-nav ml-auto">
          <li className="nav-item">
             <NavLink className="nav-link" to="/profile">
               Perfil
             </NavLink>
          </li>
          <li className="nav-item">
             <NavLink className="nav-link" to="/">
               Lista
             </NavLink>
          </li>
           <li className="nav-item">
             <NavLink className="nav-link" to="/create">
               Crear Usuario
             </NavLink>
          </li>
          <li className="nav-item">
             <NavLink className="nav-link" to="/todos">
               Todos
             </NavLink>
          </li>
          <li className="nav-item">
            <AuthenticationExists />
          </li>
         </ul>
       </div>
     </nav>
   </div>
 );
}