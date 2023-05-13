import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import "./PurchaseCoupon.css";
import * as yup from 'yup';
import customerService from "../../../Services/CustomerService";
import store from "../../../Redux/Store";
import notify from "../../../Services/NotificationService";
import { addMyCouponAction } from "../../../Redux/CustomerState";
import { useState } from "react";

function PurchaseCoupon(): JSX.Element {
    const navigate = useNavigate();
    const params = useParams();
    const couponId: number = Number(params.id);
    const [coupon, setCoupon] = useState<CouponModel>(store.getState().companyReducer.coupons.filter(coupon => coupon.id === couponId)[0]);

    const schema = yup.object().shape({
        category: yup.string().required("Category is required"),
        title: yup.string().required("Title is required"),
        description: yup.string().required("Description is required"),
        startDate: yup.date().required("StartDate is required"),
        endDate: yup.date().required("EndDate is required"),
        amount: yup.number().required("Password is required"),
        price: yup.number().required("Price is required"),
        image: yup.string().required("Image is required")
    })
    let defaultValueObj = { ...coupon }

    const { register, handleSubmit, control, formState: { errors, isDirty, isValid } } = useForm<CouponModel>({
        defaultValues: defaultValueObj,
        mode: "all",
        resolver: yupResolver(schema),
    })


    const sendCoupon = (coupon: CouponModel): void => {
        customerService.purchaseCoupon(coupon).then((res) => {
            store.dispatch(addMyCouponAction(res.data));
            notify.success("purchase coupon successfully");
            navigate("/customer/my-coupons");
        }).catch((error) => {
            notify.error(error);
        })
    }

    return (
        <div>
            <h1>Purchase Coupon</h1>
            <form className='PurchaseCoupon' onSubmit={handleSubmit(sendCoupon)}>

                <select {...register("category")} disabled name="category" id="category">
                    <option value="FOOD">Food</option>
                    <option value="ELECTRICITY">Electricity</option>
                    <option value="RESTAURANT">Restaurant</option>
                    <option value="VACATION">Vacation</option>
                </select>
                <span>{errors.category?.message}</span>

                <label htmlFor="title">Title</label>
                <span>{errors.title?.message}</span>
                <input {...register("title")} disabled id='title' type="text" placeholder='title company here' />

                <label htmlFor="description">Description</label>
                <span>{errors.description?.message}</span>
                <input {...register("description")} disabled id='description' type="text" placeholder='Description here' />

                <label htmlFor="startDate">Start Date</label>
                <span>{errors.startDate?.message}</span>
                <input {...register("startDate")} disabled id='startDate' type="date" placeholder='Start Date here' />

                <label htmlFor="endDate">End Date</label>
                <span>{errors.endDate?.message}</span>
                <input {...register("endDate")} disabled id='endDate' type="date" placeholder='End Date here' />

                <label htmlFor="amount">Amount</label>
                <span>{errors.amount?.message}</span>
                <input {...register("amount")} disabled id='amount' type="number" placeholder='amount here' />

                <label htmlFor="price">Price</label>
                <span>{errors.price?.message}</span>
                <input {...register("price")} disabled id='price' type="number" placeholder='price here' />

                <label htmlFor="image">Image</label>
                <span>{errors.image?.message}</span>
                <img className="image" src={coupon?.image} alt="image" />
                <button id="Purchase">purchase</button>

            </form>
        </div>
    );
}
export default PurchaseCoupon;
