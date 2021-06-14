import React, { useState, useEffect } from 'react';
import RingLoader from "react-spinners/RingLoader";
import { commerce } from './lib/commerce';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Products, Navbar, Cart, Checkout } from './components';
import defaultImage from "./assets/commerce.png";

const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    // fetches product list from commerce.js
    const fetchProducts = async () => {
        const { data } = await commerce.products.list();

        setProducts(data);
    }

    // fetches cart items from commerce.js
    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve());
    }

    // push to cart
    const handleAddToCart = async (productId, quantity) => {
        const { cart } = await commerce.cart.add(productId, quantity);

        setCart(cart);
    }

    //updating cart items
    const handleUpdateCartQty = async (productId, quantity) => {
        const { cart } = await commerce.cart.update(productId, { quantity });

        setCart(cart);
    }

    //remove from cart 
    const handleRemoveFromCart = async (productId) => {
        const { cart } = await commerce.cart.remove(productId);

        setCart(cart);
    }

    //empty the whole cart
    const handleEmptyCart = async () => {
        const { cart } = await commerce.cart.empty();

        setCart(cart);
    }

    // cart refresher after checkout
    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh();

        setCart(newCart);
    }

    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        try {
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

            setOrder(incomingOrder);

            refreshCart();
        } catch (error) {
            setErrorMessage(error.data.error.message);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchCart();
        setTimeout(() => {
            setIsLoading(false);
        }, 5000);
    }, []);

    const override = `
        display: block;
        margin: 0 auto;
        border-color: red;
    `;

    return isLoading ?
        <div>
            <RingLoader color={'#580aff'} isLoading={isLoading} size={150} css={override} />
        </div> :
        <Router>
            <div>
                <Navbar totalItems={cart.total_items} />
                <Switch>
                    <Route exact path="/">
                        <Products products={products} onAddToCart={handleAddToCart} isLoading={isLoading} />
                    </Route>

                    <Route exact path="/cart">
                        <Cart cart={cart}
                            handleUpdateCartQty={handleUpdateCartQty}
                            handleRemoveFromCart={handleRemoveFromCart}
                            handleEmptyCart={handleEmptyCart}
                        />
                    </Route>

                    <Route exact path="/checkout">
                        <Checkout
                            cart={cart}
                            order={order}
                            onCaptureCheckout={handleCaptureCheckout}
                            error={errorMessage}
                        />
                    </Route>

                </Switch>
            </div>
        </Router>

}

export default App;