import { useNavigate, useParams } from "react-router-dom";
import CompanyModel from "../../../Models/CompanyModel";
import store from "../../../Redux/Store";
import CompanyCard from "../../AdminArea/CompanyCard/CompanyCard";
import "./CompanyDetails.css";

function CompanyDetails(): JSX.Element {

    const navigate = useNavigate();
    const params = useParams();
    const companyId: number = Number(params.id);
    const company: CompanyModel | undefined = store.getState().companyReducer.companies.find((company) => company.id === companyId);

    function updateCompany() {
        navigate("/admin/companies/update/" + companyId);
    }

    function deleteCompany() {
        navigate("/admin/companies/delete/" + companyId)
    }
    function PreviousPage() {
        navigate("/admin/companies")
    }
    return (
        <div className="CompanyDetails">
            <button className="ToBack" onClick={PreviousPage}>Back 🔙</button>

            <div className="ButtonCompany">
                <button onClick={updateCompany}>Update</button>
                <button onClick={deleteCompany}>Delete</button>
            </div>
            <p>name: {company?.name}</p>
            <p>email: {company?.email}</p>
            <p>password: {company?.password}</p>
        </div>
    );
}

export default CompanyDetails;
