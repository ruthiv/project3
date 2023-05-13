import { NavLink, useNavigate } from "react-router-dom";
import CouponModel from "../../../../Models/CouponModel";
import "./AllCouponCard.css";
import scissors from "../../../../Assets/Images/scissors.png"

interface AllCouponCardProps {
    coupon: CouponModel;
}

function AllCouponCard(props: AllCouponCardProps): JSX.Element {
    const navigate = useNavigate();


    function couponDetail() {
        navigate("/details/" + props.coupon.id)
    }

    return (
        <div className="AllCouponCard">
            <img className="Scissors" src={scissors} alt="scissors" />
            <NavLink to={"/details/" + props.coupon.id}>
                <img src={props.coupon.image} alt="image" />
            </NavLink>
            <p className="Category">{props.coupon.category}</p>
            <p>{props.coupon.title}</p>
            <p>{props.coupon.description}</p>
            <p>₪{props.coupon.price}</p>
        </div>
    );
}

export default AllCouponCard;
