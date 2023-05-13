import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomerModel from "../../../Models/CustomerModel";
import { fetchCustomerAction } from "../../../Redux/CustomerState";
import store from "../../../Redux/Store";
import adminService from "../../../Services/AdminService";
import notify from "../../../Services/NotificationService"
import CustomerCard from "../CustomerCard/CustomerCard";
import "./CustomerList.css";

function CustomerList(): JSX.Element {
    const [customers, setCustomers] = useState<CustomerModel[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        adminService.getAllCustomers().then((res) => {
            setCustomers(res.data);
            store.dispatch(fetchCustomerAction(res.data));
        }).catch((error) => {
            notify.error(error);
        })
    }, []);

    function addCustomer() {
        navigate("/admin/customers/add");
    }

    return (
        <div>
            <h2>Customers</h2>
            <div className="CustomerList" id="customers-list-top">
                <div className='vertical-center-add'>
                    <button onClick={addCustomer}>add new Customer</button>
                </div>
                {customers.length > 0 ? customers.map((customer) => (
                    <CustomerCard key={customer.id} customer={customer} />
                )) : <span>no customers yet 😒</span>}
                <a href="#customers-list-top">👆</a>
            </div>
        </div>
    );
}

export default CustomerList;
