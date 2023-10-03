import { InputBase, Box, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { setFilteredProducts } from '../../redux/userRelated/userSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { productData } from '../../components/products';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const Search = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch();

    const location = useLocation();

    const [searchTerm, setSearchTerm] = useState("")

    const handleSearch = () => {
        const results = productData.filter(product =>
            product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.subcategory.toLowerCase().includes(searchTerm.toLowerCase())
        );
        dispatch(setFilteredProducts(results));
        if (location.pathname !== "/ProductSearch") {
            navigate("/ProductSearch");
        }
    };

    return (
        <SearchContainer>
            <InputSearchBase
                placeholder="Search for products, brands and more"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSearch();
                    }
                }}
            />
            <SearchIconWrapper>
                <SearchIcon sx={{color:"#4d1c9c"}}/>
            </SearchIconWrapper>
        </SearchContainer>
    )
}

const SearchContainer = styled(Box)`
  border-radius: 2px;
  margin-left: 10px;
  width: 38%;
  background-color: #fff;
  display: flex;
`;

const SearchIconWrapper = styled(Box)`
  margin-left: auto;
  padding: 5px;
  display: flex;
  color: blue;
`;

const InputSearchBase = styled(InputBase)`
  font-size: unset;
  width: 100%;
  padding-left: 20px;
`;

export default Search;