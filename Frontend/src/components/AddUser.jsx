
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import * as React from 'react';
import { Modal, Box, Button, TextField, Typography } from '@mui/material';

import './style/Users.css'

function AddUser() {
    const [userId, setUserId] = useState(20042)
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [usersList, setUsersList] = useState('')
    const [lastId, setLastId] = useState(1)





    const navigate = useNavigate();

    const fetchUsers = async () => {
        // Fetch users from your API or any data source
        // Example API call:
        try {
            const res = await axios.get('/api/get');
            if (res.data.length > 0) {
                const lastUser = res.data[res.data.length - 1];
                // setLastId(lastUser.id);
                setUserId(lastUser.id + 1);
                // setUsersList(res.data);
            }
        } catch (err) {
            console.error('Error fetching users:', err)
        }
    };

    useEffect(() => {
        fetchUsers()

    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const Data = {
            id: userId,
            name: name,
            age: age,
            phone: phone,
            address: address
        }
        try {
            await axios.post('/api/create', Data)
            setUserId(userId + 1)
            setName('')
            setAge('')
            setPhone('')
            setAddress('')
            // fetchUsers()
            navigate('/')
            console.log("user is created")
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <h2>User Registration</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">Full Name : </label>
                <input type="text" onChange={(e) => setName(e.target.value)} placeholder='Enter Your Name' />
                <br />
                <label htmlFor="">Age : </label>
                <input type="number" onChange={(e) => setAge(e.target.value)} placeholder='Enter Your Age' />
                <br />
                <label htmlFor="">Phone No : </label>
                <input type="number" onChange={(e) => setPhone(e.target.value)} placeholder='Enter Phone Number' />
                <br />
                <label htmlFor="">Address : </label>
                <input type="text" onChange={(e) => setAddress(e.target.value)} placeholder='Enter Address' />
                <br />
                <br />
                <button type="submit">Submit</button>
            </form>

           


        </>
    )

}

export default AddUser




