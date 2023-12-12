import React from "react";
import App from "./components/App";
import "./index.css";
import { createRoot } from "react-dom/client";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import MessageList from "./components/MessageList";
import Myprofile from "./components/Myprofile";
import Usersearch from "./components/UserSearch";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
const routes=[
    {
        path:"/",
        element:<App/>
    },{
        path:"/message-list",
        element:<MessageList/>
    },{
        path:"search",
        element:<Usersearch/>
    },{
        path:"/my-profile",
        element:<Myprofile/>
    }
]
const router=createBrowserRouter(routes)
root.render(<RouterProvider router={router}/>)