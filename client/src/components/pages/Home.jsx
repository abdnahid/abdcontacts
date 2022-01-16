import React,{useContext,useEffect} from "react";
import Contacts from "../allContacts/Contacts";
import AuthContext from "../../context/auth/AuthContext";
import ContactFilter from "../allContacts/ContactFilter";
import ContactForm from "../allContacts/ContactForm";

const Home = () => {
    const authContext = useContext(AuthContext);
    const {loadUser,isAuthenticated} = authContext;
    useEffect(()=>{
        loadUser();
        //eslint-disable-next-line
    },[isAuthenticated])
    
    
    return (
        <div className="grid-2">
        <div>
            <ContactForm />
        </div>
        <div>
            <ContactFilter />
            <Contacts />
        </div>
    </div>
    )
}

export default Home 
