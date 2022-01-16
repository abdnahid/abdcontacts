import React,{useState,useContext,useEffect} from 'react'
import AlertContext from '../../context/alert/AlertContext';
import AuthContext from '../../context/auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const alertContext = useContext(AlertContext);
    const navigate = useNavigate();
    const {setAlert}=alertContext;
    const authContext=useContext(AuthContext);
    const {login,isAuthenticated,errors,clearErrors}=authContext;
    const [fields,setFields]=useState({
        email:"",
        password:""
    })
    const {email,password}=fields;
    useEffect(()=>{
        if (isAuthenticated) {
            navigate("/");
        }
        if (errors==="invalid credentials") {
            setAlert(errors,"danger");
            clearErrors();
        }
        //eslint-disable-next-line
    },[errors,isAuthenticated])
    const handleChange = (e)=>{
        setFields({...fields,[e.target.name]:e.target.value})
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        if (email === "" || password === "") {
            setAlert("Please Enter All fields","danger")
        }else{
            login({
                email,
                password
            });
        }
    }
    return (
        <div className='form-container'>
            <h1>
                Account <span className='text-primary'>Login</span>
            </h1>
            <form className='form-group' onSubmit={handleSubmit}>
                <label htmlFor="email">email</label>
                <input type="email" name="email" id="email" value={email} onChange={handleChange}/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value={password} onChange={handleChange}/>
                <input type="submit" value="Login" className='btn btn-block btn-primary' />
            </form>
        </div>
    )
}

export default Register
