import axios from "axios"
import { useEffect, useState } from "react"
import './style/Users.css'


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
        try{
            const user = usersList.find((user) => user.id === id);
            if (user) {
                setEditId(id);
                setName(user.name)
                setAge(user.age)
                setPhone(user.phone)
                setAddress(user.address)
            }
        }catch(err){
            console.log(err)
        }
    }

    const handleDelete = async (id) => {
        console.log(id)
        try{
            await axios.delete(`/api/delete/${id}`)
            console.log("User Deleted Succc...")
            setUsersList(usersList.filter(user => user.id !== id))
        }catch(err){
            console.log(err)
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        
        const Data = {
            name : name,
            age : age,
            phone : phone,
            address : address
        }
        try {
            const res = await axios.put(`/api/update/${editId}`, Data)
            console.log(res.data)
            setUsersList(prevUsersList => prevUsersList.map(user => {
                if (user.id === editId) {
                    return res.data; // Assuming res.data is the updated user object
                    console.log(res.data)
                }
                return user;
            }));
            console.log("User Updated Succ...")
        } catch (err) {
            console.log(err)
        }
        setEditId(-1)
    }

    const handleSearch = (e) => {
        console.log(e.target.value)
        console.log(typeof(e.target.value))
        try{
            console.log("User Is Found...")
            setUsersList(usersRecord.filter(user => user.name.toLowerCase().includes(e.target.value)))
            
            console.log(usersList)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <h2 className='item'>Users Lists</h2>
            <input type="text" placeholder='Search Id' onChange={handleSearch}/>
            {/* <label htmlFor=""><button onClick={handleSearch}>Search</button></label> */}
            <p>No of users : {usersList.length}</p>

            <div className="App">
                <table>
                    <tr>
                        <th>Id</th>
                        <th>UserName</th>
                        <th>Age</th>
                        <th>PhoneNo.</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                    {usersList.map((user, key) => (
                        user.id === editId ?
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td><input type="text" value={name} onChange={(e) => setName(e.target.value)}/></td>
                                <td><input type="number" value={age} onChange={(e) => setAge(e.target.value)}/></td>
                                <td><input type="number" value={phone} onChange={(e) => setPhone(e.target.value)}/></td>
                                <td><input type="text" value={address} onChange={(e) => setAddress(e.target.value)}/></td>
                                <td><button onClick={handleUpdate}>Update</button></td>
                            </tr>
                            :
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.age}</td>
                                <td>{user.phone}</td>
                                <td>{user.address}</td>
                                <td><button onClick={() => handleEditId(user.id)}>Edit</button><button onClick={() => handleDelete(user.id)}>Delete</button></td>
                            </tr>
                    ))}
                </table>
            </div>


        </>
    )
}

export default User