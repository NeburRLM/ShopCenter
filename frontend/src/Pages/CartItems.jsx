import React, { useContext, useEffect, useState } from 'react';
import './CartItems.css';
import remove_icon from '../Assets/cart_cross_icon.png';
import { ShoppingCartContext } from '../Context/ShoppingCartContext';


function CartItems() {
    const { setShoppingCartItems, shoppingCartItems } = useContext(ShoppingCartContext);
    const [username, setUsername] = useState("");

    const fetchUserData = async () => {

        const response = await fetch('http://localhost:4000/me', { credentials: 'include' });

        const parsedResponse = await response.json();
        setUsername(parsedResponse.username);

    }

    const removeFromCart = (productId) => {
        const updatedShoppingCartItems = shoppingCartItems.map(item => {
            if (item.id === productId) {
                if (item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return null;
            }
            return item;
        }).filter(Boolean);

        setShoppingCartItems(updatedShoppingCartItems);
    };

    const getTotalCartAmount = () => {
        let total = 0;
        shoppingCartItems.forEach(item => {
            total += item.new_price * item.quantity;
        });
        return total;
    };

    const postorder = async () => {

        const credentials =

        {
            userId: username,
            price: getTotalCartAmount(),
            orderItems: shoppingCartItems.map(item => ({
                gameId: item.id,
                quantity: item.quantity,
            }))

        }


        const registerFetchConfig = {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        };

        const response = await fetch('http://localhost:4000/order', registerFetchConfig);
        if (response.status === 409) {
            alert('Error');
        }
    };



    const handleCheckout = async () => {

        if (getTotalCartAmount() !== 0) {


            const response = await fetch('http://localhost:4000/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    items: shoppingCartItems.map(item => ({
                        id: item.id,
                        quantity: item.quantity,
                        name: item.name,
                        priceInCents: Math.round(item.new_price * 100).toFixed(0),
                    })),
                }),
            });

            const data = await response.json();

            postorder();



            window.location = data.url;
        } else {

            alert("No hay productos en el carro")
        }
    };
    useEffect(() => {
        fetchUserData();
    }, []);


    return (
        <div className='cartitems'>
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {shoppingCartItems.map((item) => (
                <div key={item.id}>
                    <div className="cartitems-format cartitems-format-main">
                        <img src={"../" + item.image} alt="" className='carticon-product-icon-small' />
                        <p>{item.name}</p>
                        <p>{item.new_price}€</p>
                        <button className='cartitems-quantity'>{item.quantity}</button>
                        <p>{item.new_price * item.quantity}€</p>
                        <img className='cartitems-remove-icon' src={remove_icon} alt="remove" onClick={() => { removeFromCart(item.id) }} />
                    </div>
                    <hr />
                </div>
            ))}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>cart Totals</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>{getTotalCartAmount().toFixed(2)}€</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Free</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>{getTotalCartAmount().toFixed(2)}€</h3>
                        </div>
                    </div>
                </div>
                <button className="cartitems-total button" onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
            </div>
            <div className="cartitems-promocode">
                <p>If you have a promo code, Enter it here</p>
                <div className="cartitems-promobox">
                    <input type="text" placeholder='promo code' />
                    <button>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default CartItems;