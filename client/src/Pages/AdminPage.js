import React, { useContext } from 'react'

import AuthContext from '../context/AuthContext'

import { useNavigate } from "react-router-dom";



function AdminPage() {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();


    return (
        <div className="token">
            <h1>You Is Authorization</h1>
            <button onClick={() => { navigate('/'); logout() }}>Log Out</button>
        </div>
    );
}

export default AdminPage;
