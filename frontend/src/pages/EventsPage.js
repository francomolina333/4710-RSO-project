import React from 'react';

import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import Events from '../components/Events';

const EventsPage = () =>
{
    return(
      <div>
        <PageTitle />
        <Navbar />
        <Events />
      </div>
    );
};

export default EventsPage;
