import React from 'react';

import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import CreateEvent from '../components/CreateEvent';

const CreateEventPage = () =>
{
    return(
      <div>
        <PageTitle />
        <Navbar />
        <CreateEvent />
      </div>
    );
};

export default CreateEventPage;
