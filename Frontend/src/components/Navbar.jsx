import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <>
            <div className='navbar'>

                <br />
                
                    <Link to="/"><button>Users Lists</button></Link>
                    <Link to="/create"><button>Add New User</button></Link>
            </div>

        </>
    )

}

export default Navbar