import { Divider, Box, Typography, Button, styled, Container } from '@mui/material';

import { Link, useNavigate } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";

const Slide = ({ products, title }) => {
    const navigate = useNavigate()

    return (
        <Component>
            <Deal>
                <DealText>{title}</DealText>

                <ViewAllButton
                    variant="contained"
                    onClick={() => { navigate("/Products") }}
                >
                    View All
                </ViewAllButton>
            </Deal>

            <Divider />

            <Carousel
                swipeable={false}
                draggable={false}
                responsive={responsive}
                centerMode={true}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={10000}
                keyBoardControl={true}
                showDots={false}
                containerClass="carousel-container"
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px">
                {
                    products.map((product, index) => (
                        <Link key={index} to={`/product/view/${product._id}`} style={{ textDecoration: 'none' }}>
                            <Box textAlign="center" style={{ padding: '25px 15px' }}>
                                <Image src={product.productImage} />
                                <TitleText style={{ fontWeight: 600, color: '#212121' }}>{product.productName}</TitleText>
                                <TextContainer>
                                    <Text style={{ color: '#525050', textDecoration: "line-through" }}>{product.price.mrp}</Text>
                                    <Text>₹{product.price.cost}</Text>
                                    <Text style={{ color: 'green' }}>{product.price.discountPercent}</Text>
                                </TextContainer>
                                <Text style={{ color: '#212121', opacity: '.6' }}>{product.tagline}</Text>
                            </Box>
                        </Link>
                    ))
                }
            </Carousel>
        </Component>
    )
}

export default Slide;

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    }
};

const Component = styled(Box)`
    margin-top: 10px;
    background: #FFFFFF;
`;

const Deal = styled(Box)`
    display: flex;    
    padding: 15px 20px;
`

const DealText = styled(Typography)`
    font-size: 22px;
    font-weight: 600;
    line-height: 32px;
    margin-right: 25px;
`

const ViewAllButton = styled(Button)`
    margin-left: auto;
    background-color: #4d1c9c;
    border-radius: 2px;
    font-size: 13px;
    &:hover {
      background-color: #7a1ccb;
    }
`;

const Image = styled('img')({
    width: 'auto',
    height: 150
})

const TitleText = styled(Typography)`
    font-size: 14px;
    margin-top: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Text = styled(Typography)`
    font-size: 14px;
    margin-top: 5px
`

const TextContainer = styled(Container)`
    display: flex;
    gap: 8px;
    justify-content: center;
    align-items: center;
    margin: 8px;
`;