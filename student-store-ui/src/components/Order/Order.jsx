import "./Order.css";
import { Link } from "react-router-dom";

export default function Order({
    order
}) {
    return (
        <Link to={`/orders/${order.id}`} className="order" title="Go to order">
            <div className="order-name">
                {order.name}
            </div>
            <div className="order-email">
                {order.email}
            </div>
            <div className="order-quantity">
                {order.order.length} products
            </div>
        </Link>
    )
};