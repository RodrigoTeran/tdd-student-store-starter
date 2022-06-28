import "./Order.css";

export default function Order({
    order
}) {
    return (
        <div className="order">
            {order.name}
        </div>
    )
};