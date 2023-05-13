import "./About.css";
import image from "../../../Assets/Images/ruthi.jpg";



function About(): JSX.Element {
    return (
        <div className="About">
            <img className="specialPicture" src={image} alt="image" />
            <div className="specialAbout">Hi there! My name is Ruthi Vengrover, and I'm excited to tell you a little bit about myself. I'm a hard-working and dedicated individual who is always looking for new challenges and opportunities to learn and grow.

                One of my proudest accomplishments is the coupon system that I developed while studying at JohnBryce College. During my time there, I learned a great deal about software development and programming, and I was inspired to put my newfound knowledge to use.

                With the help of some talented classmates, I was able to create a robust and user-friendly coupon system that streamlined the process of offering discounts and promotions to customers. This project allowed me to showcase my skills in coding, design, and teamwork, and I was thrilled with the positive feedback we received from our instructors and peers.

                Since completing my studies at JohnBryce, I've continued to pursue my passion for technology and innovation. I'm always on the lookout for exciting new projects and collaborations, and I'm excited to see where my skills and expertise will take me in the future.

                Thank you for taking the time to learn a little bit about me and my work. If you have any questions or would like to connect, please don't hesitate to get in touch!</div>
        </div>
    );
}

export default About;
