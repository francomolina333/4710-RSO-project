import React, { useState } from 'react';
import './login.css';

function Login()
{
    function buildPath(route)
    {     
        return 'http://localhost:3000/' + route;
    }

    var userid;
    var password;

    const [message,setMessage] = useState('');

    const doLogin = async event => 
    {
        event.preventDefault();

        var obj = {userid:userid.value,password:password.value};
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
                var user = {userID:res.userID}
                localStorage.setItem('user_data', JSON.stringify(user));

                setMessage('');
                window.location.href = '/home';
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }    
    };

const goRegister = async event=>
    {
        window.location.href = '/register';
    }

    return(
        <div>
            <form onSubmit={doLogin} className="loginBox">
                <span id="inner-title" className="title">Log In</span>
                <input type="text" id="loginName" placeholder="User ID" className="input"
                    ref={(c) => userid = c} />

                <input type="password" id="loginPassword" placeholder="Password" className="input"
                    ref={(c) => password = c} />

                <div id="bumper" className="buffer"><span id="loginResult" className = "error">{message}</span></div> 

                <input type="submit" id="loginButton" className="mainbutton" value ="Log In"
                    onClick={doLogin} />
            </form>

        <input type="button" id="registerButton" className="dropbutton" value="Register" 
                onClick={goRegister}/>           
     </div>
    );
};

export default Login;