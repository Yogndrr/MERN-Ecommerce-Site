import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {

    const navigate = useNavigate();

    return (
        <Card>
            <Box sx={{ pt: '100%', position: 'relative' }}>
                <Box
                    component="img"
                    alt={product.productName}
                    src={product.productImage}
                    sx={{
                        top: 0,
                        height: 1,
                        objectFit: 'cover',
                        position: 'absolute',
                    }}
                />
            </Box>

            <Stack spacing={2} sx={{ p: 3, cursor: "pointer" }}>
                <Link
                    color="inherit"
                    underline="hover"
                    variant="subtitle2"
                    noWrap
                    onClick={() => navigate("/order/view/" + product._id)}
                    sx={{ fontWeight: 700 }}
                >
                    {product.productName}
                </Link>

                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="subtitle1">
                        <Typography
                            component="span"
                            variant="body1"
                            sx={{
                                color: 'text.disabled',
                                textDecoration: 'line-through',
                            }}
                        >
                            {product.price && product.price.mrp}
                        </Typography>
                    </Typography>
                    <Typography variant="subtitle1">
                        ₹{product.price && product.price.cost}
                    </Typography>
                </Stack>
            </Stack>
        </Card >
    );
}

ProductCard.propTypes = {
    product: PropTypes.object,
};

export default ProductCard