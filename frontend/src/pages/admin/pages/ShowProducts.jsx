import React from 'react'
import { BrownButton, IndigoButton } from '../../../utils/buttonStyles';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ShowProducts = () => {
  const { currentRole } = useSelector(state => state.user);

  const navigate = useNavigate()

  return (
    <div>
      <IndigoButton onClick={() => navigate("/Admin/addproduct")}>
        Add Product
      </IndigoButton>
      <br /><br />
      {
        currentRole === "Shopcart" &&
        <BrownButton onClick={() => navigate("/Admin/uploadproducts")}>
          Upload Product
        </BrownButton>
      }
    </div>
  )
}

export default ShowProducts