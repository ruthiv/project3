import { useNavigate, useParams } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import store from "../../../Redux/Store";
import "./CouponDetails.css";
import scissors from "../../../Assets/Images/scissors.png";

function CouponDetails(): JSX.Element {
    const navigate = useNavigate();
    const params = useParams();
    const couponId: number = Number(params.id);
    const coupon: CouponModel | undefined = store.getState().companyReducer.coupons.find((coupon) => coupon.id === couponId);

    function updateCoupon() {
        navigate("/company/coupon/update/" + couponId);
    }

    function deleteCoupon() {
        navigate("/company/coupon/delete/" + couponId)
    }
    function PreviousPage() {
        navigate("/company/coupons")
    }
    return (
        <div className="CouponDetails">
            <img className="Scissors" src={scissors} alt="scissors" />
            <div className="ToBack">
                <button onClick={PreviousPage}>Back 🔙</button>
            </div>
            <img className="Img" src={coupon?.image} alt="image" />

            <div className="ButtonCoupon">
                <button onClick={updateCoupon}>Update</button>
                <button onClick={deleteCoupon}>Delete</button>
            </div>
            <p>Category: {coupon?.category}</p>
            <p>Title: {coupon?.title}</p>
            <p>Description: {coupon?.description}</p>
            <p>Start Date: {coupon?.startDate.toString()}</p>
            <p>End Date: {coupon?.endDate.toString()}</p>
            <p>Amount: {coupon?.amount}</p>
            <p>Price: ₪{coupon?.price}</p>
        </div>
    );
}

export default CouponDetails;
