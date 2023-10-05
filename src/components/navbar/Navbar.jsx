import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../api/AuthContext'

export default function Navbar() {
    const auth = useAuth()    
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid  align-items-center ">
                <h2 className="text-light" >Chicopee Ag Center</h2>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse  " id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto  ">
                        <li className="nav-item">
                            <NavLink className="nav-link " aria-current="page" to="/pending" >
                                <p data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">Pending</p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link " aria-current="page" to="/inventory" >
                                <p data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">Inventory</p>
                            </NavLink>
                        </li>
                        {auth.user && <li className="nav-item ">
                            <NavLink className="nav-link" to="/completed" >
                                <p data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">Completed</p>
                            </NavLink>
                        </li>
                        }
                        {!auth.user ?
                            <li className="nav-item ">
                                <NavLink className="nav-link" to="/login" >
                                    <p data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">Sign In</p>
                                </NavLink>
                            </li>
                            :
                            <li className="nav-item ">
                                <NavLink className="nav-link" to="/login" onClick={auth.logout} >
                                    <p data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">Sign Out</p>
                                </NavLink>
                            </li>
                        }
                    </ul>

                </div>
            </div>
        </nav>
    )
}
