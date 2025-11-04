import type {UserType} from "../types/Types.tsx";
import axios from "../config/AxiosConfig.tsx";
import type {AxiosResponse} from "axios";

class RegisterPageService {
    register(newUser:UserType):Promise<UserType> {
        return new Promise((resolve:any, reject:any) => {
            axios.post("/users", newUser)
                .then((response:AxiosResponse) => resolve(response.data))
                .catch((error:any) => reject(error));
        })
    }
}

export default new RegisterPageService()