import { memo } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from 'react-icons/fa';
import { FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-6 ol-sm-6 col-xs-12">
                        <div className="footer_about">
                            <h1 className="footer_about_logo">Watch SHOP</h1>
                            <ul>
                                <li>Address: Infinity City</li>
                                <li>Phone: 0352-345-789</li>
                                <li>Email: webshop@gmail.com</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 ol-sm-6 col-xs-12">
                        <div className="footer_widget">
                            <h6>Store</h6>
                            <ul>
                                <li>
                                    <Link to="">Contact</Link>
                                </li>
                                <li>
                                    <Link to="">About Us</Link>
                                </li>
                                <li>
                                    <Link to="">Products</Link>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <Link to="">Account Information</Link>
                                </li>
                                <li>
                                    <Link to="">Shopping Cart</Link>
                                </li>
                                <li>
                                    <Link to="">Wishlist</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-12 ol-sm-12 col-xs-12">
                        <div className="footer_widget">
                            <h6>Promotions & Offers</h6>
                            <p>Subscribe to get updates here
                                <form action="#">
                                    <div className="input-gr"></div>
                                    <div>
                                        <input type="text" placeholder="Enter your email" />
                                        <button type="submit" className="button-submit">
                                            Subscribe</button>
                                    </div>
                                    <div className="footer_widget_social">
                                        <div>
                                            <FaFacebookF />
                                        </div>
                                        <div>
                                            <FaInstagram />
                                        </div>
                                        <div>
                                            <FaLinkedinIn />
                                        </div>
                                    </div>
                                </form>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default memo(Footer);
