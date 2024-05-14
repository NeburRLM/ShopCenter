import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrum from './Breadcrum';
import ProductDisplay from './ProductDisplay';

const Product = () => {
  const [product, setProduct] = useState([]);
  const { productId } = useParams();

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        if (productId) {
          const response = await fetch(`http://localhost:4000/game/${productId}`, { credentials: 'include' });

          if (!response.ok) {
            throw new Error('Error al obtener los datos del juego');
          }

          const gameData = await response.json();

          const game = {
            id: gameData.id,
            name: gameData.name,
            category: gameData.category,
            image: `product_${gameData.id}.png`,
            new_price: (gameData.price * 0.5).toFixed(2),
            old_price: gameData.price,
            description: gameData.description,
            quantity: 1
          };

          setProduct(game);
        }
      } catch (error) {
        console.error(error);
        throw new Error('Hubo un error al obtener los datos del juego');
      }
    };

    fetchGameData();
  }, [productId]);

  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
    </div>
  );
};

export default Product;
