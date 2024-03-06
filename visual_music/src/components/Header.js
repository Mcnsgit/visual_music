import React from'react';
import { NavLink } from 'react-router-dom';

    const Header = () => {
    return (
        <div className='flex justify-center items-center'>
            <h1 className='text-3xl font-bold'>Visual Music</h1>
            <div className='flex gap-2'>
            <NavLink style={{textDecoration: 'underline', color: 'black', cursor: 'pointer', fontWeight: 'bold'}} to="/">Home</NavLink>
            <NavLink style={{textDecoration: 'underline', color: 'black', cursor: 'pointer', fontWeight: 'bold'}} to="/Visual_Music">Visual Music</NavLink>
            <NavLink style={{textDecoration: 'underline', color: 'black', cursor: 'pointer', fontWeight: 'bold'}} to="/Visual_Music/About">About</NavLink>
            <NavLink style={{textDecoration: 'underline', color: 'black', cursor: 'pointer', fontWeight: 'bold'}} to="/Visual_Music/login">login</NavLink>
            </div>
        </div>
    )
}

export default Header