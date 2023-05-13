import "./Footer.css";
import {SiLinkedin} from "react-icons/si";
import { DiGithubBadge } from "react-icons/di";
import {BsWhatsapp} from "react-icons/bs";
function Footer(): JSX.Element {
    return (
        <div className="Footer">
			<span>&copy; ruthi vengrover</span>
            <a href="https://api.whatsapp.com/send?phone=9720548247721&text=%D7%94%D7%99%2C%20%D7%9C%D7%99%D7%A6%D7%99%D7%A8%D7%AA%20%D7%A7%D7%A9%D7%A8%20%D7%A2%D7%9D%20%D7%A8%D7%95%D7%AA%D7%99%20%D7%99%D7%A9%20%D7%9C%D7%9C%D7%97%D7%95%D7%A5%20%D7%9B%D7%90%D7%9F" target="_blank"><BsWhatsapp style={{color: 'green', fontSize: '30px', marginInline:'5px'}}/></a> 
            <a href="https://github.com/ruthiv/" target="_blank"><DiGithubBadge style={{color: 'purple', fontSize: '45px', marginInline:'5px'}}/></a> 
            <a href="https://www.linkedin.com/in/ruthi-vengrover-15670625a/" target="_blank"><SiLinkedin style={{color: 'blue', fontSize: '30px', marginInline:'5px'}}/></a> 
        </div>
    );
}

export default Footer;
