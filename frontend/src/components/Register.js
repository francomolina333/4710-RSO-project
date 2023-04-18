import React, { useState } from 'react';
import './register.css'

function Register()
{
    function buildPath(route)
    {
        return 'http://localhost:3000/' + route;
    }

    var emailInput = '';
    var passwordInput = '';
    var newID = '';
    
    const [message,setMessage] = useState('');

    const doRegister = async event => 
    {
        event.preventDefault();
        try
        {    
            const response = await fetch(buildPath('api/generateID'),
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
        
        var obj = {newID:newID, password:passwordInput.value, email:emailInput.value};
        var js = JSON.stringify(obj);
        console.log(js);

        try
        {    
            const response = await fetch(buildPath('api/register'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            if( res.error !== "")
            {
                setMessage(res.error);
                console.log(res.error);
            }
            else
            {
                setMessage('');
                window.location.href = '/login';
                console.log("Success");
            }
        }
        catch(e)
        {
            alert(e.toString());
            console.log("error caught");
            return;
        }    
    };

    const goLogin = async event=>
    {
        window.location.href = '/login';
    }

    return(
        <div>
            <form onSubmit={doRegister} className="registerBox">
                <span className="title">Sign up</span>
                <input type="text" placeholder="Email" className="input"
                    ref={(c) => emailInput = c} />

                <input type="password" placeholder="Password" className="input"
                    ref={(c) => passwordInput = c} />

                <div className="buffer"><span className = "error">{message}</span></div> 

                <input type="submit" id="registerButton" value = "Register" className="mainbutton"
                onClick={doRegister} />
                
            </form>

            <input type="button" className="dropbutton" value="Login" 
                onClick={goLogin}/> 
     </div>
    );
};

export default Register;
