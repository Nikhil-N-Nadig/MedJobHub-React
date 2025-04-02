import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Logout from "../Logout/Logout";
import "../Header/Header.css";

const images = {header_img:"https://res.cloudinary.com/dcslhsano/image/upload/v1743537217/z67scxkigrn9si4mgzv1.png"};

function Header() {
  const location = useLocation();
  const user = useSelector((state) => state.auth.userData);
  const role = user?.role; 

  return (
    <header>
      <div className="head-container">
        <div className="logo-title">
          <img src={images['header_img']} alt="MedJobHub Logo" className="stethoscope-img no-select" />
          <h1 className="no-select">MedJobHub</h1>
        </div>

        <nav>
          <ul>
            <li><Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link></li>
            <li><Link to="/about" className={location.pathname === "/about" ? "active" : ""}>About</Link></li>
            <li><Link to="/jobs" className={location.pathname.startsWith("/jobs") ? "active" : ""}>Jobs</Link></li>
            <li><Link to="/contact-us" className={location.pathname === "/contact-us" ? "active" : ""}>Contact</Link></li>

            {user ? (
              <>
                {role === "employer" && (
                  <>
                    <li><Link to="/job-listings" className={location.pathname === "/job-listings" ? "active" : ""}>My Jobs</Link></li>
                    <li><Link to="/job-applications" className={location.pathname === "/job-applications" ? "active" : ""}>Applications</Link></li>
                  </>
                )}
                {role === "job_seeker" && (
                  <>
                    <li><Link to="/job-listings" className={location.pathname === "/job-listings" ? "active" : ""}>Find Jobs</Link></li>
                    <li><Link to="/job-applications" className={location.pathname === "/job-applications" ? "active" : ""}>Applied Jobs</Link></li>
                  </>
                )}
                <li><Link to="/profile" className={location.pathname === "/profile" ? "active" : ""}>Profile</Link></li>
                <li><Logout /></li>
              </>
            ) : (
              <>
                {location.pathname === "/signin" ? (
                  <li><Link to="/signup" className="active">Sign Up</Link></li>
                ) : location.pathname === "/signup" ? (
                  <li><Link to="/signin" className="active">Sign In</Link></li>
                ) : (
                  <li><Link to="/signin" className={location.pathname === "/signin" ? "active" : ""}>Sign In</Link></li>
                )}
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
