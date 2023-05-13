import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { ChangeEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import store from "../../../Redux/Store";
import companyService from "../../../Services/CompanyService";
import "./UpdateCoupon.css";
import notify from "../../../Services/NotificationService";
import { updateCouponAction } from "../../../Redux/CompanyState";
import { useForm } from "react-hook-form";

function UpdateCoupon(): JSX.Element {
    const navigate = useNavigate();
    const params = useParams();
    const couponId: number = Number(params.id);
    const [coupon, setCoupon] = useState<CouponModel>(store.getState().companyReducer.coupons.filter(coupon => coupon.id === couponId)[0]);
    const [currentImage, setCurrentImage] = useState<string>(store.getState().companyReducer.coupons.filter(coupon => coupon.id === couponId)[0].image);

    const schema = yup.object().shape({
        category: yup.string().required("Category is required"),
        title: yup.string().required("Title is required"),
        description: yup.string().required("Description is required"),
        startDate: yup.date().required("StartDate is required"),
        endDate: yup.date().min(yup.ref("startDate")).required("EndDate is required"),
        amount: yup.number().min(1).required("Password is required"),
        price: yup.number().min(0).required("Price is required"),
        image: yup.string().required("Image is required")
    })

    let defaultValueObj = { ...coupon }

    const { register, handleSubmit, control, formState: { errors, isDirty, isValid } } = useForm<CouponModel>({
        defaultValues: defaultValueObj,
        mode: "all",
        resolver: yupResolver(schema),
    })

    function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
        const selectedImage = e.currentTarget.value
        setCurrentImage(selectedImage);
    }

    const sendUpdateCoupon = (coupon: CouponModel): void => {
        companyService.updateCoupon(coupon).then((res) => {
            notify.success("Updated coupon successfully");
            store.dispatch(updateCouponAction(coupon))
            navigate("/company/coupons");
        }).catch((error) => {
            notify.error(error);
        })
    }

    return (
        <div>
            <h1>Update Coupon</h1>
            <form className='UpdateCoupon' onSubmit={handleSubmit(sendUpdateCoupon)}>

                <select {...register("category")} name="category" id="category">
                    <option value="FOOD">Food</option>
                    <option value="ELECTRICITY">Electricity</option>
                    <option value="RESTAURANT">Restaurant</option>
                    <option value="VACATION">Vacation</option>
                </select>
                <span>{errors.category?.message}</span>

                <label htmlFor="title">Title</label>
                <span>{errors.title?.message}</span>
                <input {...register("title")} id='title' type="text" />

                <label htmlFor="description">Description</label>
                <span>{errors.description?.message}</span>
                <input {...register("description")} id='description' type="text" />

                <label htmlFor="startDate">Start Date</label>
                <span>{errors.startDate?.message}</span>
                <input {...register("startDate")} id='startDate' type="date" />

                <label htmlFor="endDate">End Date</label>
                <span>{errors.endDate?.message}</span>
                <input {...register("endDate")} id='endDate' type="date" />

                <label htmlFor="amount">Amount</label>
                <span>{errors.amount?.message}</span>
                <input {...register("amount")} id='amount' type="number" />

                <label htmlFor="price">Price</label>
                <span>{errors.price?.message}</span>
                <input {...register("price")} id='price' step={0.01} type="number" />

                <label htmlFor="image">Image</label>
                <img id="img" src={currentImage} alt="image" />
                <span>{errors.image?.message}</span>
                <input type="text" {...register("image")} id='imageFile' onChange={handleImageChange} />

                <div className='vertical-center'>
                    <button disabled={!isValid}>Update</button>
                </div>
            </form>
        </div>
    );
}

export default UpdateCoupon;
