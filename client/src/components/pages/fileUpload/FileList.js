import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Heading } from '@chakra-ui/react';
const FileList = () => {
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        // Fetch file list when the component mounts
        fetchFileList();
    }, []);

    const fetchFileList = async () => {
        try {
            const response = await axios.post('http://localhost:5000/user/file-list');
            console.log(response)

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
        <Box p="4" textAlign="center" overflowX="auto">
            <Heading as="h2" mb="4" size="xl" color="teal.500">
                File List
            </Heading>
            <Table variant="striped" colorScheme="teal" size="sm" borderWidth="1px" borderColor="teal.500">
                <Thead>
                    <Tr>
                        <Th borderWidth="1px" borderColor="teal.500">ID</Th>
                        <Th borderWidth="1px" borderColor="teal.500">File Name</Th>
                        {/* Add more table headers based on your data structure */}
                    </Tr>
                </Thead>
                <Tbody>
                    {fileList.map((file) => (
                        <Tr key={file._id}>
                            <Td borderWidth="1px" borderColor="teal.500">{file._id}</Td>
                            <Td borderWidth="1px" borderColor="teal.500">{file.file_path}</Td>
                            {/* Add more table cells based on your data structure */}
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};

export default FileList;
