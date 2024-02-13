import { createContext, useContext, useEffect, useState } from "react";


import { checkAuthApi } from "../Api/userApi";

const context = createContext();

const Provider = ({children}) => {
    const [user, setUser] = useState(null);
    const [doc, setDoc] = useState(null);
    const [checkUser, setCheckUser] = useState(false);

    return (
        <context.Provider value={{user, setUser, doc, setDoc, checkUser, setCheckUser}}>
            {children}
        </context.Provider>
    );
}

export const EditorState = () => {
    return useContext(context);
}

export default Provider