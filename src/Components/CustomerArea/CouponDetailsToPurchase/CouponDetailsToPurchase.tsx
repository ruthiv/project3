import { useNavigate, useParams } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import CustomerModel from "../../../Models/CustomerModel";
import store from "../../../Redux/Store";
import "./CouponDetailsToPurchase.css";
import scissors from "../../../Assets/Images/scissors.png";

function CouponDetailsToPurchase(): JSX.Element {
    const navigate = useNavigate();
    const params = useParams();
    const couponId: number = Number(params.id);
    const coupon: CouponModel | undefined = store.getState().companyReducer.coupons.find((coupon) => coupon.id === couponId);
    const customerId: number = Number(params.id);
    const customer: CustomerModel | undefined = store.getState().customerReducer.customers.find((customer) => customer.id === customerId);
    const index: number = store.getState().customerReducer.myCoupons.findIndex((cou) => cou.id === couponId)

    function purchaseCoupon() {
        navigate("/customer/coupon/purchaseCoupon/" + customerId);
    }

    function PreviousPage() {
        navigate("/customer/all-coupons")
    }

    return (
        <div className="CouponDetailsToPurchase">
            <img className="Scissors" src={scissors} alt="scissors" />
            {
                index >= 0 ?
                    <button className="Buy" disabled={true} onClick={purchaseCoupon}>purchaseCoupon</button> :
                    <button className="Buy" onClick={purchaseCoupon}>purchaseCoupon</button>
            }
            <div className="ToBack">
                <button onClick={PreviousPage}>Back 🔙</button>
            </div>
            <img src={coupon?.image} alt="image" />
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

export default CouponDetailsToPurchase;
