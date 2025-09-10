import React from "react";
import ChatWindow from "./chat/chatwindow";   // sửa path đúng
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage, { FeaturedProducts } from "./pages/users/Homepage";
import ProductDetail from "./pages/users/ProductDetail";

function App() {
  // gom tất cả sản phẩm thành 1 mảng
  const products = Object.values(FeaturedProducts).flatMap(
    (cat) => cat.products
  );

  return (
    <div>
      <h1>Todo App + Chat Realtime</h1>
      <ChatWindow />

      <Router>
        <Routes>
          <Route path="/" element={<HomePage products={products} />} />
          <Route path="/product/:id" element={<ProductDetail products={products} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
