import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { store } from './reducers/store';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ViewProduct from './products/viewProduct';
import Products from './products/products';

function App() {
  return (
    <Provider store={store}>
      <div>
        <BrowserRouter>
          <Routes>
            <Route

              path="/view"
              element={<ViewProduct />}
            ></Route>
            <Route

              path="/"
              element={<Products />}
            ></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
