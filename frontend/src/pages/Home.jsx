import React, { useEffect } from 'react'
import { Box, Container, styled } from '@mui/material'
import Slide from './Slide'
import Banner from './Banner'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../redux/userHandle'
import ProductsMenu from './customer/components/ProductsMenu'

const Home = () => {
  const adURL = 'https://rukminim1.flixcart.com/flap/464/708/image/1f03e99f6dc9f7a6.jpg?q=70';

  const dispatch = useDispatch()

  const { productData, responseProducts, error, currentRole } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch])

  return (
    <div id="top">
      <Container sx={{
        display: 'none',
        '@media (max-width: 600px)': {
          display: 'flex',
        },
      }}>

        {currentRole === "Customer" &&
          <ProductsMenu dropName="Categories" />
        }

        {currentRole === "Customer" &&
          <ProductsMenu dropName="Products" />
        }

      </Container>
      <BannerBox>
        <Banner />
      </BannerBox>

      {error ?
        <Container>
          Loading...
        </Container>
        :
        <>
          {responseProducts ?
            <Container>
              No products found right now
            </Container>
            :
            <>
              <Component>
                <LeftComponent>
                  <Slide products={productData} title='Top Selection' />
                </LeftComponent>

                <RightComponent>
                  <img src={adURL} alt="" style={{ width: 217 }} />
                </RightComponent>
              </Component>

              <Slide products={productData} title='Deals of the Day' />
              <Slide products={productData} title='Suggested Items' />
              <Slide products={productData} title='Discounts for You' />
              <Slide products={productData} title='Recommended Items' />
            </>
          }
        </>
      }

    </div>
  )
}

export default Home

const BannerBox = styled(Box)`
    padding: 20px 10px;
    background: #F2F2F2;
`;

const Component = styled(Box)`
    display: flex;
`

const LeftComponent = styled(Box)(({ theme }) => ({
  width: '83%',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}))

const RightComponent = styled(Box)(({ theme }) => ({
  marginTop: 10,
  background: '#FFFFFF',
  width: '17%',
  marginLeft: 10,
  padding: 5,
  textAlign: 'center',
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}));