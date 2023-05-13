import CompanyModel from "../Models/CompanyModel";
import CouponModel from "../Models/CouponModel";

//1. companies state-the data we need at global application level
export class CompaniesState {
    public companies: CompanyModel[] = [];
    public coupons: CouponModel[] = [];
}

//2. Action Types - list of actions - enum
export enum CompanyActionType {
    FetchCoupons = "FetchCoupons",//get
    AddCoupon = "AddCoupon",//post
    UpdateCoupon = "UpdateCoupon",//put
    DeleteCoupon = "DeleteCoupon",//delete
    FetchCompanies = "FetchCompanies",//get
    AddCompany = "AddCompany",//post
    UpdateCompany = "UpdateCompany",//put
    DeleteCompany = "DeleteCompany"//delete
}

//3. Action -  an interface describing a single command
export interface CompaniesAction {
    type: CompanyActionType;//action type
    payload: any; //action data
}

//4. action creators - functions to create action objects
export function fetchCouponAction(coupons: CouponModel[]): CompaniesAction {
    return { type: CompanyActionType.FetchCoupons, payload: coupons };
}
export function addCouponAction(coupon: CouponModel): CompaniesAction {
    return { type: CompanyActionType.AddCoupon, payload: coupon};
}
export function updateCouponAction(coupon: CouponModel): CompaniesAction {
    return { type: CompanyActionType.UpdateCoupon, payload: coupon};
}
export function deleteCouponAction(id: number): CompaniesAction {
    return { type: CompanyActionType.DeleteCoupon, payload: id};
}
export function fetchCompanyAction(companies: CompanyModel[]): CompaniesAction {
    return { type: CompanyActionType.FetchCompanies, payload: companies };
}
export function addCompanyAction(company: CompanyModel): CompaniesAction {
    return { type: CompanyActionType.AddCompany, payload: company};
}
export function updateCompanyAction(company: CompanyModel): CompaniesAction {
    return { type: CompanyActionType.UpdateCompany, payload: company};
}
export function deleteCompanyAction(id: number): CompaniesAction {
    return { type: CompanyActionType.DeleteCompany, payload: id};
}

//5. reducer - a single function performing any of the above actions
export function companyReducer(currentState: CompaniesState = new CompaniesState(), action: CompaniesAction): CompaniesState {
    const newState = { ...currentState };//duplicate current state

    switch (action.type) {
        case CompanyActionType.FetchCoupons://here payload is all companies
            newState.coupons = action.payload;
            break;
        case CompanyActionType.AddCoupon://here payload is a single company to add
            newState.coupons.push(action.payload);
            break;
        case CompanyActionType.UpdateCoupon://here payload is a single company to update
            const indexToUpdateCoupon = newState.coupons.findIndex(p => p.id === action.payload.id);
            if (indexToUpdateCoupon >= 0) newState.coupons[indexToUpdateCoupon] = action.payload;
            break;
        case CompanyActionType.DeleteCoupon://here payload is an id of company to delete
            const indexToDeleteCoupon = newState.coupons.findIndex(p => p.id === action.payload);
            if (indexToDeleteCoupon >= 0) newState.coupons.splice(indexToDeleteCoupon, 1);
            break;
        case CompanyActionType.FetchCompanies://here payload is all companies
            newState.companies = action.payload;
            break;
        case CompanyActionType.AddCompany://here payload is a single company to add
            newState.companies.push(action.payload);
            break;
        case CompanyActionType.UpdateCompany://here payload is a single company to update
            const indexToUpdate = newState.companies.findIndex(p => p.id === action.payload.id);
            if (indexToUpdate >= 0) newState.companies[indexToUpdate] = action.payload;
            break;
        case CompanyActionType.DeleteCompany://here payload is an id of company to delete
            const indexToDelete = newState.companies.findIndex(p => p.id === action.payload);
            if (indexToDelete >= 0) newState.companies.splice(indexToDelete, 1);
            break;
    }
    return newState;
}
