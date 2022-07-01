import "./Orders.css";
import { useEffect, useState, Fragment } from "react";

// Fetcher
import { fetcher } from "../../utils/fetcher";

// Components
import Order from "../Order/Order"

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState([]);
    const [filter, setFilter] = useState("");


    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setIsLoading(true);
        try {
            const data = await fetcher(
                `${import.meta.env.VITE_API_URL}/orders`
            );
            setIsLoading(false);
            if (data.status != 200) {
                setError(data.statusText);
            } else {
                // Everything ok
                setOrders(data.data ?.orders || []);
            }
        } catch (error) {
            setIsLoading(false);
            console.error(error);
            setError("Server error");
        }
    }

    const onChangeInputFilterOrder = (e) => {
        setFilter(e.target.value);
    }

    const isInSearch = (orderEmail) => {
        let isInFilter = false;
        orderEmail = orderEmail.toLocaleLowerCase();
        let filterName = filter.toLocaleLowerCase();
        let n = orderEmail.search(filterName);
        if (n !== -1) {
            isInFilter = true;
        }

        return isInFilter;
    };

    return (
        <section className="orders">
            <h1>
                Orders
            </h1>
            <div className="orders-input-container">
                <input value={filter} onChange={onChangeInputFilterOrder} type="text" placeholder="Filter orders from email" />
            </div>
            <div className="orders-grid">
                {orders && orders.map((order, index) => {
                    if (isInSearch(order.email)) {
                        return (
                            <Fragment key={index}>
                                <Order order={order} />
                            </Fragment>
                        )
                    }
                })}
            </div>
        </section>
    )
};