import React, { useState } from 'react';
import './addUniversity.css';

function AddUniversity()
{
    function buildPath(route)
    {     
        return 'http://localhost:3000/' + route;
    }

    var user_data = localStorage.getItem('user_data');
    var rsoid;

    const [message,setMessage] = useState('');

    const doAddUniversity = async event => 
    {
        event.preventDefault();

        var obj = {rsoid:rsoid.value, userid:user_data.userid.value};
        var js = JSON.stringify(obj);

        try
        {    
            const response = await fetch(buildPath('api/login'),
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
            <form onSubmit={doAddUniversity} className="addBox">
                <span className="joinTitle">Add University</span>
                <input type="text" placeholder="University Name" className="input"
                    ref={(c) => rsoid = c} />
                
                <input type="text" placeholder="Description" className="input"
                    ref={(c) => rsoid = c} />

                <div className="buffer"><span className = "error">{message}</span></div> 

                <input type="submit" className="mainbutton" value ="Join"
                    onClick={doAddUniversity} />
            </form>       
     </div>
    );
};

export default AddUniversity;