import axios from "axios"
import { useEffect, useState } from "react"
import './style/User.css'


function User({fetchUsers,handleSubmit}) {

    const [usersList, setUsersList] = useState([])
    const [editId, setEditId] = useState(-1)
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [searchId,setSearchId] = useState('')





    const handleEdit = (id) => {
        setEditId(id);
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        const Data = {
            user: user,
            pass: pass
        }
        try {
            const res = await axios.put(`/api/update/${editId}`, Data)
            
            setUsersList(prevUsersList => prevUsersList.map(user => {
                if (user._id === editId) {
                    return res.data; // Assuming res.data is the updated user object
                }
                return user;
            }));
            console.log("User Updated Succ...")
        } catch (err) {
            console.log(err)
        }
        setEditId(-1)
    }

    // const handleSearch = () => {
    //     const searchUser = usersList.find(user => )
    // }

    useEffect(() => {
        axios.get('/api/get')
            .then((res) => {
                console.log("Received data:", res.data);
                setUsersList(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <>
            <h2>UserData</h2>
            <p>No of users : {usersList.length}</p>
            {/* <input type="text" placeholder="Search By User ID" onChange={(e)=> setSearchId(e.target.value)}/>
            <button onClick={handleSearch}>Search</button> */}

            <div className="App">
                <table>
                    <tr>
                        <th>Id</th>
                        <th>UserName</th>
                        <th>PassWord</th>
                        <th>Action</th>
                    </tr>
                    {usersList.map((user, key) => (
                        user._id === editId ?
                            <tr key={key}>
                                <td>{key + 1}</td>
                                <td><input type="text" onChange={(e) => setUser(e.target.value)} placeholder={user.user} /></td>
                                <td><input type="text" onChange={(e) => setPass(e.target.value)} placeholder={user.pass} /></td>
                                <td><button onClick={handleUpdate}>Update</button></td>
                            </tr>
                            :
                            <tr key={key}>
                                <td>{key + 1}</td>
                                <td>{user.user}</td>
                                <td>{user.pass}</td>
                                <td><button onClick={() => handleEdit(user._id)}>Edit</button></td>
                            </tr>
                    ))}
                </table>
            </div>


        </>
    )
}

export default User