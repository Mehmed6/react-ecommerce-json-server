import "./Navbar.scss"
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {Box, Button, Drawer, List, ListItem, ListItemButton, ListItemText, TextField} from "@mui/material";
import { CiSearch } from "react-icons/ci";
import {useNavigate} from "react-router-dom";
import magaraLogo from "../../images/magara.png"
import {useDispatch, useSelector} from "react-redux";
import {setCurrentUser, setDrawer, setFilterProducts} from "../../redux/appSlice.tsx";
import {toast} from "react-toastify";
import type {ChangeEvent} from "react";
import {FaBars, FaShoppingCart} from "react-icons/fa";
import Badge from '@mui/material/Badge';
import type {RootState} from "../../redux/store.tsx";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {basket} = useSelector((state:RootState) => state.basketStore)
    const {currentUser} = useSelector((state:RootState) => state.appStore)
    const isMobile = useMediaQuery("(max-width:768px)");
    const [menuOpen, setMenuOpen] = useState<boolean>(false);


    const logout = () => {
        if (currentUser) {
            localStorage.removeItem("currentUser");
            dispatch(setCurrentUser(null));
            navigate("/login");
            toast.success("Logged in successfully!");
        }

        navigate("/login");

    }

    const menuItems = [
        { text: "Anasayfa", path: "/" },
        { text: "Ürünler", path: "/products" },
        { text: currentUser ? "Çıkış Yap" : "Giriş Yap", path: "/login", action: logout },
    ];

    const handleChange = async (e:ChangeEvent<HTMLTextAreaElement>) => {
        try {
            dispatch(setFilterProducts(e.target.value));
        } catch (error) {
            toast.error("Filtrelemede hata olustu :" + error)
        }
    }

    const handleDrawer = () => {
        dispatch(setDrawer(true))
    }

    const toggleMenu = (open:boolean) => {
        setMenuOpen(open)
    }

    return (
        <AppBar position="static">
            <Toolbar className="nav-menu">
                <IconButton onClick={() => navigate("/")}>
                    <img className="nav-logo" src={magaraLogo} alt=""/>
                </IconButton>
                <Typography className="nav-logo-text" onClick={() => navigate("/")}>
                    MagaraYol
                </Typography>

                {isMobile ? (
                    <>
                        <IconButton onClick={() => toggleMenu(true)}>
                            <FaBars />
                        </IconButton>
                        <Drawer anchor="right" open={menuOpen} onClose={() => toggleMenu(false)}>
                            <Box onClick={() => toggleMenu(false)}>
                                <List>
                                    {menuItems.map((item, index) => (
                                        <ListItem key={index}>
                                            <ListItemButton onClick={() => (item.action ? item.action() : navigate(item.path))}>
                                                <ListItemText primary={item.text}/>
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                    <ListItem>
                                        <Badge onClick={handleDrawer} badgeContent={basket.length} color="error" sx={{ marginRight: "10px", cursor: "pointer" }}>
                                            <FaShoppingCart/>
                                        </Badge>
                                    </ListItem>
                                </List>
                            </Box>

                        </Drawer>
                    </>
                    ) : (
                        <>
                        <div className="nav-search-wrapper">
                            <CiSearch className="search-icon" />
                            <TextField onChange={(e:ChangeEvent<HTMLTextAreaElement>) => handleChange(e) } className="search-text" placeholder="Ara" variant="standard" sx={{
                                input: { color: 'lightgrey', borderBottom: '1px solid black' },
                                '& .MuiInput-underline:after': { borderBottom: '2px solid lightgrey' },
                            }}/>
                            <Badge onClick={handleDrawer} badgeContent={basket.length} color="error" sx={{margin:"0 5px", cursor:"pointer"}}>
                                <FaShoppingCart className="basket-icon"/>
                            </Badge>
                            <Button onClick={logout} className="logout-btn" variant="contained"> {currentUser ? "Çıkış Yap" : "Giriş Yap"}</Button>
                        </div>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;