import { createBrowserRouter, Outlet } from "react-router-dom";
import Login from "../Pages/Login";
import Shop from "../Pages/Shop";
import React from "react";
import Register from "../Pages/Signup";
import ShopCategory from "../Pages/ShopCategory";
import Footer from '../Pages/Footer';
import videogames_banner from '../Assets/banner_videogames.png';
import CartHistory from '../Pages/CartHistory'
import Success from '../Pages/Success'
import Cancel from '../Pages/Cancel'
import consoles_banner from '../Assets/banner_consoles.png';
import accessories_banner from '../Assets/banner_accessories.png';
import { Navbar } from "../Navbar/Navbar";
import Product from "../Pages/Product";
import CartItems from "../Pages/CartItems";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/Home',
    element:
      <div>
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    ,
    children: [
      {
        path: 'ShopMain',
        element:
          <Shop />
      },
      {
        path: 'Videogames',
        element:
          <ShopCategory banner={videogames_banner} category="videogames" />
      },
      {
        path: 'Consoles',
        element:
          <ShopCategory banner={consoles_banner} category="consoles" />
      },
      {
        path: 'Accessories',
        element:
          <ShopCategory banner={accessories_banner} category="accessories" />
      },
      {
        path: 'product/:productId',
        element:
          <Product />
      },
      {
        path: 'Cart',
        element:
          <CartItems />
      },
      {
        path: 'Profile',
        element:
          <CartHistory />
      },
      {
        path: 'Success',
        element:
          <Success />
      },
      {
        path: 'Cancel',
        element:
          <Cancel />
      },

    ]
  },
  {
    path: '/Register',
    element: <Register />,
  },

]);
export default router;
