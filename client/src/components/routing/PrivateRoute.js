import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';

const PrivateRoute = (props) => {
    const authContext = useContext(AuthContext);
    const {isAuthenticated,loading}=authContext;
    const navigate = useNavigate();
    return (
            !isAuthenticated && !loading ? navigate("/login") : props.element
    )
}

export default PrivateRoute
