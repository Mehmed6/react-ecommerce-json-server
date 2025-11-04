import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import type {ProductType, UserType} from "../../types/Types.tsx";
import {setCurrentUser, setLoading, setProducts} from "../../redux/appSlice.tsx";
import productService from "../../services/ProductService.tsx";
import {toast} from "react-toastify";
import type {RootState} from "../../redux/store.tsx";
import ProductCard from "../../components/productCard/ProductCard.tsx";
import "./Home.scss"
import Categories from "../../components/categories/Categories.tsx";
import {mergeBaskets} from "../../utils/mergeBaskets.ts";
import {setBasket} from "../../redux/basketSlice.tsx";

const HomePage = () => {
    const dispatch = useDispatch();
    const {products, currentUser} = useSelector((state:RootState) => state.appStore)

    const getAllProducts = async () => {
        try {
            dispatch(setLoading(true));
            const products: ProductType[] = await productService.getAllProducts();
            if (products) {
                dispatch(setProducts(products));
            }
        } catch (error) {
            toast.error("Ürünler getirilirken hata olustu " + error);
        }
        finally {
            dispatch(setLoading(false));
        }
    }

    const getBaskets = (user:UserType) => {
        const guestBasketString = localStorage.getItem("basket");
        const guestBasket = guestBasketString ? JSON.parse(guestBasketString) : []

        const userBasketString = localStorage.getItem(`basket_${user.id}`);
        const userBasket = userBasketString ? JSON.parse(userBasketString) : []

        const mergedBasket = mergeBaskets(userBasket, guestBasket)

        dispatch(setBasket(mergedBasket));
        localStorage.setItem(`basket_${user.id}`, JSON.stringify(mergedBasket));
        localStorage.removeItem("basket");

    }

    useEffect(() => {
        const currentUserString = localStorage.getItem("currentUser");
        if (currentUserString) {
            const currentUser:UserType = JSON.parse(currentUserString);
            dispatch(setCurrentUser(currentUser));
        }
        getAllProducts();

    }, [])

    useEffect(() => {
        if (currentUser) {
            getBaskets(currentUser);
        }
    }, [currentUser]);

    return (
        <div className="home-page">
            <Categories />
            <div className="home-wrapper">
            {products && products.map((product:ProductType, index:number) =>
                <ProductCard key={index} product={product}/>
            )}
        </div>
        </div>
    );
};

export default HomePage;