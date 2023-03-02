import React from 'react';
import {Route, Routes} from "react-router-dom";
import {CssBaseline} from "@mui/material";
import PostPage from "./features/PostPage/PostPage";
import Login from "./features/Users/Login";
import Register from "./features/Users/Register";
import AppToolbar from "./components/UI/AppToolBar/AppToolBar";
import PostForm from "./features/PostPage/PostForm";
import OnePostPage from "./features/PostPage/OnePostPage";


function App() {
    return (
        <>
            <CssBaseline/>
            <AppToolbar/>
            <Routes>
                <Route path='/' element=<PostPage/>/>
                <Route path='/posts/:id' element={<OnePostPage/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path='/newPost' element={<PostForm/>}/>
            </Routes>
        </>)
}

export default App;
