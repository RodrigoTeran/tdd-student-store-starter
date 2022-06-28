import OrderComponent from "../Order/Order";
import { useParams } from "react-router-dom";
import { useEffect, useState, Fragment } from "react";
import "./OrderView.css"
import Loader from "../Loader/Loader";
import { variantsLoader, variantsMain } from "../Loader/variants";
import { AnimatePresence, motion } from "framer-motion";


// Fetcher
import { fetcher } from "../../utils/fetcher";

// Components
import ProductCard from "../ProductCard/ProductCard"

export default function OrderView({
    products,
    handleAddItemToCart,
    handleRemoveItemToCart
}) {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [isLoading, setIsLoading] = useState([]);

    const getProduct = (id) => {
        for (let i = 0; i < products.length; i++) {
            if (id == products[i].id) return products[i];
        };
        return false;
    }

    useEffect(() => {
        if (orderId) fetchOrder();
    }, []);

    const fetchOrder = async () => {
        setIsLoading(true);
        try {
            const data = await fetcher(
                `${import.meta.env.VITE_API_URL}/orders/get-order/${orderId}`
            );
            console.log(data)
            setIsLoading(false);
            if (data.status != 200) {
                setError(data.statusText);
            } else {
                // Everything ok
                setOrder(data.data ?.order || null);
            }
        } catch (error) {
            setIsLoading(false);
            console.error(error);
            setError("Server error");
        }
    }

    return (
        <div className="order-view">
            <h1>
                Order
            </h1>
            <div className="order-view-container">
                {order && <OrderComponent order={order} />}
            </div>
            <h1>
                Products
            </h1>
            <div className="product-grid-container">
                {order && order.order.map((product, index) => {
                    return (
                        <Fragment key={index}>
                            <ProductCard
                                product={getProduct(product.itemId)}
                                productId={product.itemId}
                                quantity={product.quantity}
                                showBtns={false}
                                handleAddItemToCart={handleAddItemToCart}
                                handleRemoveItemToCart={handleRemoveItemToCart}
                            />
                        </Fragment>
                    )
                })}
            </div>
        </div>
    )
}