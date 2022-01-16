import React, { Fragment } from 'react';
import Loader from "./loading.gif";

const Spinner = () => {
    return (
        <Fragment>
            <img 
                src={Loader} 
                style={{width:"200px",display:"block",margin:"auto"}} 
                alt="loading..." 
            />
        </Fragment>
    )
}

export default Spinner
