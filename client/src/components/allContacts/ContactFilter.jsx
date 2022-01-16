import React,{useContext, useState,useEffect} from 'react';
import ContactContext from '../../context/contact/ContactContext';

const ContactFilter = () => {
    const context = useContext(ContactContext)
    const [text,setText] = useState("");
    const {filterContact,clearFilter,filtered} = context

    useEffect(() => {
        if (filtered===null) {
            setText("")
        }
    },[filtered])

    const handleChange = (e)=>{
        setText(e.target.value)
        console.log(text)
        if (text !=="") {
            filterContact(text);
        }else{
            clearFilter();
        }
    }
    return (
        <form>
            <input type="text" value={text} onChange={handleChange} placeholder="Search by name or email..."/>
        </form>
    )
}

export default ContactFilter
