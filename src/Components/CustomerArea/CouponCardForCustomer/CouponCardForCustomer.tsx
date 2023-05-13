import { useNavigate } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import "./CouponCardForCustomer.css";
import { NavLink } from "react-router-dom";
import scissors from "../../../Assets/Images/scissors.png"


interface CouponCardProps {
    coupon: CouponModel;
}

function CouponCardForCustomer(props: CouponCardProps): JSX.Element {

    return (
        <div className="CouponCardForCustomer">
            <img className="Scissors" src={scissors} alt="scissors" />
            <NavLink to={"/customer/coupon/details/" + props.coupon.id}>
                <img src={props.coupon.image} alt="image" />
            </NavLink>
            <p className="Category">{props.coupon.category}</p>
            <p>{props.coupon.title}</p>
            <p>{props.coupon.description}</p>
            <p>₪{props.coupon.price}</p>
        </div>

    );
}

export default CouponCardForCustomer;
