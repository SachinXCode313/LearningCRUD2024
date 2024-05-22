import { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import * as React from 'react';
import { Modal, Box, Button, TextField, Typography, Dialog, private_excludeVariablesFromRoot, stepContentClasses } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 90,
    p: 4,
    borderRadius: '20px'
};



function EditModal(prop) {
    const [name, setName] = useState(prop.data.name)
    const [age, setAge] = useState(prop.data.age)
    const [phone, setPhone] = useState(prop.data.phone)
    const [address, setAddress] = useState(prop.data.address)
    const [usersList, setUsersList] = useState('')
    const [lastId, setLastId] = useState(1)
    const [editId, setEditId] = useState(prop.data.id)
    

    const [open, setOpen] = useState(prop.open);

    const handleClose = () => {
        setOpen(false)
        prop.close(false)
    }

    useEffect(() => {
        try {
            axios.get('/api/get')
                .then((res) => {
                    setUsersList(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        } catch (err) {
            console.log(err)
        }
    })

       const handleUpdate = async (e) => {
        e.preventDefault()

        const Data = {
            name: name,
            age: age,
            phone: phone,
            address: address
        }
        try {
            const res = await axios.put(`/api/update/${editId}`, Data)
            setUsersList(prevUsersList => prevUsersList.map((user) => (user.id === editId ? res.data : user)))
            prop.updateUser(res.data)
            console.log("User Updated Succ...")
            handleClose()
        } catch (err) {
            console.log(err)
        }
        setEditId(-1)
    }

    return (
        <>

            <Modal
                open={open || prop.open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        User Information Form
                    </Typography>
                    <form onSubmit={handleUpdate}>
                        <TextField
                            label="Name"
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            label="Age"
                            name="age"
                            type="number"
                            onChange={(e) => setAge(e.target.value)}
                            value={age}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            label="Phone"
                            name="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            fullWidth
                            margin="normal"
                            variant="outlined"

                        />
                        <TextField
                            label="Address"
                            name="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                        <Button type='submit' onClick={close} variant="contained" color="primary" sx={{ mt: 2 }}>Update</Button>
                    </form>
                </Box>
            </Modal>

        </>
    )
}

export default EditModal


















