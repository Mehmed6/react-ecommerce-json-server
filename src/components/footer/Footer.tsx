import { FaLinkedin, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import "./Footer.scss"
import SocialLink from "../socialLink/SocialLink.tsx";
const Footer = () => {
    return (
        <div className="footer-container">
            <footer className="footer-content">
                <p>Contact Me.. </p>
                <div className="footer-icons-wrap">
                    <SocialLink href="https://github.com/Mehmed6" label="Github">
                        <FaGithub className="footer-icons"/>
                    </SocialLink>
                    <SocialLink href="https://www.linkedin.com/in/mehmet-dogan-183978116/" label="Linkedin">
                        <FaLinkedin className="footer-icons"/>
                    </SocialLink>
                    <SocialLink href="mailto:mehmed.dogan6@gmail.com" label="Email">
                        <MdEmail className="footer-icons" />
                    </SocialLink>
                </div>
            </footer>

        </div>
    );
};

export default Footer;