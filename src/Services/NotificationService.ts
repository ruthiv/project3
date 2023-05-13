import { Notyf } from "notyf";
import loginService from "./LoginService";

class Notiyf {

    private notification = new Notyf({ duration: 3000, position: { x: "right", y: "top" } });//כמה זמן ואיפה הוא יציג את ההודעה

    public success(message: string): void {
        this.notification.success(message);
    }
    public error(error: any): void {
        const errorMessage = this.extractErrorMessage(error);
        this.notification.error(errorMessage);
    }

    private extractErrorMessage(error: any): string {
        // front threw a string as error
        if (typeof error === "string") return error;
        
        // Axios got an error string from back
        if (typeof error.response?.data === "string") return error.response.data.message;

        if (typeof error.response?.data === "string") return error.response.data;

        if (typeof error.response?.data?.why === "string") return error.response.data.why;

        if (typeof error.response?.data?.message === "string") {
            if(error.response.data.message === "You need to login") {
                loginService.logout();
                window.location.href="/login";
                alert("You must register again!");
            }
            return error.response.data.message;
        }
        // Axios got an error array from back
        if (Array.isArray(error.response?.data)) return error.response.data[0];
        
        // front threw an Error
        if (typeof error.message === "string") return error.message;
        
        return "You must register again! Some error occurred, Please try again";
    }

}

const notify = new Notiyf();
export default notify;