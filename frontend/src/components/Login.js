import React, { useState } from 'react';
import './login.css';

function Login()
{
    function buildPath(route)
    {     
        return 'http://localhost:3000/' + route;
    }

    var email;
    var password;

    const [message,setMessage] = useState('');

    const doLogin = async event => 
    {
        event.preventDefault();

        var obj = {email:email.value,password:password.value};
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
                var user = {userid:res.userid, email:email.value}
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
                <span className="title">Log In</span>
                <input type="text" placeholder="Email" className="input"
                    ref={(c) => email = c} />

                <input type="password" placeholder="Password" className="input"
                    ref={(c) => password = c} />

                <div className="buffer"><span className = "error">{message}</span></div> 

                <input type="submit" className="mainbutton" value ="Log In"
                    onClick={doLogin} />
            </form>

        <input type="button" className="dropbutton" value="Register" 
                onClick={goRegister}/>           
     </div>
    );
};

export default Login;