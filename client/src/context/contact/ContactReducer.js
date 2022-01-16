import { CLEAR_FILTER,CLEAR_CONTACTS,GET_CONTACTS,ADD_CONTACTS,CLEAR_CURRENT,DELETE_CONTACTS,UPDATE_CONTACTS,SET_CURRENT,CONTACT_ERROR, FILTER_CONTACTS } from "../types";

const ContactReducer = (state,action) => {
    switch (action.type) {
        case ADD_CONTACTS:
            return {...state,contacts:[...state.contacts,action.payload],loading:false}
        case GET_CONTACTS:
            return {...state,contacts:action.payload,loading:false}
        case CLEAR_CONTACTS:
            return {contacts:[],filtered:null,error:null,current:null,loading:false}
        case UPDATE_CONTACTS:
            return {...state,contacts:state.contacts.map((contact)=> (contact._id === action.payload._id?action.payload:contact)),loading:false}
        case FILTER_CONTACTS:
            return {...state,filtered:state.contacts.filter((contact)=>{
                const regex = new RegExp(`${action.payload}`,"gi");
                return contact.name.match(regex) || contact.email.match(regex)
            })}
        case DELETE_CONTACTS:
            return {...state,contacts:state.contacts.filter((contact)=> contact._id !== action.payload),loading:false}
        case SET_CURRENT:
            return {...state,current:action.payload,loading:false}
        case CLEAR_CURRENT:
            return {...state,current:null,loading:false}
        case CLEAR_FILTER:
            return {...state,filtered:null,loading:false}
        case CONTACT_ERROR:
            return {...state,error:action.payload,loading:false}
        default:
            return state
    }
}

export default ContactReducer
