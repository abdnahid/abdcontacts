import React,{useState, useContext,useEffect} from 'react';
import ContactContext from '../../context/contact/ContactContext';

const ContactForm = () => {
    const context=useContext(ContactContext);
    const [contact,setContact]=useState({
        name:"",
        email:"",
        phone:"",
        type:"personal"
    })
    const {name,email,phone,type}=contact;
    const {addContact,current,clearCurrent,updateContact}=context;
    useEffect(()=>{
        if (current !== null) {
            setContact(current)
        }else{
            setContact({
                name:"",
                email:"",
                phone:"",
                type:"personal"
            });
        }
    },[context,current]);
    const handleChange=(e)=>{
        setContact({...contact,[e.target.name]:e.target.value})
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        if (current) {
            updateContact(contact);
        }else{
            addContact(contact);
        }
        
        setContact({
            name:"",
            email:"",
            phone:"",
            type:"personal"
        });
    }
    const clearAll=()=>{
        clearCurrent();
    }
    return (
        <form onSubmit={handleSubmit}>
            <h3>{current?"Edit "+current.name:"Add a new contact"}</h3>
            <input name="name" type="text" placeholder="Enter contact name" value={name} onChange={handleChange} />
            <input name="email" type="email" placeholder="Enter Email address"  value={email} onChange={handleChange} />
            <input name="phone" type="text" placeholder="Enter phone No"  value={phone} onChange={handleChange} />
            
            <div>
                <label htmlFor="type">Select Contact Type</label><br/>
                <input type="radio" id="personal" name="type" value="personal" onChange={handleChange} checked={type==="personal"&&true} />
                <label htmlFor="personal" className="mx">Personal</label>
                <input type="radio" id="business" name="type" value="business" onChange={handleChange} checked={type==="business"&&true}/>
                <label htmlFor="business" className="mx">Business</label>
            </div>

            <div>
                <button className="btn btn-primary btn-block my-1" type="submit">{current?"Update":"Add contact"}</button>
                {current&&<button className="btn btn-block btn-light" onClick={clearAll}>Clear</button>}
            </div>
        </form>
    )
}

export default ContactForm;
