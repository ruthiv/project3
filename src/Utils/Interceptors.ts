import axios from "axios";
import store from "../Redux/Store";
import notify from "../Services/NotificationService";

class Interceptors {

    public create(): void {
        axios.interceptors.request.use(requestObject => {

            if (store.getState().authReducer) {
                requestObject.headers.Authorization = "Bearer " + store.getState().authReducer;
            }
            return requestObject;

        });

        axios.interceptors.response.use(responseObject => {
            if (responseObject.status === 401 || responseObject.status === 403 || responseObject.status === 400) {
                // Redirect to login
                window.location.href = "/login";
                notify.error("The user is disconnected, Please login again");

            }
            return responseObject;
        });

    }

}

const interceptors = new Interceptors();

export default interceptors;