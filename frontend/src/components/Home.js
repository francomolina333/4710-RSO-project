import React, { useState } from 'react';
import './home.css'

function Home()
{  const goJoin = async event=>
    {
        window.location.href = '/join-RSO';
    }

    const goCreateRSO = async event=>
    {
        window.location.href = '/create-RSO';
    }

    const goAddUniversity = async event=>
    {
        window.location.href = '/add-university';
    }

    return(
		<body>
            <div className="homediv">
                <input type="button" className="homebutton" value ="Join RSO"
                    onClick={goJoin}/>   
                <input type="button" className="homebutton" value="Create New RSO" 
                    onClick={goCreateRSO}/>
                <input type="button" className="homebutton" value="Add University" 
                    onClick={goAddUniversity}/>  
            </div>
	    </body>
   );
};

export default Home;