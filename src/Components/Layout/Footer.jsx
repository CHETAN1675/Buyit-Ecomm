import { Container } from "react-bootstrap";
import "./Footer.css";
import configuraLogo from "../../../assests/configuraPro.png";

const Footer = () => {
  return (
    <footer className="app-footer">
      <Container className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
        
        {/* Logo + Name */}
        <a
         href="https://configura-pro.vercel.app/"
         target="_blank"
         rel="noopener noreferrer"
         className="d-flex align-items-center gap-2 footer-brand-link"
        >
           <img
           src={configuraLogo}
           alt="ConfiguraPro Logo"
           height="40"
           />
           <span className="footer-brand">ConfiguraPro</span>
           </a>

        {/* Copyright */}
        <div className="footer-copy">
          © {new Date().getFullYear()} BuyIt.com
        </div>

      </Container>
    </footer>
  );
};

export default Footer;
