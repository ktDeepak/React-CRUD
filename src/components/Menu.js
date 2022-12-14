import React from 'react';
import {NavLink} from 'react-router-dom'

function Menu(props){
    return(
        <nav className="navbar navbar-expand-md navbar-dark bg-secondary">
            <div className="container">
                <NavLink to={`/`} className="navbar-brand">TO DO APP </NavLink>
                <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#menu">
                    <span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="menu">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink to={`/home`} className="nav-link">Home</NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav justify-content-between"> 
                      <li className="nav-item">
                      <NavLink to={`/create`} className="nav-link">Create Task</NavLink>
                      </li>
                    </ul>
                    
                </div>
            </div>
        </nav>
    )
}
export default Menu