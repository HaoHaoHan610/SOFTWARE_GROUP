import { memo, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./style.scss";
import { Link } from "react-router-dom";
import { Tab, TabPanel, Tabs, TabList } from "react-tabs";
import { AiOutlineEye, AiOutlineShoppingCart } from "react-icons/ai";
import { formatter } from "../../../utils/formatter";


// Child component for handling each product
const FeaturedItem = ({ item }) => {
    const [active, setActive] = useState(false);

    return (
        <div className="col-lg-3">
            <div className={`featured_item ${active ? "active" : ""}`}>
                <div
                    className="featured_item_pic"
                    style={{ backgroundImage: `url(${item.img})` }}
                    onClick={() => setActive(!active)}
                ></div>

                <div className="featured_item_text">
                    <h6>
                        <Link to="">{item.name}</Link>
                    </h6>
                    <h5>{formatter(item.price)}</h5>

                    {active && (
                        <ul className="featured_item_pic_hover">
                            <li><AiOutlineEye /></li>
                            <li><AiOutlineShoppingCart /></li>
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};


const HomePage = () => {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1920 },
            items: 5,
        },
        desktop: {
            breakpoint: { max: 1920, min: 1024 },
            items: 4,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };

    // Demo products
    const products = [
        {
            name: "Casio Watch 43.5mm Men MTP-1374L-1AVDF",
            img: "https://www.watchstore.vn/wp-content/uploads/2020/11/1-khung-sp-1-1818542633-1853976209-1712563883-600x600.jpg",
        },
        {
            name: "Orient Watch 42mm Men RA-AA0B02R39B (RA-AA0B02R19B)",
            img: "https://www.watchstore.vn/wp-content/uploads/2020/09/ra-aa0b02r19b-2081811590-287106387-1712554040-1024x1024.jpg",
        },
        {
            name: "Tissot Watch 41mm Men T086.408.22.036.00",
            img: "https://www.watchstore.vn/wp-content/uploads/2020/12/dong-ho-tissot-t086-408-22-036-00_1-ims-1712565982-1024x1024.jpg",
        },
        {
            name: "Carnival Watch 41mm Men 8131G-CH-D",
            img: "https://www.watchstore.vn/wp-content/uploads/2025/06/z6676116817384_61de97491cbb4ca1c7731896b9c800cc_1749192353-920x1024.jpg",
        },
        {
            name: "Casio Watch 52.4mm Men GST-S100G-1BDR",
            img: "https://www.watchstore.vn/wp-content/uploads/2020/11/gst-s100g-1bdr-1712564113-1024x1024.jpg",
        },
        {
            name: "Titoni Cosmo Queen 729 G-DB-541 Women Sapphire Glass Automatic 27mm, PVD Gold Plated, Water Resistant 10ATM",
            img: "https://image.donghohaitrieu.com/wp-content/uploads/2024/05/Titoni-729-G-DB-541.jpg",
        }
    ];

    const FeaturedProducts = {
        all: {
            title: "All",
            products: [
                {
                    name: "Rolex Datejust 31 278240 Silver Dial",
                    img: "https://empireluxury.vn/wp-content/uploads/2024/08/dong-ho-rolex-datejust-31-278240-mat-so-trang-9.jpg",
                    price: 192000000
                },
            ],
        },

        men: {
            title: "Rolex",
            products: [
                {
                    name: "Rolex aa25",
                    img: "https://th.bing.com/th/id/ODL.2f90b2260c582d29547a83779510c0da?w=197&h=98&c=7&rs=1&qlt=80&o=6&cb=thws4&dpr=1.3&pid=RichNav",
                    price: 30000,
                },
            ],
        },
    };

    const renderFeaturedProducts = (data) => {
        const tabList = [];
        const tabPanels = [];

        Object.keys(data).forEach((key, index) => {
            tabList.push(<Tab key={index}>{data[key].title}</Tab>);
            tabPanels.push(
                <TabPanel key={index}>
                    {data[key].products.map((item, j) => (
                        <FeaturedItem key={j} item={item} />
                    ))}
                </TabPanel>
            );
        });

        return (
            <Tabs>
                <TabList>{tabList}</TabList>
                {tabPanels}
            </Tabs>
        );
    };

    return (
        <>
            {/* Categories Begin */}
            <div className="container container__categories_slider">
                <Carousel responsive={responsive} className="categories_slider">
                    {products.map((p, i) => (
                        <div
                            key={i}
                            className="categories_slider_item"
                            style={{ backgroundImage: `url(${p.img})` }}
                        >
                            <div className="categories_slider_item_text">
                                {p.name}
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
            {/* Categories End */}

            {/* Featured Begin */}
            <div className="container">
                <div className="Featured">
                    <div className="section-title">
                        <h2>Featured Products</h2>
                    </div>
                    {renderFeaturedProducts(FeaturedProducts)}
                </div>
            </div>
            {/* Featured End */}
        </>
    );
};

export default memo(HomePage);
