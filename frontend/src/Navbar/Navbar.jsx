import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { useNavigate } from 'react-router-dom';
import { ShoppingCartContext } from '../Context/ShoppingCartContext';

export const Navbar = () => {
    const { shoppingCartItems } = useContext(ShoppingCartContext);
    const [username, setUsername] = useState("");
    const navigate = useNavigate();
    const getTotalItemsInCart = () => {
        let totalItems = 0;
        shoppingCartItems.forEach(item => {
            totalItems += item.quantity;
        });
        return totalItems;
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await fetch('http://localhost:4000/me', { credentials: 'include' });
            if (response.status === 401) {
                return navigate('/');
            }
            const parsedResponse = await response.json();
            setUsername(parsedResponse.username);
        };

        fetchUserData();
    }, [navigate]);

    return (
        <div className='navbar'>
            <div className='nav-logo'>
                <img src={logo} alt="" />
                <p>GAMES CENTER</p>
            </div>
            <ul className='nav-menu'>
                <li> <Link to="/Home/ShopMain">Shop</Link></li>
                <li> <Link to="/Home/Videogames">Videogames</Link></li>
                <li> <Link to="/Home/Consoles">Consoles</Link></li>
                <li> <Link to="/Home/Accessories">Accessories</Link></li>
            </ul>
            <div className='nav-login-cart'>
                <Link to='/Home/Profile'><button>{username}</button></Link>
                <Link to='/Home/cart'><img src={cart_icon} alt="" /></Link>
                <div className="nav-cart-count">{getTotalItemsInCart()}</div>
            </div>
        </div>
    );
};
