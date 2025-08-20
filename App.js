import React from "react";

// Giả lập danh sách đồng hồ
const watches = [
  {
    id: 1,
    name: "Rolex Submariner",
    price: "150 triệu ₫",
    img: "https://wannabuyawatch.com/wp-content/uploads/2021/03/52078styled-1638x2048.jpg",
  },
  {
    id: 2,
    name: "Omega Speedmaster",
    price: "120 triệu ₫",
    img: "https://d2j6dbq0eux0bg.cloudfront.net/images/38270005/3489548631.jpg",
  },
  {
    id: 3,
    name: "Seiko Presage",
    price: "12 triệu ₫",
    img: "https://tse2.mm.bing.net/th/id/OIP.I6PTPf17wmqiPjBrJ0fgPwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
  },

  {
    id: 4,
    name: "Casio G_shock",
    price: "5 triệu đ",
    img: "https://casio.anhkhue.com/upload/images/g-shock/GA-B2100-1A1.jpg"
  },

  {
    id: 5,
    name: "Citizen Promaster BN0261-51E",
    price: "12 triệu đ",
    img: "https://donghoduyanh.com/images/products/2025/08/08/large/bn0261-51e_1754619714.jpg.webp"
  },

  {
    id: 6,
    name: "Frederique Constant Moonphase FC-206RS3S5 G_shock",
    price: "32 triệu đ",
    img: "https://donghoduyanh.com/images/products/2025/08/07/large/fc-206rs3s5_1754562253.jpg.webp"
  }

];

function App() {
  return (
    <div>
      {/* Navbar */}
      <nav className="bg-gray-800 text-white p-4 flex justify-between">
        <h1 className="text-xl font-bold">Vintage Timepiece</h1>
        <div className="space-x-4">
          <button className="hover:underline">Trang chủ</button>
          <button className="hover:underline">Sản phẩm</button>
          <button className="hover:underline">Liên hệ</button>
        </div>
      </nav>

      {/* Hero section */}
      <header className="text-center py-10 bg-gray-100">
        <h2 className="text-3xl font-bold">Hệ thống mua bán & thẩm định đồng hồ cũ</h2>
        <p className="text-gray-600 mt-2">
          Mua, bán và thẩm định đồng hồ chính hãng với giá hợp lý
        </p>
      </header>

      {/* Danh sách sản phẩm */}
      <main className="container mx-auto px-6 py-8">
        <h3 className="text-2xl font-semibold mb-6">Danh sách đồng hồ</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {watches.map((watch) => (
            <div
              key={watch.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition"
            >
              <img
                src={watch.img}
                alt={watch.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h4 className="text-lg font-bold">{watch.name}</h4>
                <p className="text-blue-600 font-semibold">{watch.price}</p>
                <button className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                  Xem chi tiết
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4 mt-8">
        © 2025 Vintage Timepiece - Hệ thống đồng hồ cũ
      </footer>
    </div>
  );
}

export default App;
