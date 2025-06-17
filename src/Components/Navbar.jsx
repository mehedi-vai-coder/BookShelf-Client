import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import userProfile from '../assets/user.png'
const Navbar = () => {
    const { user, logOut } = use(AuthContext);
    const handleLogout = () => {
        logOut().then(() => {
            alert("You logged Out Successfully")
        }).catch((error) => {
            console.log(error)
        })
    };
    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Bookshelf', path: '/bookshelf' },
        { name: 'Add Book', path: '/addbooks' },
        { name: 'My Books', path: '/mybooks' },
        { name: 'Profile', path: '/profile' },
    ];
    const links = navItems.map((item) => (
        <li key={item.path}>
            <NavLink
                to={item.path}
                className={({ isActive }) =>
                    isActive ? 'text-blue-600 font-bold underline' : ''
                }
            >
                {item.name}
            </NavLink>
        </li>
    ));

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl font-bold">BOOK SHELF</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end gap-4">
                <img className="w-12 rounded-full" src={`${user ? user.photoURL
                    : userProfile}`} alt="" />
                {
                    user ? <button onClick={handleLogout} className="btn btn-circle px-10 " >SignOut</button> :
                        <>
                            <NavLink className='btn btn-neutral' to='/login'>Login</NavLink>
                            <NavLink className='btn btn-primary' to='/register'>Register</NavLink>
                        </>
                }

            </div>
        </div>
    );
};

export default Navbar;