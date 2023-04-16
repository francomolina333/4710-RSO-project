import React from 'react';

import Login from '../components/Login';
import PageTitle from '../components/PageTitle'
//const bgImage = new URL("/public/bg-mobile.png",import.meta.url)
//style={{display: 'flex', justifyContent:'center', alignItems:'center' , height:'100vh'}}

const LoginPage = () =>
{
    return(
      <div className='main-container'>
        <PageTitle />
        <Login />
      </div>
    );
};

export default LoginPage;
