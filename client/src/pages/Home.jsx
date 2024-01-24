import { useCallback, useEffect, useState } from "react";
import Editor from "./Editor";
import { Link, Navigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import axios from "axios";


import { EditorState } from "../context/ContextProvider";
import { fetchUserDocApi } from '../Api/docmentApi';
import blankDoc from "../assets/image/new-word-doc.png";


const Home = () => {
    const [openEditor, setOpenEditor] = useState(false);
    const { user, setUser, doc, setDoc } = EditorState();
    const handleOpenEditor = async function (owner) {
        const response = await fetchUserDocApi(owner);

        return response;
    }

    useEffect(() => {
        handleOpenEditor(user?.email).then((value) => setDoc(value));
    }, []);

    return (
        <>
            <header className="appbar" >
                <h1 style={{ margin: "0 0" }}>Logo</h1>
                <h6 style={{ margin: "0 0" }}> {user?.username} </h6>
            </header>

            <main style={{ padding: "1rem 0", marginTop: "1rem" }}>
                <section className="new-doc-section" >
                    <Link
                        style={{ display: "flex", flexDirection: "column", color: "black", textDecoration: "none" }}
                        to={`./${uuid()}`}
                        state={{ title: "untitled" }}
                    >
                        <img src={blankDoc} width={'90px'} style={{ margin: ".8rem", marginBottom: ".2rem" }} alt="" />
                        <span>Blank Document</span>
                    </Link>
                </section>

                <section style={{ marginTop: "3rem", marginLeft: "5rem" }}>
                    <h3>Recent Documents</h3>
                    <div className="table-container">
                        <table className="content-table">
                            <thead className="table-header">
                                <tr>
                                    <th>Name</th>
                                    <th>Date Modified</th>
                                </tr>
                            </thead>

                            <tbody className="table-body">
                                {
                                    doc && doc.map(file => (
                                        <tr>
                                            <td>
                                                <Link
                                                    style={{ color: "#666666", textDecoration: "none" }} to={`/${file.docId}`}
                                                    state={{ title: file.title }}>
                                                    {file.title}
                                                </Link>
                                            </td>

                                            <td>{file?.updatedAt?.substr(0, 10)}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </>
    )
}


export default Home;