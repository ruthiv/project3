import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Routing from "../Routing/Routing";
import "./Layout.css";
import Main from "../Main/Main";


function Layout(): JSX.Element {
    return (
        <div className="Layout">
            <header><Header /></header>
            <aside><Menu /></aside>
            <main><Main /></main>
            <footer><Footer /></footer>
        </div>
    );
}

export default Layout;
