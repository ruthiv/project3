import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import { fetchMyCouponAction } from "../../../Redux/CustomerState";
import store from "../../../Redux/Store";
import customerService from "../../../Services/CustomerService";
import notify from "../../../Services/NotificationService";
import CouponCard from "../CouponCardForCustomer/CouponCardForCustomer";
import "./MyCouponList.css";

function CouponList(): JSX.Element {
    const [coupons, setCoupons] = useState<CouponModel[]>([]);

    const [email, setEmail] = useState<string>(store.getState().authReducer.user.email);

    useEffect(() => {
        customerService.getCustomerCoupons().then((res) => {
            setCoupons(res.data);
            store.dispatch(fetchMyCouponAction(res.data));
        }).catch((error) => {
            notify.error(error);
        })
    }, []);


    return (
        <div>
            <h2>My Coupons {email && email.match(/[^.]+(?=\@)/)}</h2>
            <div className="CouponList" id="my-coupon-list-top">
                {coupons.length > 0 ? coupons.map((coupon) => (
                    <CouponCard key={coupon.id} coupon={coupon} />
                )) : <span>no coupons yet</span>}
                <a href="#my-coupon-list-top">👆</a>
            </div>
        </div>
    );
}

export default CouponList;
