import {useNavigate } from "react-router-dom";
import CustomerModel from "../../../Models/CustomerModel";
import "./CustomerCard.css";


interface CustomerCardProps {
    customer: CustomerModel;
}

function CustomerCard(props: CustomerCardProps): JSX.Element {
    const navigate = useNavigate();

    function customerDetail() {
        navigate("/admin/customers/details/" + props.customer.id)
    }
    return (
        <div className="CustomerCard">
            <p>Name: {props.customer.firstName} {props.customer.lastName}</p>
            <button className="showMoreCustomer" onClick={customerDetail}>show more</button>
        </div>
    );
}

export default CustomerCard;
