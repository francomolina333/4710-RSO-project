import React from 'react';
import {  Link } from "react-router-dom";
import './navbar.css';

const Navbar= () =>{
  return (
  <div className="navdiv">
    <Link to="/home" id="homelink">Home</Link>
    <Link to="/events" id="eventslink">Events</Link>
  </div>
  );
}
export default Navbar;
