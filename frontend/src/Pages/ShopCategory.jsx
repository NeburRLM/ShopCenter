import './ShopCategory.css';
import Item from './Item';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
const ShopCategory = (props) => {
  const [all_product, setAllProduct] = useState([]);
  const [sortType, setSortType] = useState('default');

  const sortedProducts = [...all_product].sort((a, b) => {
    switch (sortType) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'priceHigh':
        return b.new_price - a.new_price;
      case 'priceLow':
        return a.new_price - b.new_price;
      default:
        return all_product;
    }
  });

  const fetchAllGamesData = async () => {
    try {
      const response = await fetch('http://localhost:4000/game', { credentials: 'include' });

      if (!response.ok) {
        throw new Error('Error al obtener los datos de los juegos');
      }

      const data = await response.json();
      const products = data.map(game => ({
        id: game.id,
        name: game.name,
        category: game.category,
        image: `product_${game.id}.png`,
        new_price: (game.price * 0.5).toFixed(2),
        old_price: game.price,
        description: game.description
      }));

      setAllProduct(products);

    } catch (error) {
      console.error(error);
      alert('Hubo un error al obtener los datos de los juegos');
    }
  };

  useEffect(() => {
    fetchAllGamesData();

  }, []);


  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="" />
      <div className='shopgategory-indexSort'>
        <p>
          <span>Showing {all_product.length}</span> products
        </p>
        <div className="shopcategory-sort">
          Sort by:
          <select onChange={(e) => setSortType(e.target.value)}>
            <option value="default">Default</option>
            <option value="name">Name (A-Z)</option>
            <option value="priceHigh">Price (High-Low)</option>
            <option value="priceLow">Price (Low-High)</option>
          </select>
        </div>
      </div>
      <div className="shopcategory-products">
        {sortedProducts.map((item, i) => {
          if (props.category === item.category) {
            return (
              <Link key={i} to={`/Home/product/${item.id}`}>
                <Item id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
              </Link>
            );
          }
          else {
            return null;
          }
        })}
      </div>
    </div>
  )
}

export default ShopCategory;