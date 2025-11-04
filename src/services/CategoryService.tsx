import axios, {type AxiosResponse} from "axios";

class CategoryService {
    BASE_URL = "https://fakestoreapi.com";
    getAllCategories():Promise<string[]> {
        return new Promise((resolve:any, reject:any) => {
            axios.get(`${this.BASE_URL}/products/categories`)
                .then((response:AxiosResponse<any, any>) => resolve(response.data))
                .catch((error:any) => reject(error))
        })
    }
}

export default new CategoryService();