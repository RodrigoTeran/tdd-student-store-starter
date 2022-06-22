import "./AboutUs.css";

const Card = ({ title, text }) => {
  return (
    <div className="about-us-card">
      <div className="about-us-card-title">{title}</div>
      <div className="about-us-card-text">{text}</div>
    </div>
  );
};

export default function AboutUs() {
  return (
    <section className="about-us" id="About">
      <div className="about-us-titles">
        <div className="about-us-title">About us</div>
        <div className="about-us-subtile">We enjoy selling products!</div>
      </div>
      <div className="about-us-cards">
        <Card title="What?" text="We are a school that specializes in CS." />
        <Card title="Who?" text="We are Tec de Monterrey" />
        <Card title="Where?" text="We are based in Mexico" />
        <Card title="When?" text="We are open from 9am to 5pm" />
      </div>
    </section>
  );
}
