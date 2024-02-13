import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io } from "socket.io-client";
import Quill from 'quill';
import 'quill/dist/quill.snow.css';


import { EditorState } from '../context/ContextProvider';
import { openDocumentApi, saveDocumentApi, changeTitleApi } from '../Api/docmentApi';


var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['image', 'blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']                                         // remove formatting button
];

let timeout;

const Editor = ({ handleOpenEditor }) => {
    const { id } = useParams();
    const {user, setUser} = EditorState();
    const [value, setValue] = useState(null);
    const [socket, setSocket] = useState(null);
    const [quill, setQuill] = useState(null);
    const [title, setTitle] = useState("");


    const wrapperRef = useCallback((wrapper) => {
        if (wrapper == null) return;
        wrapper.innerHTML = "";
        const editor = document.createElement("div");
        wrapper.append(editor)
        const quillServer = new Quill(editor, { theme: "snow", modules: { toolbar: toolbarOptions } });
        setQuill(quillServer);
    }, []);

    useEffect(() => {
        const socketServer = io("http://localhost:5005");
        setSocket(socketServer);
        console.log("socket");

        return () => {
            socketServer.disconnect();
        }
    }, []);


    useEffect(() => {
        if (socket == null || quill == null) return
        const writeOnWhiteSpace = async function (id) {
            const response = await openDocumentApi(id,user?.email);
            // console.log(`open doc data: ${response.data}`);
            quill && quill.setContents(response.data)
            setValue(response.data);
            setTitle(response.title);
        }
        socket.once("load-document", async (id) => {
            await writeOnWhiteSpace(id);
        })

        socket.emit("open-document", id)
    }, [socket, quill, id])



    useEffect(() => {
        if (socket == null || quill == null) return

        const handleWhiteSpace = delta => {
            console.log(`value: ${value}`);
            quill.updateContents(delta);
        }
        socket.on("receive-changes", handleWhiteSpace)

        return () => {
            socket.off("receive-changes", handleWhiteSpace)
        }
    }, [socket, quill, value])


    useEffect(() => {
        if (socket == null || quill == null) return

        const handleWhiteSpace = (delta, oldDelta, source) => {
            if (source !== "user") return
            socket.emit("send-changes", delta);
            socket.emit("typing", delta);
            setValue(delta);
        }
        quill.on("text-change", handleWhiteSpace)

        return () => {
            quill.off("text-change", handleWhiteSpace)
        }
    }, [socket, quill])



    useEffect(() => {
        if (quill === null || socket === null) return;

        const saveDocument = async function (data) {
            const response = await saveDocumentApi({ user: user?.email, docId: id, data: data });
        }
        socket && socket.on('document-saved', (delta) => {
            saveDocument(quill.getContents());
        })
        return () => {
            socket && socket.off('document-saved', (delta) => {
                saveDocument(quill.getContents());
            })
        }
    }, [socket, quill])

    const handleChangeTitle = async (e) => {
        setTitle(e.target.value);
    }

    const handleSaveTitle = async (e) => {
        if(title === "") return;
        const response = await changeTitleApi(id, title);
        // console.log(response);
        setTitle(response);
    }

    return (
        <>
            <div>
                <input type="text" name='title' style={{margin: ".8rem 1rem .2rem 3rem", padding: ".4rem ", width: "30%", border: "none", outline: "1px solid black"}} value={title}
                    onChange={(e) => handleChangeTitle(e)}
                />
                <button onClick={(e) => handleSaveTitle(e)}>Save</button>
            </div>
            <div className='container' ref={wrapperRef}></div>
        </>

    )
}


export default Editor;