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
        <div className={`featured_item ${active ? "active" : ""}`}>
            <div className="featured_item_pic" onClick={() => setActive(!active)}>
                <img src={item.img} alt={item.name} />
            </div>

            <div className="featured_item_text">
                <h6>
                    {/* Dùng id cho chắc chắn */}
                    <Link to={`/product/${item.id}`}>
                        {item.name}
                    </Link>
                </h6>
                {item.price && <h5>{formatter(item.price)}</h5>}

                {active && (
                    <ul className="featured_item_pic_hover">
                        <li>
                            <Link to={`/product/${item.id}`}>
                                <AiOutlineEye />
                            </Link>
                        </li>
                        <li>
                            <AiOutlineShoppingCart />
                        </li>
                    </ul>
                )}
            </div>
        </div>
    );
};

export const FeaturedProducts = {

    all: {
        title: "All",
        products: [
            { id: 101, name: "Rolex Datejust 31", img: "https://empireluxury.vn/wp-content/uploads/2024/08/dong-ho-rolex-datejust-31-278240-mat-so-trang-9.jpg", price: 192000000 },
            { id: 102, name: "Rolex 36mm M126233-0016", img: "https://www.watchstore.vn/wp-content/uploads/2023/05/m126233-0016-1712663261-1024x1024.jpg", price: 297500000 },

            { id: 103, name: "CASIO EDIFICE 41mm EFB-710SG-2AVUDF", img: "https://www.watchstore.vn/wp-content/uploads/2025/08/CA4640-09A-27.png", price: 6440000 },
            { id: 104, name: "CASIO EDIFICE 41mm EFB-710SG-1AVUDF", img: "https://www.watchstore.vn/wp-content/uploads/2025/08/CA4640-09A-26.png", price: 7579000 },
            { id: 105, name: "CASIO EDIFICE 43mm ECB-S10NIS-7ADR", img: "https://www.watchstore.vn/wp-content/uploads/2025/08/CA4640-09A-25.png", price: 10850000 },

            { id: 106, name: "Orient 43mm Nam RE-AT0107S30B", img: "https://www.watchstore.vn/wp-content/uploads/2025/08/EO1184-81D-4-2.png", price: 19125000 },
            { id: 107, name: "Orient 40.5mm RA-AC0019L30B", img: "https://www.watchstore.vn/wp-content/uploads/2025/08/EO1184-81D-1-2.png", price: 4930000 },
            { id: 108, name: "Orient 40.5mm RA-AC0020G30B", img: "https://www.watchstore.vn/wp-content/uploads/2025/08/EO1184-81D-2-2.png", price: 7100000 },

            { id: 109, name: "Seiko 39mm SSB481P1", img: "https://www.watchstore.vn/wp-content/uploads/2025/08/Du-an-moi-6-4.png", price: 10800000 },
            { id: 110, name: "Seiko 40mm SSB459P1", img: "https://www.watchstore.vn/wp-content/uploads/2025/08/Du-an-moi-2-4.png", price: 10800000 },
            { id: 111, name: "Seiko 41.7mm SRPL53K1", img: "https://www.watchstore.vn/wp-content/uploads/2025/08/Du-an-moi-1-6.png", price: 16920000 },

            { id: 112, name: "SR-SL6657.4202", img: "https://www.dangquangwatch.vn/upload/product/dong_ho_nu_nhat_sr_sl10721201tejpeg_1628431044-1957575113.jpeg", price: 2750000 },
            { id: 113, name: "Mido Belluna Royal", img: "https://donghoduyanh.com/images/products/2025/08/08/large/m0241102210300_1754643848.jpg.webp", price: 16335000 },
            { id: 114, name: "Citizen Eco-Drive EM0416-78A", img: "https://donghoduyanh.com/images/products/2025/07/09/large/citizen-em0416-78a_1752054366.jpg.webp", price: 4790000 },

            { id: 115, name: "Carnival 41mm Nam 8131G-VH-TT", img: "https://www.watchstore.vn/wp-content/uploads/2025/06/Carnival-Nam-8131G-VH-TT.jpg", price: 4480000 },
            { id: 116, name: "Olym Pianus 42mm OP990-45ADGS-GL-D", img: "https://www.watchstore.vn/wp-content/uploads/2022/05/op990-45adgs-gl-d-1-1655171724651-1712585288-1024x1024.jpg", price: 6670000 },

            { id: 117, name: "Frederique Constant 23mm FC-200MC16", img: "https://www.watchstore.vn/wp-content/uploads/2021/06/fc-200mc16-0-1625740043875-1712571532.jpg", price: 20178000 },
            { id: 118, name: "Orient 40.8mm RA-AR0004S30B", img: "https://www.watchstore.vn/wp-content/uploads/2020/12/ra-ar0004s10b-1756195028-1760240517-1712565563-1024x1024.jpg", price: 8008008 },
        ],
    },

    rolex: {
        title: "Rolex",
        products: [
            { id: 201, name: "Rolex 41mm M126334-0026", img: "https://www.watchstore.vn/wp-content/uploads/2023/05/m126334-0026-1712663408-1024x1024.jpg", price: 276250000 },
            { id: 202, name: "Rolex 36mm M126231-0043", img: "https://www.watchstore.vn/wp-content/uploads/2023/05/m126231-0043-1712663175-1024x1024.jpg", price: 280000000 },
            { id: 203, name: "Rolex 41mm M126331-0004", img: "https://www.watchstore.vn/wp-content/uploads/2023/05/m126331-0004-1-1115527411-1790351819-1712663176-1024x1024.jpg", price: 485000000 },
            { id: 204, name: "Rolex 40mm M126900-0001", img: "https://www.watchstore.vn/wp-content/uploads/2023/05/m126900-0001-1712663174-1024x1024.jpg", price: 160525000 },
            { id: 205, name: "Rolex 41mm M126334-0016", img: "https://www.watchstore.vn/wp-content/uploads/2023/05/m126334-0016-1712663407-1024x1024.jpg", price: 392000000 },
        ],
    },

    casio: {
        title: "Casio",
        products: [
            { id: 301, name: "Casio G-Shock GD-350GB-1DR", img: "https://donghoduyanh.com/images/products/2023/09/14/large/gd-350gb-1dr_1694699218.jpg.webp", price: 3850000 },
            { id: 302, name: "Casio Edifice EFR-574D-2AVUDF", img: "https://donghoduyanh.com/images/products/2023/09/14/large/efr-574d-2avudf_1694707693.jpg.webp", price: 4228000 },
            { id: 303, name: "Casio Edifice EQS-950D-1AVUDF", img: "https://donghoduyanh.com/images/products/2024/06/06/large/eqs-950d-1avudf_1717648858.jpg.webp", price: 4993000 },
            { id: 304, name: "Casio Edifice EFV-610D-3CVUDF", img: "https://donghoduyanh.com/images/products/2023/03/13/large/efv-610d-3cvudf_1678693574.jpg.webp", price: 2888000 },
        ],
    },

    orient: {
        title: "Orient",
        products: [
            { id: 401, name: "Orient Multi Year Calendar RA-BA0006B30B", img: "https://donghoduyanh.com/images/products/2025/04/30/large/ra-ba0006b30b_1745951006.jpg.webp", price: 6728000 },
            { id: 402, name: "Orient Mako Solar RA-WJ0002L10B", img: "https://donghoduyanh.com/images/products/2025/04/30/large/ra-wj0002l10b_1745950374.jpg.webp", price: 7368000 },
            { id: 403, name: "Orient RF-QD0009S10B", img: "https://donghoduyanh.com/images/products/2025/04/30/large/rf-qd0009s10b_1745949370.jpg.webp", price: 4258000 },
            { id: 404, name: "Orient Star Layered Skeleton Limited RE-AV0B11E00B", img: "https://donghoduyanh.com/images/products/2025/03/14/large/re-av0b11e00b_1741944739.jpg.webp", price: 28680000 },
            { id: 405, name: "Orient Limited Edition RA-AR0011S30B", img: "https://donghoduyanh.com/images/products/2025/04/18/large/dong-ho-deo-tay-orient-ra-ar0011s30b_1744956768.jpg.webp", price: 13000000 },
        ],
    },

    seiko: {
        title: "Seiko",
        products: [
            { id: 501, name: "Seiko 5 Sports Vintage Car Special Edition SRPL47K1", img: "https://donghoduyanh.com/images/products/2025/08/22/large/seiko-srpl47k1_1755854222.jpg.webp", price: 9258000 },
            { id: 502, name: "Seiko 5 Sport SKX series SRPL85K1", img: "https://donghoduyanh.com/images/products/2025/06/18/large/srpl85k1_1750229413.jpg.webp", price: 12000000 },
            { id: 503, name: "Seiko Presage Classic Series SPB478J1", img: "https://donghoduyanh.com/images/products/2025/05/09/large/seiko_spb478j1_1746780931.jpg.webp", price: 27600000 },
            { id: 504, name: "Seiko Presage SSA464J1", img: "https://donghoduyanh.com/images/products/2025/02/24/large/ssa464j1_1740381704.jpg.webp", price: 17200000 },
            { id: 505, name: "Seiko 5 Sports SKX Series Limited Edition SSK046K1", img: "https://donghoduyanh.com/images/products/2025/02/24/large/ssk046k1_1740382614.jpg.webp", price: 14960000 },
        ],
    },

    nu: {
        title: "Women's watches",
        products: [
            { id: 601, name: "Casio G-Shock GMA-S2100MD-7ADR", img: "https://donghoduyanh.com/images/products/2023/09/15/large/gma-s2100md-7adr_1694711421.jpg.webp", price: 3592000 },
            { id: 602, name: "Orient Blue Moon II Open Heart RA-AG0018L30B", img: "https://donghoduyanh.com/images/products/2025/06/19/large/ra-ag0018l30b_1750298349.jpg.webp", price: 7570000 },
            { id: 603, name: "Daniel Wellington 28mm DW00100220", img: "https://www.watchstore.vn/wp-content/uploads/2023/08/01_1727663151.jpg", price: 3770000 },
            { id: 604, name: "Bulova 36mm 96P197", img: "https://www.watchstore.vn/wp-content/uploads/2022/03/96p197-1-632230052-533769143-1712581137-1024x1024.jpg", price: 10200000 },
            { id: 605, name: "Tissot 35mm Nữ T050.207.37.017.04", img: "https://www.watchstore.vn/wp-content/uploads/2025/06/tissot-nu-t050-207-37-017-04.jpg", price: 14800000 },
        ],
    },
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
            id: 1,
            name: "Casio Watch 43.5mm Men MTP-1374L-1AVDF",
            img: "https://www.watchstore.vn/wp-content/uploads/2020/11/1-khung-sp-1-1818542633-1853976209-1712563883-600x600.jpg",
        },
        {
            id: 2,
            name: "Orient Watch 42mm Men RA-AA0B02R39B (RA-AA0B02R19B)",
            img: "https://www.watchstore.vn/wp-content/uploads/2020/09/ra-aa0b02r19b-2081811590-287106387-1712554040-1024x1024.jpg",
        },
        {
            id: 3,
            name: "Tissot Watch 41mm Men T086.408.22.036.00",
            img: "https://www.watchstore.vn/wp-content/uploads/2020/12/dong-ho-tissot-t086-408-22-036-00_1-ims-1712565982-1024x1024.jpg",
        },
        {
            id: 4,
            name: "Carnival Watch 41mm Men 8131G-CH-D",
            img: "https://www.watchstore.vn/wp-content/uploads/2025/06/z6676116817384_61de97491cbb4ca1c7731896b9c800cc_1749192353-920x1024.jpg",
        },
        {
            id: 5,
            name: "Casio Watch 52.4mm Men GST-S100G-1BDR",
            img: "https://www.watchstore.vn/wp-content/uploads/2020/11/gst-s100g-1bdr-1712564113-1024x1024.jpg",
        },
        {
            id: 6,
            name: "Titoni Cosmo Queen 729 G-DB-541 Women Sapphire Glass Automatic 27mm, PVD Gold Plated, Water Resistant 10ATM",
            img: "https://image.donghohaitrieu.com/wp-content/uploads/2024/05/Titoni-729-G-DB-541.jpg",
        }
    ];


    const renderFeaturedProducts = (data) => {
        const tabList = [];
        const tabPanels = [];

        Object.keys(data).forEach((key, index) => {
            tabList.push(<Tab key={index}>{data[key].title}</Tab>);
            tabPanels.push(
                <TabPanel key={index}>
                    <div className="tab-panel-grid">
                        {data[key].products.map((item, j) => (
                            <FeaturedItem key={j} item={item} />
                        ))}
                    </div>
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
