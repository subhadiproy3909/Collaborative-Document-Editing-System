import { createContext, useContext, useEffect, useState } from "react";


import { checkAuthApi } from "../Api/userApi";

const context = createContext();

const Provider = ({children}) => {
    const [user, setUser] = useState(null);
    const [doc, setDoc] = useState(null);

    return (
        <context.Provider value={{user, setUser, doc, setDoc}}>
            {children}
        </context.Provider>
    );
}

export const EditorState = () => {
    return useContext(context);
}

export default Provider