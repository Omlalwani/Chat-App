import React from "react";
import {Routes, Route} from "react-router";
import App from "../App.jsx";
import Chat from "../components/Chat.jsx";

const AppRoutes = () => {
    return (
    <Routes>
        <Route path='/' element= {<App />} />
        <Route path='/chat' element= {<h1><Chat /></h1>} />
        <Route path='/about' element= {<h1>This is about page...</h1>} />
        <Route path='*' element= {<h1>Page not found...</h1>} />
      </Routes>
    );
};

export default AppRoutes;