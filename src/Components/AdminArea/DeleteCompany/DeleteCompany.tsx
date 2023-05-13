import { useNavigate, useParams } from "react-router-dom";
import adminService from "../../../Services/AdminService";
import "./DeleteCompany.css";
import notify from "../../../Services/NotificationService";
import store from "../../../Redux/Store";
import { deleteCompanyAction } from "../../../Redux/CompanyState";
import imageDelete from "../../../Assets/Images/delete.png"

function DeleteCompany(): JSX.Element {
    const params = useParams();
    const companyId = +(params.id || '');

    const navigate = useNavigate();

    const sendDeleteCompany = () => {
        adminService.deleteCompany(companyId).then((res) => {
            notify.success("Deleted company successfully");
            store.dispatch(deleteCompanyAction(companyId));
            navigate("/admin/companies");
        }).catch((error) => {
            notify.error(error);
        })
    }

    return (
        <div className="DeleteCompany">
            <h2>Delete company?</h2>
            <button onClick={sendDeleteCompany}>Yes</button>
            <button onClick={() => navigate("/admin/companies")}>No</button>
            <img className="imageDelete" src={imageDelete} alt="imageDelete" />

        </div>
    );
}

export default DeleteCompany;
