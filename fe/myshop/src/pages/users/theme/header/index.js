import { memo, useState } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import { AiOutlineMail, AiOutlineMenu, AiOutlinePhone, AiOutlineShoppingCart } from "react-icons/ai";
import { FaFacebookF, FaInstagram, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { Routers } from "utils/router";

const Header = () => {
    const [isShowCategories, setIsShowCategories] = useState(false);
    const [menus] = useState([
        { name: "Home", path: Routers.user.Home },
        { name: "Shop", path: Routers.user.Products },
        {
            name: "Products",
            path: "",
            isShowSubmenu: false,
            child: [
                { name: "Men's Watches", path: "" },
                { name: "Women's Watches", path: "" },
                { name: "Sports Watches", path: "" },
                { name: "Featured", path: "" },
            ],
        },
        { name: "Reviews", path: "" },
        { name: "Contact", path: "" },
    ]);

    return (
        <>
            <div className="header_top">
                <div className="container">
                    <div className="row">
                        <div className="col-6 header_top_left">
                            <ul>
                                <li>
                                    <AiOutlineMail /> F5xinchao@gmail.com
                                </li>
                                <li>Free Shipping</li>
                            </ul>
                        </div>
                        <div className="col-6 header_top_right">
                            <ul>
                                <li>
                                    <Link to="">
                                        <FaFacebookF />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="">
                                        <FaInstagram />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="">
                                        <FaGithub />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="">
                                        <FaLinkedinIn />
                                    </Link>
                                </li>
                                <li>
                                    <span>Login</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-xl-3">
                        <div className="header_logo">
                            <h1>Watch SHOP</h1>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <nav className="header_menu">
                            <ul>
                                {menus?.map((menu, menuKey) => (
                                    <li key={menuKey} className="active">
                                        <Link to={menu?.path}>{menu?.name}</Link>
                                        {menu.child && (
                                            <ul className="header_menu_dropdown">
                                                {menu.child.map((childItem, childKey) => (
                                                    <li key={`${menuKey}-${childKey}`}>
                                                        <Link to={childItem.path}>{childItem.name}</Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                    <div className="col-xl-3">
                        <div className="header_cart">
                            <div className="header_cart_price">
                                <span>500000</span>
                            </div>
                            <ul>
                                <li>
                                    <Link to="">
                                        <AiOutlineShoppingCart />
                                        <span>2</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row watch_trend">
                    <div className="col-lg-3 watch_trend_provip">
                        <div className="watch_trend_pro" onClick={() => setIsShowCategories(!isShowCategories)}>
                            <AiOutlineMenu /> Product List
                        </div>
                        {isShowCategories && (
                            <ul className={isShowCategories ? "active" : ""}>
                                <li>
                                    <Link to="">Rolex Style</Link>
                                </li>
                                <li>
                                    <Link to="">Swiss Watches</Link>
                                </li>
                                <li>
                                    <Link to="">Japanese Watches</Link>
                                </li>
                                <li>
                                    <Link to="">Orient</Link>
                                </li>
                                <li>
                                    <Link to="">Seiko</Link>
                                </li>
                                <li>
                                    <Link to="">Other Items</Link>
                                </li>
                            </ul>
                        )}
                    </div>
                    <div className="col-lg-9 watch_hero_container">
                        <div className="watch_hero">
                            <div className="watch_form">
                                <form>
                                    <input type="text" placeholder="What are you looking for?" />
                                    <button type="submit">Search</button>
                                </form>
                            </div>
                            <div className="watch_phone">
                                <div className="watch_phone-icon">
                                    <AiOutlinePhone />
                                </div>
                                <div className="watch_phone_text">
                                    <p>0352.345.789</p>
                                    <span>Support from Monday to Saturday</span>
                                </div>
                            </div>
                        </div>
                        <div className="hero_item">
                            <div className="hero_text">
                                <span>Authentic Watches</span>
                                <p>1 Year Warranty</p>
                                <Link to="" className="primary-btn">
                                    Buy Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default memo(Header);
