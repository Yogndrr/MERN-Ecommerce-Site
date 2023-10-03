import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';
import { productData } from '../../components/products';
import Products from '../Products';
import { setFilteredProducts } from '../../redux/userRelated/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const CustomerSearch = ({ mode }) => {

    const dispatch = useDispatch();

    const [searchTerm, setSearchTerm] = useState("")

    const { filteredProducts } = useSelector(state => state.user);

    const handleSearch = (e) => {
        e.preventDefault()

        const results = productData.filter(product =>
            product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.subcategory.toLowerCase().includes(searchTerm.toLowerCase())
        );
        dispatch(setFilteredProducts(results));
    };

    return (
        <div>
            {
                mode === "Mobile" ?

                    <>
                        <SearchContainer onSubmit={handleSearch}>
                            <TextField
                                label="Search for products, brands and more"
                                variant="outlined"
                                fullWidth
                                size="small"
                                InputProps={{
                                    style: {
                                        borderRadius: 0,
                                    },
                                }}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </SearchContainer>
                        {
                            searchTerm && <Products productData={filteredProducts} />
                        }
                    </>
                    :
                    <>
                        {
                            filteredProducts && <Products productData={filteredProducts} />
                        }
                    </>
            }

        </div>
    );
};

const SearchContainer = styled('form')({
    display: 'flex',
    justifyContent: 'center',
    padding: '16px',
});

export default CustomerSearch;
