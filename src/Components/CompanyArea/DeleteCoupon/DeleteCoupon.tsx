import { useNavigate, useParams } from "react-router-dom";
import { deleteCouponAction } from "../../../Redux/CompanyState";
import store from "../../../Redux/Store";
import companyService from "../../../Services/CompanyService";
import notify from "../../../Services/NotificationService";
import "./DeleteCoupon.css";
import imageDelete from "../../../Assets/Images/delete.png"

function DeleteCoupon(): JSX.Element {
    const params = useParams();
    const couponId = +(params.id || '');

    const navigate = useNavigate();

    const sendDeleteCoupon = () => {
        companyService.deleteCoupon(couponId).then((res) => {
            notify.success("Deleted coupon successfully");
            store.dispatch(deleteCouponAction(couponId));
            navigate("/company/coupons");
        }).catch((error) => {
            notify.error(error);
        })
    }
    return (
        <div className="DeleteCoupon">
            <h2>Delete coupon?</h2>
            <button onClick={sendDeleteCoupon}>Yes</button>
            <button onClick={() => navigate("/company/coupons")}>No</button>
            <img className="imageDelete" src={imageDelete} alt="imageDelete" />
        </div>
    );
}

export default DeleteCoupon;
