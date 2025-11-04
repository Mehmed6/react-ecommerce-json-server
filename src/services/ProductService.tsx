import type {ProductType} from "../types/Types.tsx";
import axios, {type AxiosResponse} from "axios";

class ProductService {
    BASE_URL = "https://fakestoreapi.com"

    getAllProducts(): Promise<ProductType[]> {
        return new Promise((resolve:any, reject:any) => {
            axios.get(`${this.BASE_URL}/products`)
                .then((response:AxiosResponse<any, any>) => resolve(response.data))
                .catch((error:any) => reject(error));
        })
    }

    getProductsByCategoryName(categoryName:string) :Promise<ProductType[]> {
        return new Promise((resolve:any, reject:any) => {
            axios.get(`${this.BASE_URL}/products/category/${categoryName}`)
                .then((response:AxiosResponse<any, any>) => resolve(response.data))
                .catch((error:any) => reject(error))
        })
    }

    getProductById(productId:number) :Promise<ProductType> {
        return new Promise((resolve:any, reject:any) => {
            axios.get(`${this.BASE_URL}/products/${productId}`)
                .then((response:AxiosResponse<any,any>) => resolve(response.data))
                .catch((error:any) => reject(error))
        })
    }

}

export default new ProductService();