import {Routes, Route } from "react-router-dom";
import HomePage from "../pages/home/HomePage.tsx";
import RegisterPage from "../pages/register/RegisterPage.tsx";
import LoginPage from "../pages/login/LoginPage.tsx";
import ProductDetail from "../pages/productDetail/ProductDetail.tsx";
const RouterConfig = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/product-detail/:productId" element={<ProductDetail/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
        </Routes>
    );
};

export default RouterConfig;