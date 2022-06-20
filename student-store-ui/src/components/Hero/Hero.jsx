import "./Hero.css";

export default function Hero() {
  return (
    <div className="hero">
      <div className="hero-intro-container">
        <p className="intro">
          Welcome! <br />
          Find your merch!
        </p>
        <span className="intro-des">
          We have all kinds of goodies. Click on any of the items to start
          filling <br />
          up your shopping cart. Checkout whenever you're ready.
        </span>
      </div>
      <div className="hero-img-container">
        <img
          src="/student_store_icon.18e5d61a.svg"
          className="hero-img"
          alt="Hero Img"
        />
      </div>
    </div>
  );
}
