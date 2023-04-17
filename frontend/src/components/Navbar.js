import React from 'react';
import {  Link } from "react-router-dom";
import './navbar.css';

const Navbar= () =>{
  return (
  <div className="navdiv">
    <Link to="/home">Home</Link>
    <Link to="/events">Events</Link>
  </div>
  );
}
export default Navbar;
