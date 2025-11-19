import './App.css'
import RouterConfig from "./config/RouterConfig.tsx";
import { ToastContainer } from 'react-toastify';
import Spinner from "./components/spinner/Spinner.tsx";
import Navbar from "./components/navbar/Navbar.tsx";
import {useDispatch} from "react-redux";
import type {ProductType, UserType} from "./types/Types.tsx";
import {setCurrentUser} from "./redux/appSlice.tsx";
import {useEffect} from "react";
import {setBasket} from "./redux/basketSlice.tsx";
import BasketDetails from "./components/basketDetails/BasketDetails.tsx";
import {useLocation} from "react-router-dom";
import Footer from "./components/footer/Footer.tsx";

function App() {
    const dispatch = useDispatch();
    const location = useLocation();

    const getCurrentUser = () => {
        const stringUser = localStorage.getItem("currentUser")
        if (stringUser) {
            const currentUser: UserType = JSON.parse(stringUser) as UserType
            dispatch(setCurrentUser(currentUser));
        }
    }

    const getBasket = () => {
        const basketString: string | null = localStorage.getItem("basket")
        if (basketString) {
            const basket: ProductType[] = JSON.parse(basketString) as ProductType[]
            dispatch(setBasket(basket))
        }
    }

    useEffect(() => {
        getCurrentUser();
        getBasket();
    }, [])

    const hideNavbarRoutes = ["/login", "/register"];
    const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="app-container">
        {shouldShowNavbar && <Navbar />}
        <main className="main-content">
            <RouterConfig/>
            <BasketDetails/>
        </main>
        <ToastContainer autoClose={2500}/>
        <Spinner/>
        <Footer/>
    </div>
  )
}

export default App;