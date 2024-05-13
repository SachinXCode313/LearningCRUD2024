import { useEffect, useState } from 'react'
import axios from 'axios';
import './style/User.css'
import User from './User.jsx'

function CreateUser() {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [usersList, setUsersList] = useState([])
  const [editId, setEditId] = useState(-1)

  const fetchUsers = () => {
    // Fetch users from your API or any data source
    // Example API call:
    axios.get('/api/get')
      .then((res) => {
        setUsersList(res.data)
        console.log(typeof(usersList));
      })
      .catch(error => console.error('Error fetching users:', error));
  };

  useEffect( () => {
    // axios.get('/api/get')
    //   .then((res) => {
    //     setUsersList(res.data)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
    fetchUsers();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const Data = {
      user: user,
      pass: pass
    }
    try {
      const res = await axios.post('/api/create', Data)
      fetchUsers()
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <h2>UserLogin</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Username : </label>
        <input type="text" onChange={(e) => setUser(e.target.value)} placeholder='Enter A Username' />
        <br />
        <label htmlFor="">Password : </label>
        <input type="text" onChange={(e) => setPass(e.target.value)} placeholder='Enter A Password' />
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>

      <User fetchUsers={fetchUsers} handleSubmit={handleSubmit}/>  

      {/* <button onClick={sendDataToBackend}>submit 2</button> */}
    </>
  )

}

export default CreateUser




