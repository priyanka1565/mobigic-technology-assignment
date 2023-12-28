import React from 'react'
import { Routes, Route } from "react-router-dom";
import Login from '../pages/login/Login';
import SignupForm from '../pages/signup/Signup';
import FileUpload from "../pages/fileUpload/FileUpload"
import FileList from "../pages/fileUpload/FileList"

const AllRoutes = () => {
  return (
      <div>
          <Routes>
        <Route path='/' element={<SignupForm />} />
        <Route path='/login' element={< Login />} />
        <Route path='/fileUpload' element={<FileUpload  />} />
        <Route path='/fileList' element={<FileList />} />
        </Routes>
    </div>
  )
}

export default AllRoutes