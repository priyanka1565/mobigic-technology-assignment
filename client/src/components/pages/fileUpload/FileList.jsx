import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box, Table, Thead, Tbody, Tr, Th, Td, Heading, Card, Text, Flex, Button, Input, Link, Image, Toast
} from '@chakra-ui/react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const FileList = () => {
    const [fileList, setFileList] = useState([]);
    const [code, setCode] = useState('');
    const [downloadLink, setDownloadLink] = useState('');

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

    const handleDownload = async () => {
        try {
            if (code !== "" && code !== undefined) {
                await axios.post("http://localhost:5000/user/download", { code: code }).then((res) => {
                    console.log(res?.data?.data?.length, "length")
                    console.log(res?.data.message)
                    if (res?.data?.data?.length > 0) {
                        const imageUrl = res?.data?.data[0]?.file_path
                        window.open(imageUrl, '_blank');
                    }
                    else {
                        toast.error(`${res?.data.message}`)
                    }
                }).catch((err) => {
                    console.log(err)
                })
            }
            else {
                toast.error("Please enter valid file code")
            }

        } catch (error) {
            throw new error()
        }
    };

    const handleCodeChange = (e) => {
        setCode(e.target.value);
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
                            <Th borderWidth="1px" borderColor="teal.500">File ID</Th>
                            <Th borderWidth="1px" borderColor="teal.500">File Image</Th>
                            <Th borderWidth="1px" borderColor="teal.500">File Remove</Th>
                            <Th borderWidth="1px" borderColor="teal.500">File Download</Th>
                            <Th borderWidth="1px" borderColor="teal.500">File Unique Code</Th>
                            {/* Add more table headers based on your data structure */}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {fileList.map((file) => (
                            <Tr key={file._id}>
                                <Td borderWidth="1px" borderColor="teal.500">{file._id}</Td>
                                <Td borderWidth="1px" borderColor="teal.500">
                                    <Flex align="center">
                                        <Image borderRadius="md"
                                            boxShadow="md"
                                            objectFit="cover"
                                            maxH="100px"
                                            fontWeight="bold" src={file.file_path} alt='image'></Image>
                                    </Flex>
                                </Td>

                                <Td>
                                    <Button colorScheme="red" size="sm" onClick={() => handleRemoveFile(file._id)}>
                                        Remove
                                    </Button>
                                </Td>
                                <Td borderWidth="1px" borderColor="teal.500">
                                    <Box borderWidth="1px" borderColor="teal.500" p="4">
                                        <Heading as="h2" mb="2" size="md" color="teal.500">
                                            File Download
                                        </Heading>
                                        <Input
                                            type="number"
                                            value={code}
                                            onChange={handleCodeChange}
                                            placeholder="Enter code"
                                            mb="2"
                                        />
                                        <Button onClick={() => handleDownload()} colorScheme="teal" mb="2">
                                            Download
                                        </Button>
                                        <Box>
                                            <p>Download Link:</p>
                                            <Link target="_blank" rel="noopener noreferrer" color="teal.500">
                                                Download File
                                            </Link>
                                        </Box>
                                    </Box>
                                </Td>
                                <Td>
                                    <Box>
                                        <Text fontWeight="bold">{file.unique_id}</Text>
                                    </Box>
                                </Td>


                            </Tr>

                        ))}
                    </Tbody>
                </Table>
            </Card>
            <ToastContainer />
        </Box>

    );
};
export default FileList;
