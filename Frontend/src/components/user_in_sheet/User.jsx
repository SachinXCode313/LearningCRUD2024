import axios from "axios"
import { useEffect, useState } from "react"
import './style/User.css'


function User({fetchUsers,handleSubmit}) {

    const [usersList, setUsersList] = useState([])
    const [editId, setEditId] = useState(-1)
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [searchId,setSearchId] = useState('')

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



    const handleEdit = (id) => {
        setEditId(id);
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        const updatedUser = {
            user: user,
            pass: pass
        }
        try {
            const res = await axios.put(`/api/update/${editId}`, updatedUser)

            setUsersList(prevUsersList => prevUsersList.map((user,key) => {
                key = key + 1
                if (key === editId) {
                    user[0] = res.data[0][0]
                    user[1] = res.data[0][1]
                }
                return user;
            }));
            console.log("User Updated Succ...")
        } catch (err) {
            console.log(err)
        }
        console.log(editId)
        setEditId(-1)
    }

    // const handleSearch = () => {
    //     const searchUser = usersList.find(user => )
    // }



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
                        key+1 === editId ?
                            <tr key={key+1}>
                                <td>{key + 1}</td>
                                <td><input type="text" onChange={(e) => setUser(e.target.value)} placeholder={user[0]} /></td>
                                <td><input type="text" onChange={(e) => setPass(e.target.value)} placeholder={user[1]} /></td>
                                <td><button onClick={handleUpdate}>Update</button></td>
                            </tr>
                            :
                            <tr key={key+1}>
                                <td>{key+1}</td>
                                <td>{user[0]}</td>
                                <td>{user[1]}</td>
                                <td><button onClick={() => handleEdit(key+1)}>Edit</button></td>
                            </tr>
                    ))}
                </table>
            </div>


        </>
    )
}

export default User