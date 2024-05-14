import { useEffect, useState} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

import './style/Users.css'

function AddUser() {
    const [userId,setUserId] = useState(1210)
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')


    const navigate = useNavigate();

    const fetchUsers = () => {
        // Fetch users from your API or any data source
        // Example API call:
        axios.get('/api/get')
            .then((res) => {
                setUsersList(res.data)
            })
            .catch(error => console.error('Error fetching users:', error));
    };

    // useEffect(() => {
    //     fetchUsers();
    // }, [])



    const handleSubmit = async (e) => {
        e.preventDefault();
        setUserId((p)=>p+1)
        console.log(userId)
        const Data = {
            id : userId,
            name: name,
            age: age,
            phone: phone,
            address: address
        }
        try {
            const res = await axios.post('/api/create', Data)
            // setName('')
            // setAge('')
            // setPhone('')
            // setAddress('')
            // fetchUsers()
            navigate('/')
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




