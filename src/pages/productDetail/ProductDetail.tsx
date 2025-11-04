import {useParams} from "react-router-dom";
import "./ProductDetail.scss"
import {useEffect, useState} from "react";
import productService from "../../services/ProductService.tsx";
import type {ProductType} from "../../types/Types.tsx";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {setLoading} from "../../redux/appSlice.tsx";
import Container from '@mui/material/Container';
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import {Button} from "@mui/material";
import {FaCartPlus} from "react-icons/fa";
import {addToBasket} from "../../redux/basketSlice.tsx";
const ProductDetail = () => {
    const {productId} = useParams();
    const dispatch = useDispatch();
    const [currentProduct, setCurrentProduct] = useState<ProductType | null>(null);
    const [productCount, setProductCount] = useState<number>(0)

    const getCurrentProduct = (async () => {

        dispatch(setLoading(true));
        try {
            const response = await productService.getProductById(Number(productId))
            setCurrentProduct(response)
        } catch (error) {
            toast.error("Error getting current product : " + error)
        } finally {
            dispatch(setLoading(false));
        }

    })

    const increaseQuantity = () => {
        if (productCount === 10) {
            const toastId = "max limit-warning";
            if (!toast.isActive(toastId))
                toast.warning("En Fazla 10 Adet Satın Alınabilir!!", {toastId})

            return;
        }
        setProductCount(productCount + 1)
    }

    const decreaseQuantity = () => {
        if (productCount === 0) {
            const toastId = "min limit-warning"
            if (!toast.isActive(toastId))
                toast.warning("Adet 0'dan Kücük Olamaz!!", {toastId})

            return;
        }
        setProductCount(productCount - 1)
    }

    const addToBasketHandle = () => {

        if (productCount === 0) {
            const toastId = "min limit-warning"
            if (!toast.isActive(toastId))
                toast.error("Lütfen kac adet istediginizi secin!", {toastId})
            return;
        }
        if (currentProduct) {
            const newProduct = {
                ...currentProduct,
                count: productCount
            }
            dispatch(addToBasket(newProduct))

        }
        setProductCount(0)
    }

    useEffect( () => {
        getCurrentProduct();
    }, []);

    return (
        <Container className="detail-container">
            {currentProduct &&
                <div className="detail-content">
                    <img src={currentProduct.image} alt=""/>
                    <div>
                        <h1>{currentProduct.title}</h1>
                        <p>{currentProduct.description}</p>
                        <p>{currentProduct.rating.rate} / 5</p>
                        <p>Stoktaki Miktar : {currentProduct.rating.count}</p>
                        <h2 style={{color:"#7e3333"}}>{currentProduct.price} €</h2>
                        <div className="basket-content">
                            <div className="count-content">
                                <CiCirclePlus className="count-icons" onClick={increaseQuantity}/>
                                <span>{productCount}</span>
                                <CiCircleMinus className="count-icons" onClick={decreaseQuantity}/>
                            </div>
                            <div className="basket-buttons">
                                <Button onClick={addToBasketHandle} className="add-basket-btn" variant="contained">
                                    <FaCartPlus/>
                                    <span> Sepete Ekle</span>
                                </Button>
                                <Button className="go-to-basket-btn" variant="contained">
                                    <FaCartPlus/>
                                    <span> Sepete Git</span>
                                </Button>
                            </div>

                        </div>
                    </div>
                </div>

            }
        </Container>
    );
};

export default ProductDetail;