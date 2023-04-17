import React from 'react';

import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import Home from '../components/Home';

const HomePage = () =>
{
    return(
      <div>
        <PageTitle />
        <Navbar />
        <Home />
      </div>
    );
};

export default HomePage;
