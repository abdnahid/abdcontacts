import React,{useState,useContext,useEffect} from 'react'
import AlertContext from '../../context/alert/AlertContext';
import AuthContext from '../../context/auth/AuthContext';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);
    const {setAlert}=alertContext;
    const {registerUser,errors,clearErrors,isAuthenticated}=authContext;
    const navigate = useNavigate();

    useEffect(()=>{
        if (isAuthenticated) {
            navigate("/");
        }
        if (errors==="User already exists. Please login to continue") {
            setAlert(errors,"danger");
            clearErrors();
        }
        //eslint-disable-next-line
    },[errors,isAuthenticated])

    const [user,setUser]=useState({
        name:"",
        email:"",
        password: "",
        confirmPassword:""
    })
    const {name,email,password,confirmPassword}=user;
    const handleChange = (e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        if (name==="" || email === "" || password === "") {
            setAlert("Please Enter All fields","danger")
        }else if(password !== confirmPassword){
            setAlert("Passwords do not match","danger")
        }else{
            registerUser({
                name,
                email,
                password 
            })
        }
    }
    return (
        <div className='form-container'>
            <h1>Account <span className='text-primary'>Register</span></h1>
            <form className='form-group' onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" value={name} onChange={handleChange}/>
                <label htmlFor="email">email</label>
                <input type="email" name="email" id="email" value={email} onChange={handleChange}/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value={password} onChange={handleChange}/>
                <label htmlFor="name">Confirm Password</label>
                <input type="password" name="confirmPassword" id="confirmPassword" value={confirmPassword} onChange={handleChange}/>
                <input type="submit" value="Register" className='btn btn-block btn-primary' />
            </form>
        </div>
    )
}

export default Register
