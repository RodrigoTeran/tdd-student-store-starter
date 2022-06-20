import { Link } from "react-router-dom";

export default function Logo(){
    return (
        <div className="logo">
            <Link to="/">
                <img src="./codepath.f1b3e41a.svg" alt="CodePath Logo" />
            </Link>
        </div>
    )
}