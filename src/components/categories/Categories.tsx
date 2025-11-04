import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {setLoading, setProducts} from "../../redux/appSlice.tsx";
import categoryService from "../../services/CategoryService.tsx";
import {toast} from "react-toastify";
import "./Categories.scss"
import * as React from "react";
import productService from "../../services/ProductService.tsx";
import type {ProductType} from "../../types/Types.tsx";

const Categories = () => {
    const dispatch = useDispatch();
    const [category, setCategory] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const getAllCategories = async () => {
        dispatch(setLoading(true));

        try {
            const categories: string[] = await categoryService.getAllCategories();
            setCategory(categories)
        } catch (error) {
            toast.error("Kategoriler bulunamadı : " + error);
        }
        finally {
            dispatch(setLoading(false));
        }
    }

    const handleChange = async (e:React.ChangeEvent<HTMLInputElement>, categoryName:string) => {

        let newCategories: string[];

        if (e.target.checked)
            newCategories = [...selectedCategories, categoryName];
        else
            newCategories = selectedCategories.filter(c => c !== categoryName)

        setSelectedCategories(newCategories);

        dispatch(setLoading(true));

        try {
            let products:ProductType[] = []

            if (newCategories.length > 0) {
                const response = await Promise.all(
                    newCategories.map(category => productService.getProductsByCategoryName(category))
                )

                products = response.flat()
            } else
                products = await productService.getAllProducts();

            dispatch(setProducts(products));

            /*if (e.target.checked) {
                const products: ProductType[] = await productService.getProductsByCategoryName(categoryName);
                dispatch(setProducts(products));
            } else {
               const products : ProductType[] = await productService.getAllProducts();
               dispatch(setProducts(products));
            }*/

        } catch (error) {
            toast.error("Secili kategori icin ürünler bulunurken hata olustu :" + error);
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        getAllCategories()
    }, []);

    return (
        <div className="categories-container">
            <FormGroup>
                {category && category.map((category:string, index:number) => (
                    <FormControlLabel key={index} control={
                        <Checkbox onChange={((e:React.ChangeEvent<HTMLInputElement>) => handleChange(e, category) )} />}
                        label={category} />
                ))}
            </FormGroup>
        </div>
    );
};

export default Categories;