import React, { useState, useEffect } from "react";
import { WatchApi } from "./api";

export default function SellerWatchManager({ sellerId }) {
    const [watches, setWatches] = useState([]);
    const [form, setForm] = useState({
        name: "",
        price: "",
        brand: "",
        img: ""
    });

    useEffect(() => {
        fetchWatches();
    },);

    // Gọi API lấy sản phẩm theo seller
    const fetchWatches = async () => {
        try {
            const data = await WatchApi.getBySeller(sellerId); // dùng /watches/seller/<id>
            setWatches(data);
        } catch (err) {
            console.error(err.message);
        }
    };

    // Submit form đăng sản phẩm
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await WatchApi.create({
                ...form,
                price: parseFloat(form.price),
                seller_id: sellerId,
                existing_status: true
            });
            setForm({ name: "", price: "", brand: "", img: "" });
            fetchWatches();
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Đăng sản phẩm mới</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
                <input
                    type="text"
                    placeholder="Tên sản phẩm"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Giá"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Thương hiệu"
                    value={form.brand}
                    onChange={(e) => setForm({ ...form, brand: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Link ảnh sản phẩm"
                    value={form.img}
                    onChange={(e) => setForm({ ...form, img: e.target.value })}
                />
                <button type="submit">Đăng sản phẩm</button>
            </form>

            <h3 style={{ marginTop: "20px" }}>Danh sách sản phẩm đã đăng</h3>
            <ul>
                {watches.map((w) => (
                    <li key={w.id}>
                        <b>{w.name}</b> - {w.price} VND ({w.brand})
                        {w.img && (
                            <div>
                                <img src={w.img} alt={w.name} style={{ width: "100px", marginTop: "5px" }} />
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
