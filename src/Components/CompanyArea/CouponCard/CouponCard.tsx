import { NavLink, useNavigate } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import "./CouponCard.css";
import scissors from "../../../Assets/Images/scissors.png"

interface CouponCardProps {
    coupon: CouponModel;
}

function CouponCard(props: CouponCardProps): JSX.Element {
    const navigate = useNavigate();

    return (
        <div className="CouponCard">
            <img className="Scissors" src={scissors} alt="scissors" />
            <NavLink to={"/coupon/details/" + props.coupon.id}>
                <img src={props.coupon.image} alt="image" />
            </NavLink>
            <p className="Category">{props.coupon.category}</p>
            <p>{props.coupon.title}: </p>
            <p>{props.coupon.description}</p>
            <p>₪{props.coupon.price}</p>
        </div>
    );
}

export default CouponCard;
