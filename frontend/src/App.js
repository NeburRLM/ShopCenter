import { RouterProvider } from "react-router-dom"
import React from 'react';

import router from "./Route/router";
import { ShoppingCartProvider } from "./Context/ShoppingCartContext";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ShoppingCartProvider>
          <RouterProvider router={router} />
        </ShoppingCartProvider>
      </header>
    </div>
  )
}

export default App;
