// src/FileUpload.js
import React, { useState } from 'react';
import { Input, Button, Box } from '@chakra-ui/react';
import axios from 'axios';



const FileUpload = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.post('http://localhost:5000/upload', formData);

            if (response.data.success) {
                console.log(response.data.message);
            }
        } catch (error) {
            console.error('Error uploading file:', error.message);
        }
    };

    return (
        <Box p="4">
            <Input type="file" onChange={handleFileChange} mb="4" />
            <Button onClick={handleUpload} colorScheme="teal">
                Upload File
            </Button>
        </Box>
    );
};

export default FileUpload;
