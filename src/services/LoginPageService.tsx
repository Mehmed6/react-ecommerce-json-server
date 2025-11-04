import type {UserType} from "../types/Types.tsx";
import axiosInstance from "../config/AxiosConfig.tsx";
import type {AxiosResponse} from "axios";

class LoginPageService {
    login():Promise<UserType[]> {
        return new Promise((resolve:any, reject:any) => {
            axiosInstance.get("/users")
                .then((response:AxiosResponse) => resolve(response.data))
                .catch((error:any) => reject(error));
        })
    }
}

export default new LoginPageService();