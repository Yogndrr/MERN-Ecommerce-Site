import React from 'react'
import { Box, styled } from '@mui/material'
import { productData } from '../components/products'
import Slide from './Slide'
import Banner from './Banner'

const Home = () => {
  const adURL = 'https://rukminim1.flixcart.com/flap/464/708/image/1f03e99f6dc9f7a6.jpg?q=70';

  return (
    <div>

      <BannerBox>
        <Banner />
      </BannerBox>

      <Component>
        <LeftComponent>
          <Slide products={productData} title='Deals of the Day' timer={true} />
        </LeftComponent>

        <RightComponent>
          <img src={adURL} alt="" style={{ width: 217 }} />
        </RightComponent>
      </Component>

      <Slide products={productData} title='Discounts for You' timer={false} />
      <Slide products={productData} title='Suggested Items' timer={false} />
      <Slide products={productData} title='Top Selection' timer={false} />
      <Slide products={productData} title='Recommended Items' timer={false} />
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