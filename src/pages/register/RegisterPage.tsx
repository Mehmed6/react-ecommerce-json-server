import "./Register.scss"
import {Button, InputAdornment, TextField} from "@mui/material";
import { FaUser } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import {useFormik} from "formik";
import registerPageShema from "../../shemas/RegisterPageShema.tsx";
import type {UserType} from "../../types/Types.tsx";
import registerPageService from "../../services/RegisterPageService.tsx";
import { toast } from 'react-toastify';
import {useNavigate} from "react-router-dom";
const RegisterPage = () => {

    const navigate = useNavigate();
    const registerSubmit = async (values:any, _action:any) => {
        try {
            const payload:UserType = {
                id: String(Math.floor(Math.random() * 999999)),
                username: values.username,
                password: values.password,
                balance: 1000
            }
            const response = await registerPageService.register(payload)

            if (response) {
                console.log(response)
                clearFrom();
                toast.success("Kayıt Başarılı. Login Sayfasına Yönlendiriliyorsunuz..");
                setTimeout(() => navigate("/login"), 2000)

            }
        } catch (error) {
            toast.error("Register Hatası " + error);
        }
    }

    const {values, handleSubmit, handleChange, errors, resetForm} = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        onSubmit: registerSubmit,
        validationSchema: registerPageShema
    })

    const clearFrom = () => {
        resetForm()
    }
    return (
        <div className="register">
        <div className="register-main">
            <form className="register-form" onSubmit={handleSubmit}>
                <div className="input-wrapper">
                    <TextField className="username"
                        id="username"
                        label="Kullanıcı Adı"
                        value={values.username}
                        onChange={handleChange}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FaUser/>
                                    </InputAdornment>
                                ),
                            },
                        }}
                        variant="standard"
                        helperText={errors.username && <span className="helper-errors">{errors.username}</span>}
                    />
                    <TextField
                        id="password"
                        label="Parola"
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <RiLockPasswordFill />
                                    </InputAdornment>
                                ),
                            },
                        }}
                        variant="standard"
                        helperText={errors.password && <span className="helper-errors">{errors.password}</span>}
                    />
                </div>
                <div className="btn-wrapper">
                    <Button type="submit" color="success" variant="contained">Kaydol</Button>
                    <Button onClick={clearFrom} className="clear-btn" variant="contained">Temizle</Button>
                </div>
            </form>
        </div>
        </div>
    );
};

export default RegisterPage;