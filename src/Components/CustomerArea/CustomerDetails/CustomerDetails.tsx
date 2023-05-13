import { useNavigate, useParams } from "react-router-dom";
import CustomerModel from "../../../Models/CustomerModel";
import store from "../../../Redux/Store";
import "./CustomerDetails.css";

function CustomerDetails(): JSX.Element {

    const navigate = useNavigate();
    const params = useParams();
    const customerId: number = Number(params.id);
    const customer: CustomerModel | undefined = store.getState().customerReducer.customers.find((customer) => customer.id === customerId);

    function updateCustomer() {
        navigate("/admin/customers/update/" + customerId);
    }

    function deleteCustomer() {
        navigate("/admin/customers/delete/" + customerId)
    }
    function PreviousPage() {
        navigate("/admin/customers")
    }
    return (
        <div className="CustomerDetails">
            <button className="ToBack" onClick={PreviousPage}>Back 🔙</button>
            <div className="ButtonCustomer">
                <button onClick={updateCustomer}>Update</button>
                <button onClick={deleteCustomer}>Delete</button>
            </div>
            <p>first name: {customer?.firstName}</p>
            <p>last name: {customer?.lastName}</p>
            <p>email: {customer?.email}</p>
            <p>password: {customer?.password}</p>
        </div>
    );
}

export default CustomerDetails;
