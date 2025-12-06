import React from 'react';
import Logo from '../Components/Logo/Logo';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div>
            <div className='bg-black max-w-7xl mx-auto'>
                <Logo></Logo>
            </div>
            <Outlet></Outlet>
        </div>
    );
};

export default AuthLayout;