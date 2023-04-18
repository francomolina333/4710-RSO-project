import React, { useState } from 'react';
import './leaveRSO.css';

function LeaveRSO()
{
    function buildPath(route)
    {     
        return 'http://localhost:3000/' + route;
    }

    var user_data = localStorage.getItem('user_data');
    var rsoid;

    const [message,setMessage] = useState('');

    const doLeaveRSO = async event => 
    {
        event.preventDefault();

        var obj = {rsoid:rsoid.value, userid:user_data.userid.value};
        var js = JSON.stringify(obj);

        try
        {    
            const response = await fetch(buildPath('api/leaveRSO'),
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
            <form onSubmit={doLeaveRSO} className="joinBox">
                <span className="joinTitle">Leave RSO</span>
                <input type="text" placeholder="RSO ID" className="input"
                    ref={(c) => rsoid = c} />

                <div className="buffer"><span className = "error">{message}</span></div> 

                <input type="submit" className="mainbutton" value ="Leave"
                    onClick={doLeaveRSO} />
            </form>       
     </div>
    );
};

export default LeaveRSO;