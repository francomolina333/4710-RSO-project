import React from 'react';

import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import AddUniversity from '../components/AddUniversity';

const AddUniversityPage = () =>
{
    return(
      <div>
        <PageTitle />
        <Navbar />
        <AddUniversity />
      </div>
    );
};

export default AddUniversityPage;
