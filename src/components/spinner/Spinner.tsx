
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {useSelector} from "react-redux";
import type {RootState} from "../../redux/store.tsx";
const Spinner = () => {
    const {loading} = useSelector((state:RootState) => state.appStore)
    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={loading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

export default Spinner;