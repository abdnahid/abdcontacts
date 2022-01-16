import React, { useReducer } from "react";
import ContactContext from "./ContactContext";
import ContactReducer from "./ContactReducer";
import axios from "axios";
import { CLEAR_FILTER,FILTER_CONTACTS,CLEAR_CONTACTS,GET_CONTACTS,ADD_CONTACTS,CLEAR_CURRENT,DELETE_CONTACTS,UPDATE_CONTACTS,SET_CURRENT,CONTACT_ERROR } from "../types";

const ContactState = props => {
    const initialState = {
        contacts: [],
        current:null,
        filtered:null,
        error:null
    };
    
    const [state,dispatch]=useReducer(ContactReducer,initialState);

    //Add contacts
    const addContact = async (contact)=>{
        const config={
            headers:{
                "Content-Type":"application/json"
            }
        }
        const res = await axios.post("api/contacts",contact,config)
        try {
            dispatch({type:ADD_CONTACTS,payload:res.data});
        } catch (err) {
            dispatch({type:CONTACT_ERROR,payload:err.response.msg})
        }
        
    }
    //get contacts
    const getContacts = async ()=>{
        const res = await axios.get("api/contacts")
        try {
            dispatch({type:GET_CONTACTS,payload:res.data});
        } catch (err) {
            dispatch({type:CONTACT_ERROR,payload:err.response.msg})
        }
        
    }
    //clear contacts
    const clearContacts = ()=>{
        dispatch({type:CLEAR_CONTACTS});
    }
    
    //delete contacts
    const deleteContact = async (id)=>{
        await axios.delete(`api/contacts/${id}`);
        try {
            dispatch({type:DELETE_CONTACTS,payload:id});
        } catch (err) {
            dispatch({type:CONTACT_ERROR,payload:err.response.msg})
        }
    }
    //update contacts
    const updateContact =async (contact)=>{
        const config={
            headers:{
                "Content-Type":"application/json"
            }
        }
        const res= await axios.put(`api/contacts/${contact._id}`,contact,config);
        try {
            dispatch({type:UPDATE_CONTACTS,payload:res.data});
        } catch (err) {
            dispatch({type:CONTACT_ERROR,payload:err.response.msg})
        }
    }
    //set current
    const setCurrent = (contact)=>{
        dispatch({type:SET_CURRENT,payload:contact});
    }
    //clear current
    const clearCurrent = ()=>{
        dispatch({type:CLEAR_CURRENT});
    }
    //filter contacts
    const filterContact = (text)=>{
        dispatch({type:FILTER_CONTACTS,payload:text});
    }
    //filter current
    const clearFilter = ()=>{
        dispatch({type:CLEAR_FILTER});
    }
    return (
        <ContactContext.Provider value={{
                contacts:state.contacts,
                current:state.current,
                filtered:state.filtered,
                error:state.error,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                filterContact,
                clearFilter,
                getContacts,
                clearContacts
            }} >
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState