import React, { useContext } from 'react';
import './ProductDisplay.css';
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShoppingCartContext } from '../Context/ShoppingCartContext';


function ProductDisplay(props) {
    const { product } = props;
    const { setShoppingCartItems, shoppingCartItems } = useContext(ShoppingCartContext)

    const handleAddToCart = () => {
        const existingProductIndex = shoppingCartItems.findIndex(item => item.id === product.id);

        if (existingProductIndex !== -1) {
            const updatedShoppingCartItems = [...shoppingCartItems];
            updatedShoppingCartItems[existingProductIndex].quantity += 1;
            setShoppingCartItems(updatedShoppingCartItems);
        } else {
            setShoppingCartItems(prevItems => [...prevItems, { ...product, quantity: 1 }]);
        }
    };

    return (
        <div className='productdisplay'>
            <img className='productdisplay-main-img' src={"../../" + product.image} alt="" />
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-start">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(122)</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">{product.old_price}€</div>
                    <div className="productdisplay-right-price-new">{product.new_price}€</div>
                </div>
                <div className="productdisplay-right-description">{product.description}</div>
                <button onClick={handleAddToCart} className="productdisplay-right-button">ADD TO CART</button>
                <p className='productdisplay-right-category'><span>Category: </span>{product.category}</p>
            </div>
        </div>
    );
}

export default ProductDisplay;