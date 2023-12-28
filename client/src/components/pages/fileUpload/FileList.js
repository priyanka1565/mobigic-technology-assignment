// FileList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FileList = () => {
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        // Fetch file list when the component mounts
        fetchFileList();
    }, []);

    const fetchFileList = async () => {
        try {
            const response = await axios.get('http://localhost:5000/file-list');

            if (response.data.status === 200) {
                setFileList(response.data.data);
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error('Error fetching file list:', error.message);
        }
    };

    return (
        <div>
            <h2>File List</h2>
            <ul>
                {fileList.map((file) => (
                    <li key={file._id}>{file.fileName}</li>
                    // Assuming 'fileName' is the property containing the file name in your MongoDB document
                ))}
            </ul>
        </div>
    );
};

export default FileList;
