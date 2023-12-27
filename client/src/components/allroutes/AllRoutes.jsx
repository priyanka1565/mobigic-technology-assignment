import React from 'react'
import { Routes, Route } from "react-router-dom";
import Login from '../pages/login/Login';
import SignupForm from '../pages/signup/Signup';



const AllRoutes = () => {
  return (
      <div>
          <Routes>
        <Route path='/' element={<SignupForm />} />
        <Route path='/login' element={< Login/>} />
       
        </Routes>
    </div>
  )
}

export default AllRoutes