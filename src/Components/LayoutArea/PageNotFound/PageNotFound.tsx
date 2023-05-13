import "./PageNotFound.css";
import error from "../../../Assets/Images/404-error.png"

function PageNotFound(): JSX.Element {
    return (
        <div className="PageNotFound">
            <p>
                The page you are looking for doesn't exist
            </p>
            <img className="error" src={error} alt="error" />
        </div>
    );
}

export default PageNotFound;
