import React,{useContext} from 'react'
import ContactContext from '../../context/contact/ContactContext';

const ContactItems = ({contact}) => {
    const context = useContext(ContactContext);
    const {_id,name,email,phone,type}=contact;
    const handleDelete = ()=>{
        context.deleteContact(_id);
        context.clearCurrent(_id);
    }
    const handleCurrent = ()=>{
        context.setCurrent(contact)
    }
    return (
        <div className="card bg-light">
            <h3 className="text-primary text-left">
                {name} <span className={ "badge "+(type==="business"?"badge-success":"badge-primary")} style={{float:"right"}}>{type}</span>
            </h3>
            <ul className="list">
                {email&&<li><i className="fas fa-envelope"></i> {email}</li>}
                {phone&&<li><i className="fas fa-phone-alt"></i> {phone}</li>}
            </ul>
            <div>
                <button className="btn btn-dark btn-sm" type="submit"  name="delete" onClick={handleDelete}>Delete</button>
                <button className="btn btn-danger btn-sm" type="submit" name="edit" onClick={handleCurrent}>Edit</button>
            </div>
        </div>
    )
}

export default ContactItems
