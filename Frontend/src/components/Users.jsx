import axios from "axios"
import { useEffect, useState } from "react"
import './style/Users.css'
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import EditModal from "./EditModal";


function User() {

    const [usersRecord, setUsersRecord] = useState([])
    const [usersList, setUsersList] = useState([])
    const [editId, setEditId] = useState(-1)
    const [deleteId, setDeleteId] = useState(-1)
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [searchId, setSearchId] = useState(0)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)







    const fetchData = async () => {
        axios.get('/api/get')
            .then((res) => {
                console.log("Received data:", res.data);
                setUsersRecord(res.data)
                setUsersList(res.data)

            })
            .catch((err) => {
                console.log(err)
            })
    }


    const handleEditId = (id) => {
        try {
            const user = usersList.find((user) => user.id === id);
            if (user) {
                // setEditId(id);
                // setName(user.name)
                // setAge(user.age)
                // setPhone(user.phone)
                // setAddress(user.address)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleDelete = async (id) => {
        console.log(id)
        try {
            await axios.delete(`/api/delete/${id}`)
            console.log("User Deleted Succc...")
            setUsersList(usersList.filter(user => user.id !== id))
        } catch (err) {
            console.log(err)
        }
    }

    // const handleUpdate = async (e) => {
    //     e.preventDefault()

    //     const Data = {
    //         name: name,
    //         age: age,
    //         phone: phone,
    //         address: address
    //     }
    //     try {
    //         const res = await axios.put(`/api/update/${editId}`, Data)
    //         console.log(res.data)
    //         setUsersList(prevUsersList => prevUsersList.map(user => {
    //             if (user.id === editId) {
    //                 return res.data; // Assuming res.data is the updated user object
    //                 console.log(res.data)
    //             }
    //             return user;
    //         }));
    //         console.log("User Updated Succ...")
    //     } catch (err) {
    //         console.log(err)
    //     }
    //     setEditId(-1)
    // }

    const handleSearch = (e) => {
        try {
            console.log("User Is Found...")
            setUsersList(usersRecord.filter(user => String(user.id).includes(e.target.value) || user.name.toLowerCase().includes(e.target.value) || String(user.age).includes(e.target.value) || String(user.phone).includes(e.target.value) || user.address.toLowerCase().includes(e.target.value)))
        } catch (err) {
            console.log(err)
        }
    }


    const handleEditClick = (user) => {
        setShowEditModal(true);
        setSelectedUser(user)
    };

    const handleCloseModal = () => {
        setShowEditModal(false);
    };

    const handleUpdateUser = (updatedUser) => {
        setUsersList((prevUsers) => 
            prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
        );
        // setShowEditModal(false);
    };

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <h2 className='item'>Users Lists</h2>
            <input type="string" placeholder='Search Id' onChange={handleSearch} />
            {/* <label htmlFor=""><button onClick={handleSearch}>Search</button></label> */}
            <p>No of users : {usersList.length}</p>

            <div className="App">
                <table>
                    <tbody>
                        <tr>
                            <th>Id</th>
                            <th>UserName</th>
                            <th>Age</th>
                            <th>PhoneNo.</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                        {usersList.map((user, key) => (
                            // user.id === editId ?
                            //     <tr key={user.id}>
                            //         <td>{user.id}</td>
                            //         <td><input type="text" value={name} onChange={(e) => setName(e.target.value)} /></td>
                            //         <td><input type="number" value={age} onChange={(e) => setAge(e.target.value)} /></td>
                            //         <td><input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} /></td>
                            //         <td><input type="text" value={address} onChange={(e) => setAddress(e.target.value)} /></td>
                            //         <td><button onClick={handleUpdate}>Update</button></td>
                            //     </tr>
                            //     :
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.age}</td>
                                <td>{user.phone}</td>
                                <td>{user.address}</td>
                                <td><button onClick={() => handleEditClick(user)}>Edit</button><button onClick={() => handleDelete(user.id)}>Delete</button></td>
                                {showEditModal && <EditModal 
                                    open={showEditModal} 
                                    data={selectedUser} 
                                    close={() => setShowEditModal(false)}
                                    updateUser = {handleUpdateUser} 
                                    />}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


        </>
    )
}

export default User