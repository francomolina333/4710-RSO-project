import React, { useState } from 'react';
import './joinUniversity.css';
 
const libraries = ["places"];

function JoinUniversity()
{
 
    function buildPath(route)
    {     
        return 'http://localhost:3000/' + route;
    }

    var user_data = localStorage.getItem('user_data');
    var uniid;
    var name;
    var description;
    var address;

    const [message,setMessage] = useState('');

    const doJoinUniversity = async event => 
    {
        event.preventDefault();

        var obj = {userid:user_data.userid.value, uniid: uniid};
        var js = JSON.stringify(obj);

        try
        {    
            const response = await fetch(buildPath('api/addUniversity'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            if( res.error !== "")
            {
                setMessage(res.error);
            }
            else
            {
                setMessage('Success');
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }    
    };

    return(
        <div>
            <form onSubmit={doJoinUniversity} className="joinUniBox">
                <span className="joinTitle">Join University</span>
                <input type="text" placeholder="University ID" className="input"
                    ref={(c) => uniid = c} />

                <div className="buffer"><span className = "error">{message}</span></div> 

                <input type="submit" className="mainbutton" value ="Join"
                    onClick={doJoinUniversity} />
            </form>       
     </div>
    );
};

export default JoinUniversity;