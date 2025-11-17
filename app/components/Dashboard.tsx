import getSessionUser from '@/lib/getSessionUser';
import React from 'react'
import SignoutButton from './SignoutButton';

const Dashboard = async () => {
  const currentUser = await getSessionUser();

  return (
    <div>
      {currentUser?.name}
      <SignoutButton/>  
    </div>
  )
}

export default Dashboard;
