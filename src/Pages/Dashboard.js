import React, { useEffect, useState } from 'react'
import Navigation from '../Components/Navigation'
import { isAuthenticated } from '../Services/Auth';
import { Navigate } from 'react-router-dom';
import { userDetailsApi } from '../Services/Api';

export default function Dashboard() {

  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (isAuthenticated()) {
      userDetailsApi()
      .then((res) => {
        console.log(res.data.users[0])
        setUserData(res.data.users[0]);
      })
      .catch((err) => {
        console.log('Error', err.data)
      })
    }
  }, [])

  if (!isAuthenticated())
    return <Navigate to="/login" />

  return (
    <>
    <Navigation />
    <div className='container'>
      <h1>Welcome, {userData.displayName}</h1>
    </div>
    </>
  )
}
