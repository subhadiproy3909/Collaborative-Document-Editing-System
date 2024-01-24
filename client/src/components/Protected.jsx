import { Navigate } from "react-router-dom";


import {EditorState} from '../context/ContextProvider';


const Protected = ({ children }) => {
    const {user, setUser} = EditorState();

    if(!user){
        return <Navigate to={'/login'} replace />
    }

    return children;
}


export default Protected;