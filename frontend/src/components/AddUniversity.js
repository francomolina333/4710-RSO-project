import React, { useState } from 'react';
import './addUniversity.css';

function AddUniversity()
{
 
    function buildPath(route)
    {     
        return 'http://localhost:3000/' + route;
    }

    var user_data = JSON.parse(localStorage.getItem('user_data'));
    var userid=user_data.userid;
    var name;
    var description;
    var address;

    const [message,setMessage] = useState('');

    const doAddUniversity = async event => 
    {
        event.preventDefault();

        var obj = { name:name.value, description:description.value, address:address.value};
        var js = JSON.stringify(obj);

        try
        {    
            const response = await fetch(buildPath('api/createUni'),
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
                    ref={(c) => name = c} />
                
                <input type="text" placeholder="Description" className="input"
                    ref={(c) => description = c} />

                <input type="text" placeholder="Address" className="input"
                    ref={(c) => address = c} />

                <div className="buffer"><span className = "error">{message}</span></div> 

                <input type="submit" className="mainbutton" value ="Create"
                    onClick={doAddUniversity} />
            </form>       
     </div>
    );
};

export default AddUniversity;