import { Link } from "react-router-dom";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import "./Header.css";
import logo from "../../../Assets/Images/logo1.png";



function Header(): JSX.Element {
    return (
        <div className="Header">
            <img className="specialLogo" src={logo} alt="logo" />
            <Link to={"/home"}><h1 id="couponSystem">Coupon System Ruthi</h1></Link>
            <AuthMenu />
        </div>
    );
}

export default Header;
