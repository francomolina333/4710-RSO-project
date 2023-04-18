import React, { useState } from 'react';
import './createRSO.css';

function CreateRSO()
{
    function buildPath(route)
    {     
        return 'http://localhost:3000/' + route;
    }

    var user_data = JSON.parse(localStorage.getItem('user_data'));
    var userid = user_data.userid;
    var rsoName;
    var newID;
    const emails = [];

    const [message,setMessage] = useState('');

    const doCreateRSO = async event => 
    {
        event.preventDefault();
        try
        {    
            const response = await fetch(buildPath('api/generateRSOID'),
                {method:'GET',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            if( res.error !== "")
            {
                setMessage(res.error);
                console.log(res.error);
            }
            else
            {
                newID=res.newID;
            }
        }
        catch(e)
        {
            alert(e.toString());
            console.log("error caught");
            return;
        }   


        for (var i = 0; i <4; i++)
        {
            emails[i] = emails[i].value;
        }

        var obj = {newRSOid: newID, foreign_userid:userid, name:rsoName.value, emails:emails};
        var js = JSON.stringify(obj);

        try
        {    
            const response = await fetch(buildPath('api/createRSO'),
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
            <form onSubmit={doCreateRSO} className="createBox">
                <span className="joinTitle">Create RSO</span>
                <input type="text" placeholder="RSO Name" className="input"
                    ref={(c) => rsoName = c} />
                
                <input type="text" placeholder="Member #1 email" className="input"
                    ref={(c) => emails[0] = c} />
                
                <input type="text" placeholder="Member #2 email" className="input"
                    ref={(c) => emails[1] = c} />
                
                <input type="text" placeholder="Member #3 email" className="input"
                    ref={(c) => emails[2] = c} />
                
                <input type="text" placeholder="Member #4 email" className="input"
                    ref={(c) => emails[3] = c} />

                <div className="buffer"><span className = "error">{message}</span></div> 

                <input type="submit" className="mainbutton" value ="Create"
                    onClick={doCreateRSO} />
            </form>       
     </div>
    );
};

export default CreateRSO;