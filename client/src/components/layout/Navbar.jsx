import React,{Fragment,useContext} from 'react';
import {MdArticle} from "react-icons/md";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import AuthContext from '../../context/auth/AuthContext';
import ContactContext from '../../context/contact/ContactContext';

const Navbar = (props) => {
    const authContext= useContext(AuthContext)
    const contactContext= useContext(ContactContext)
    const {isAuthenticated,logout,user}=authContext;
    const {clearContacts}=contactContext
    const handleLogout = ()=>{
        logout();
        clearContacts();
    }
    const loggedinLinks = (
        <Fragment>
            <li>Hello {user&&user.name}</li>
            <li> <a href="#!" onClick={handleLogout}><i className='fas fa-sign-out-alt'></i><span className='hide-sm'>Logout</span></a> </li>
        </Fragment>
    )
    const loggedoutLinks = (
        <Fragment>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
        </Fragment>
    )
    return (
        <div className="navbar bg-primary">
            <MdArticle className="large"/>
            <h1> {props.title} </h1>
            <ul>
                {isAuthenticated?loggedinLinks:loggedoutLinks}
            </ul>
        </div>
    )
}

Navbar.prototype = {
    title: PropTypes.string.isRequired
}

Navbar.defaultProps = {
    title: "Contact Keeper"
}



export default Navbar;
