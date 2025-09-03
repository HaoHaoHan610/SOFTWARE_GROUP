import React, { useState } from "react";
import "./style.scss";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    brand: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImage = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Assume calling API to save product
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("description", product.description);
    formData.append("brand", product.brand);
    formData.append("image", product.image);

    fetch("http://localhost:5000/api/products", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Product has been successfully posted!");
        console.log(data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="add-product-container">
      <h2>Post New Product</h2>
      <form onSubmit={handleSubmit} className="add-product-form">
        <input
          type="text"
          name="name"
          placeholder="Product name"
          value={product.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Product price"
          value={product.price}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Product description"
          value={product.description}
          onChange={handleChange}
        />
        <select name="brand" value={product.brand} onChange={handleChange}>
          <option value="">Select brand</option>
          <option value="Rolex">Rolex</option>
          <option value="Casio">Casio</option>
          <option value="Orient">Orient</option>
          <option value="Tissot">Tissot</option>
        </select>
        <input type="file" name="image" onChange={handleImage} required />
        <button type="submit">Post product</button>
      </form>
    </div>
  );
};

export default AddProduct;
