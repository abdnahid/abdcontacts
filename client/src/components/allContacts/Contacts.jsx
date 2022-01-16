import React,{useContext,useEffect,Fragment} from 'react';
import ContactContext from '../../context/contact/ContactContext';
import ContactItems from './ContactItems';
import Spinner from '../layout/Spinner';

const Contacts = () => {
    const context = useContext(ContactContext)
    const {contacts,filtered,loading,getContacts}=context;

    useEffect(()=>{
        getContacts();
        //eslint-disable-next-line
    },[])
    if (contacts !== null && contacts.length === 0 && !loading) {
        return <h4>Please add contacts</h4>
    }
    return (
        <Fragment>
            { contacts !== null && !loading ? (
                <Fragment>
                    {filtered===null?contacts.map(contact => <ContactItems contact={contact} key={contact._id}/>):filtered.map(contact => <ContactItems contact={contact} key={contact._id}/>)}
                </Fragment>
            ) : Spinner}
        </Fragment>    
    )
}

export default Contacts
