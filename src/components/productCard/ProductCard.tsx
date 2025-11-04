import type {ProductType} from "../../types/Types.tsx";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import "./ProductCard.scss"
import {useNavigate} from "react-router-dom";

interface ProductCardType {
    product: ProductType;
}

const ProductCard = (product:ProductCardType) => {

    const {id, title, price, description, image} = product.product;
    const navigate = useNavigate();
    return (
        <div className="productCard">
            <Card className="card-main">
                <CardActionArea className="card-content">
                    <CardMedia onClick={() => navigate("/product-detail/" + id)} className="card-image"
                               component="img"
                               image={image}
                    />
                    <CardContent>
                        <Typography className="card-title">
                            {title}
                        </Typography>
                        <Typography className="card-description">
                            {description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions className="btn-price-wrapper">
                    <Button onClick={() => navigate("/product-detail/" + id)} variant="contained" color="success">
                        Detay
                    </Button>
                    <Typography className="price">
                        {price} €
                    </Typography>

                </CardActions>
            </Card>
        </div>

    );
};

export default ProductCard;