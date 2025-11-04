import {Button, Drawer} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../redux/store.tsx";
import {setCurrentUser, setDrawer} from "../../redux/appSlice.tsx";
import type {ProductType, UserType} from "../../types/Types.tsx";
import "./BasketDetails.scss"
import {useEffect} from "react";
import {calculateBasket, removeFromBasket, setBasket} from "../../redux/basketSlice.tsx";
import {toast} from "react-toastify";

const BasketDetails = () => {
    const {drawer, currentUser} = useSelector((state:RootState) => state.appStore)
    const {basket, totalBasket} = useSelector((state:RootState) => state.basketStore)
    const dispatch = useDispatch();

    const handleClose = () => {
        requestAnimationFrame(() => {
            const active = document.activeElement as HTMLElement | null;
            if (active) active.blur();
        });
        dispatch(setDrawer(false));
    }

    const handleRemove = (productId:number) => {
        dispatch(removeFromBasket(productId));
    }
    const handleBuy = () => {
        if (currentUser) {
            if (currentUser.balance < totalBasket) {
                toast.error("Yetersiz Bakiye")
                return;
            }
            const updatedUser: UserType = {...currentUser, balance: currentUser.balance - totalBasket}
            dispatch(setCurrentUser(updatedUser));
            dispatch(setBasket([]))
            localStorage.setItem("currentUser", JSON.stringify(updatedUser))
            localStorage.removeItem(`basket_${currentUser.id}`);
            toast.success("Ürünler Satın Alındı. İyi Günlerde Kullanın!!")

        } else {
            toast.error("Önce giriş yapmalısınız");
        }
    }

    useEffect(() => {
        dispatch(calculateBasket())
    }, [basket])
    return (
        <Drawer open={drawer} onClose={handleClose} anchor="right">
            <div className="basket-details">
                <h1 className="basket-details-title">Sepetiniz</h1>
                <hr/>
                {basket && basket.map((product:ProductType) => (
                    <div key={product.id} className="basket-details-content">
                        <img className="basket-details-img" src={product.image} alt=""/>
                        <div className="details-wrapper">
                            <h4 className="title">{product.title}</h4>
                            <div>
                                <span className="price">Price: {product.price} €</span>
                                <span>Adet: {product.count}</span>
                            </div>
                        </div>
                        <Button className="btn" onClick={() => handleRemove(product.id)} variant="outlined" color="error">Çıkar</Button>
                    </div>
                ))}
                <h2 className="total">Sepet Toplamı: {totalBasket} €</h2>
                <Button className="btn-buy" onClick={handleBuy} variant="contained" color="success">Satın Al</Button>
            </div>
        </Drawer>
    );
};

export default BasketDetails;