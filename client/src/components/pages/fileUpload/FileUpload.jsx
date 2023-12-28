// src/FileUpload.js
import React, { useState } from 'react';
import { Input, Button, Box } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await axios.post('https://mobigicbackend.onrender.com/user/upload-file', formData);
            if (response) {
                toast.success(`${response?.data?.message}`)
            }
        } catch (error) {
            console.error('Error uploading file:', error.message);
        }
    };

    const handleNavigate = () => {
        navigate("/fileList")
    }

    return (
        <Box p="4">
            <Input type="file" onChange={handleFileChange} mb="4" />
            <Button onClick={handleUpload} colorScheme="teal" mr="8">
                Upload File
            </Button>
            <Button onClick={handleNavigate} colorScheme="teal">
                Go To File List
            </Button>
            <ToastContainer />
        </Box>
    );
};

export default FileUpload;
