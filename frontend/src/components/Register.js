import React, { useState } from 'react';
import './register.css'
function Register()
{
    function buildPath(route)
    {
   
        return 'http://localhost:3000/' + route;
    }

    var userid;
    var password;

    const [message,setMessage] = useState('');

    const doRegister = async event => 
    {
        event.preventDefault();

        var obj = {userid:userid.value,password:password.value};
        var js = JSON.stringify(obj);

        try
        {    
            const response = await fetch(buildPath('api/register'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            if( res.error !== "")
            {
                setMessage(res.error);
            }
            else
            {
                var user = {userID:res.userID}
                localStorage.setItem('user_data', JSON.stringify(user));

                setMessage('');
                window.location.href = '/login';
            }
        }
        catch(e)
        {
            alert(e.toString());
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
                <input type="text" id="loginName" placeholder="User ID" className="input"
                    ref={(c) => userid = c} />

                <input type="password" id="loginPassword" placeholder="Password" className="input"
                    ref={(c) => password = c} />

                <div id="bumper" className="buffer"><span id="registerResult" className = "error">{message}</span></div> 

                <input type="submit" id="registerButton" value = "Register" className="mainbutton"
                onClick={doRegister} />
            </form>

            <input type="button" className="dropbutton" value="Login" 
                onClick={goLogin}/> 
     </div>
    );
};

export default Register;