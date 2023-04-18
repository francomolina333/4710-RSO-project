import React, { useState } from 'react';
import './home.css'

function Home()
{  
    const goJoin = async event=>
    {
        window.location.href = '/join-RSO';
    }

    const goLeave = async event=>
    {
        window.location.href = '/leave-RSO';
    }

    const goCreateRSO = async event=>
    {
        window.location.href = '/create-RSO';
    }

    const goAddUniversity = async event=>
    {
        window.location.href = '/add-university';
    }

    const goJoinUniversity = async event=>
    {
        window.location.href = '/join-university';
    }

    const goCreateEvent = async event=>
    {
        window.location.href = '/create-event';
    }

    return(
            <div className="homediv">
                <h1 className="hometitle">Home</h1>
                <input type="button" className="homebutton" value ="Join RSO"
                    onClick={goJoin}/>   
                <input type="button" className="homebutton" value ="Leave RSO"
                    onClick={goLeave}/>   
                <input type="button" className="homebutton" value="Create New RSO" 
                    onClick={goCreateRSO}/>
                <input type="button" className="homebutton" value="Create Event" 
                    onClick={goCreateEvent}/>
                <input type="button" className="homebutton" value="Join University" 
                    onClick={goJoinUniversity}/>  
                <input type="button" className="homebutton" value="Add University" 
                    onClick={goAddUniversity}/>  
            </div>
   );
};

export default Home;