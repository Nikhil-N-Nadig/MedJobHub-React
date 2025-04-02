import React from "react";
import "../Footer/Footer.css";
const url="https://res.cloudinary.com/dcslhsano/image/upload/"
const images={
  logo:"v1743537217/z67scxkigrn9si4mgzv1.png",
  app_store:"v1743537368/te6pst5ffcv7teufx37x.jpg",
  play_store:"v1743537559/sfyav0wtd0e0pjcy3uzo.jpg"
}

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div class="footer-column logo-section">
          <img class="no-select" src={`${url}${images['logo']}`} alt="Image" />
            <h1 class="no-select">MedJobHub</h1>
        </div>

        
        <div class="footer-column address-section">
          <p><strong>MedJobHub Private Limited</strong></p>
          <p>13/21, 1st Floor, 3rd Cross, 7th Main</p>
          <p>Syndicate Bank Colony, Banashankari 3rd Stage</p>
          <p>Bengaluru-560085</p>
        </div>
        <div class="footer-column download-section">
          <h3>Download Our App</h3>
          <div class="store-buttons">
              <a href="https://www.apple.com/app-store/" target="_blank">
                <img
                  src={`${url}${images['app_store']}`}
                  alt="App Store"
                  class="store-icon" />
              </a>
              <a href="https://play.google.com/" target="_blank">
                <img src={`${url}${images['play_store']}`} 
                  class="store-icon" />
              </a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="social-media">
          <a href="#"><i class="fab fa-facebook-f"></i></a>
          <a href="#"><i class="fab fa-twitter"></i></a>
          <a href="#"><i class="fab fa-instagram"></i></a>
          <a href="#"><i class="fab fa-linkedin"></i></a>
        </div>
        <div class="links">
          <ul>
            <li><a href="#">Partner With Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Compliance</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Disclaimer</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
