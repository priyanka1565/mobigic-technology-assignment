import React, { useState } from 'react';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';

import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"
const Login = () => {
    const [first_name, setFirstName] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(first_name,last_name,phone,address,email);
        if (first_name !== " " && password !== "") {
            axios.post("https://mobigicbackend.onrender.com/user/register", { username: first_name, password: password }).then((res) => {
                if (res) {
                    toast.success(`${res?.data?.message}`)
                }
                navigate("/login")
            }).catch((err) => {
                toast.error(`${err}`)
            })
        }
        else {
            toast("please enter Valid details")
        }

    }

    const goToSignIn = () => {
        navigate("/login")
    }
    return (

        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>User Registration Form</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel> User Name</FormLabel>
                            <Input type="text"
                                onChange={(e) => setFirstName(e.target.value)}
                                value={first_name} />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password} />
                        </FormControl>
                        <Stack spacing={10}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justify={'space-between'}>
                                <Checkbox>Remember me</Checkbox>
                                <Link
                                    color={'blue.400'}
                                    onClick={goToSignIn}
                                >Already have a account</Link>
                            </Stack>
                            <Button onClick={handleSubmit}
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Sign Up
                            </Button>
                            <ToastContainer />
                        </Stack>
                    </Stack>
                </Box>
                <ToastContainer />
            </Stack>

        </Flex>
    );
}

export default Login