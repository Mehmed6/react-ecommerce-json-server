import {Button, InputAdornment, TextField} from "@mui/material";
import {FaUser} from "react-icons/fa6";
import {RiLockPasswordFill} from "react-icons/ri";
import "./LoginPage.scss"
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import { useFormik} from "formik";
import registerPageShema from "../../shemas/RegisterPageShema.tsx";
import loginPageService from "../../services/LoginPageService.tsx";
import type {UserType} from "../../types/Types.tsx";
import {useDispatch} from "react-redux";
import {setCurrentUser, setLoading} from "../../redux/appSlice.tsx";

interface CheckUserType {
    result: boolean;
    currentUser: UserType | null
}

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const checkUser = (userList: UserType[], username:string, password:string) => {
        const findUser:CheckUserType = {result:false,currentUser:null}

        userList.forEach(user => {
            if (user.username === username && user.password === password) {
                findUser.result = true;
                findUser.currentUser = user;
            }
        })

        return findUser;
    }


    const loginSubmit = async (
        values: { username: string; password: string }
    ) => {

        try {
            dispatch(setLoading(true));

            const response:UserType[] = await loginPageService.login();

            if (response) {
                const checkUserResponse = checkUser(response, values.username, values.password);
                if (checkUserResponse.result && checkUserResponse.currentUser) {
                    dispatch(setCurrentUser(checkUserResponse.currentUser));
                    localStorage.setItem("currentUser", JSON.stringify(checkUserResponse.currentUser));
                    navigate("/");
                } else {
                    toast.error("Kullanıcı adı veya şifre hatalı")
                }
            }

        } catch (error) {
            toast.error("Login Hatası " + error);
        } finally {
            dispatch(setLoading(false));
        }
    }

    const {values, handleSubmit, handleChange, errors, resetForm} = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        onSubmit: loginSubmit,
        validationSchema: registerPageShema
    })

    const clearFrom = () => {
        resetForm()
    }
    return (
        <div className="login">
            <div className="login-main">
            <form className="login-form" onSubmit={handleSubmit}>
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
                    <Button type="submit" color="success" variant="contained">Giriş Yap</Button>
                    <Button onClick={clearFrom} className="clear-btn" variant="contained">Temizle</Button>
                </div>
            </form>
        </div>
        </div>
    );
};

export default LoginPage;