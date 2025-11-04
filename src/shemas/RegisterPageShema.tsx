import * as yup from "yup";


const registerPageShema = yup.object().shape({
    username: yup.string().trim().required("Username Bos Olamaz!!")
        .min(4, "Username Minimum 4 Karakterli Olmalı!!"),
    password: yup.string().trim().required("Password is required")
        .min(6, "Password Minimum 6 Karakterli Olmalı!!")
})

export default registerPageShema;