import { useNavigate, useParams } from "react-router-dom";
import CouponModel from "../../../../Models/CouponModel";
import store from "../../../../Redux/Store";
import "./AllCouponDetails.css";
import scissors from "../../../../Assets/Images/scissors.png";

function AllCouponDetails(): JSX.Element {
    const navigate = useNavigate();
    const params = useParams();
    const couponId: number = Number(params.id);
    const coupon: CouponModel | undefined = store.getState().companyReducer.coupons.find((coupon)=> coupon.id === couponId);
    
    return (
        <div className="AllCouponDetails">
            <img className="Scissors"src={scissors} alt="scissors" />
            <img className="Img" src={coupon?.image} alt="image" />
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

export default AllCouponDetails;
