import { NavLink, useNavigate } from "react-router-dom";
import CompanyModel from "../../../Models/CompanyModel";
import "./CompanyCard.css";


interface CompanyCardProps {
    company: CompanyModel;
}

function CompanyCard(props: CompanyCardProps): JSX.Element {
    const navigate = useNavigate();

    function companyDetail() {
        navigate("/admin/companies/details/" + props.company.id)
    }
    return (
        <div className="CompanyCard">
            <p>Name: {props.company.name}</p>
            <button className="showMore" onClick={companyDetail}>show more</button>
        </div>
    );
}

export default CompanyCard;
