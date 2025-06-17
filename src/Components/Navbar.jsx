import React, { use } from 'react';
import { Link, NavLink } from 'react-router-dom'; 
import { AuthContext } from '../Context/AuthContext';
import userProfile from '../assets/user.png';

const Navbar = () => {
    const { user, logOut } = use(AuthContext);

    const handleLogout = () => {
        logOut().then(() => {
            alert("You logged Out Successfully");
        }).catch((error) => {
            console.log(error);
        });
    };

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Bookshelf', path: '/bookshelf' },
        { name: 'Add Book', path: '/addbooks' },
        { name: 'My Books', path: '/mybooks' },
        { name: 'Profile', path: '/profile' },
    ];

    return (
        <div className="navbar bg-base-100 shadow-sm px-4">
            <div className="navbar-start">
                {/* Mobile Menu Button */}
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 mt-3 p-2 shadow rounded-box w-52 z-50"
                    >
                        {navItems.map(item => (
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
                        ))}
                        <li className="mt-2">
                            {user ? (
                                <button onClick={handleLogout} className="btn btn-sm w-full btn-error text-white">
                                    Sign Out
                                </button>
                            ) : (
                                <>
                                    <NavLink to="/login" className="btn btn-sm w-full mb-1 btn-neutral">Login</NavLink>
                                    <NavLink to="/register" className="btn btn-sm w-full btn-primary">Register</NavLink>
                                </>
                            )}
                        </li>
                    </ul>
                </div>

                <Link to="/" className="btn btn-ghost text-xl font-bold">BOOK SHELF</Link>
            </div>

            {/* Desktop Nav */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems.map(item => (
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
                    ))}
                </ul>
            </div>

            {/* Right-side Auth */}
            <div className="navbar-end hidden lg:flex items-center gap-4">
                <img className="w-10 h-10 rounded-full" src={user?.photoURL || userProfile} alt="user" />
                {user ? (
                    <button onClick={handleLogout} className="btn btn-error text-white">Sign Out</button>
                ) : (
                    <>
                        <NavLink to="/login" className="btn btn-neutral">Login</NavLink>
                        <NavLink to="/register" className="btn btn-primary">Register</NavLink>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
