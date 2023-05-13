import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import store from "../../../Redux/Store";
import Home from "../../HomeArea/Home/Home";
import "./Menu.css";
import { BsCart4 } from "react-icons/bs";

function Menu(): JSX.Element {
    const [clientType, setClientType] = useState<string>(store.getState().authReducer.user.clientType);

    useEffect(() => {
        store.subscribe(() => {
            setClientType(store.getState().authReducer.user.clientType)
        })
    }, [])
    return (
        <div className="Menu">
            <NavLink to={"/home"}>Home</NavLink>
            <span> | </span>
            <NavLink to={"/about"}>About</NavLink>
            <span> | </span>
            {
                clientType === "ADMIN" &&
                <>
                    <NavLink to={"/admin/companies"}>Companies</NavLink>
                    <span> | </span>
                    <NavLink to={"/admin/customers"}>Customers</NavLink>
                </>
            }
            {
                clientType === "COMPANY" &&
                <>
                    <NavLink to={"/company/coupons"}>Coupons</NavLink>
                </>
            }
                        {
                clientType === "CUSTOMER" &&
                <>
                    <NavLink to={"/customer/all-coupons"}>All Coupons</NavLink>
                    <span> | </span>
                    <NavLink to={"/customer/my-coupons"}>My Coupons <BsCart4/></NavLink>
                </>

            }
        </div>
    );
}

export default Menu;
function jwt_decode(token: any) {
    throw new Error("Function not implemented.");
}

