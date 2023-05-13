import { useNavigate, useParams } from "react-router-dom";
import adminService from "../../../Services/AdminService";
import "./DeleteCustomer.css";
import notify from "../../../Services/NotificationService";
import store from "../../../Redux/Store";
import { deleteCustomerAction } from "../../../Redux/CustomerState";
import imageDelete from "../../../Assets/Images/delete.png"

function DeleteCustomer(): JSX.Element {
    const params = useParams();
    const customerId = +(params.id || '');

    const navigate = useNavigate();

    const sendDeleteCustomer = () => {
        console.log("id customer is: " + customerId);
        adminService.deleteCustomer(customerId).then((res) => {
            notify.success("Deleted customer successfully");
            store.dispatch(deleteCustomerAction(customerId));
            navigate("/admin/customers");
        }).catch((error) => {
            notify.error(error);
        })
    }

    return (
        <div className="DeleteCustomer">
            <h2>Delete customer?</h2>
            <button onClick={sendDeleteCustomer}>Yes</button>
            <button onClick={() => navigate("/admin/customers")}>No</button>
            <img className="imageDelete" src={imageDelete} alt="imageDelete" />
        </div>
    );
}

export default DeleteCustomer;
