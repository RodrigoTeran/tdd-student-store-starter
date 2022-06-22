import "./Navbar.css";
import Logo from "../Logo/Logo";
import { HashLink } from "react-router-hash-link";
import { useState } from "react";

export default function Navbar() {
  const [isOpenResponsiveLinks, setIsOpenResponsiveLinks] = useState(false);

  return (
    <nav className="navbar">
      <Logo />
      <div className={`navbar-links ${isOpenResponsiveLinks && "open"}`}>
        <HashLink
          onClick={() => {
            setIsOpenResponsiveLinks(false);
          }}
          smooth
          to="/"
        >
          Home
        </HashLink>
        <HashLink
          onClick={() => {
            setIsOpenResponsiveLinks(false);
          }}
          smooth
          to="/#About"
        >
          About Us
        </HashLink>
        <HashLink
          onClick={() => {
            setIsOpenResponsiveLinks(false);
          }}
          smooth
          to="/#Contact"
        >
          Contact Us
        </HashLink>
        <HashLink
          onClick={() => {
            setIsOpenResponsiveLinks(false);
          }}
          smooth
          to="/#Buy"
        >
          Buy Now
        </HashLink>
      </div>
      <div
        onClick={() => {
          setIsOpenResponsiveLinks((prev) => !prev);
        }}
        className={`hamburger ${isOpenResponsiveLinks && "open"}`}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  );
}
