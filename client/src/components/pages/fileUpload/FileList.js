import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box, Table, Thead, Tbody, Tr, Th, Td, Heading, Card, Text, Flex,Button } from '@chakra-ui/react';
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

    const handleRemoveFile = async (fileId) => {
        try {
            // Send a request to your server to remove the file
            const response = await axios.delete(`http://localhost:5000/user/remove-file/${fileId}`);

            if (response.data.status === 200) {
                // Refresh the file list after successful removal
                fetchFileList();
                console.log('File removed successfully');
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error('Error removing file:', error.message);
        }
    };

    return (
        <Box p="4">
            <Card boxShadow="lg" borderRadius="md" p="6">
                <Heading as="h2" mb="4" size="xl" color="teal.500">
                    File List
                </Heading>
                <Table variant="simple" colorScheme="teal" size="sm" borderWidth="1px" borderColor="teal.500">
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
                                <Td borderWidth="1px" borderColor="teal.500">
                                    <Flex align="center">
                                        <Text fontWeight="bold">{file.file_path}</Text>
                                    </Flex>
                                </Td>
                                <Td>
                                    <Button colorScheme="red" size="sm" onClick={() => handleRemoveFile(file._id)}>
                                        Remove
                                    </Button>
                                </Td>
                                {/* Add more table cells based on your data structure */}
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Card>
        </Box>
    );
};

export default FileList;
