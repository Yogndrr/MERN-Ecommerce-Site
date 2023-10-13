import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCustomers } from '../../../redux/userHandle';
import TableTemplate from '../../../components/TableTemplate';
import { Typography } from '@mui/material';
import { IndigoButton } from '../../../utils/buttonStyles';

const ShowCustomers = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const customerID = params.id;

    useEffect(() => {
        dispatch(getCustomers(customerID, "getInterestedCustomers"));
    }, [customerID, dispatch]);

    const { loading, customersList, responseCustomersList } = useSelector(state => state.user);
    
    const customersColumns = [
        { id: 'name', label: 'Customer Name', minWidth: 170 },
        { id: 'quantity', label: 'Product Quantity', minWidth: 100 },
    ]

    const customersRows = Array.isArray(customersList) && customersList.length > 0
        ? customersList.map((customer) => ({
            name: customer.customerName,
            quantity: customer.quantity,
            id: customer.customerID,
        }))
        : [];

    const CustomersButtonHaver = ({ row }) => {
        return (
            <>
                <IndigoButton
                    onClick={() => {
                        console.log(row.name)
                    }}
                >
                    View Customer History
                </IndigoButton >
            </>
        );
    };

    return (
        <>
            {loading ?
                <h1>
                    Loading...
                </h1>
                :
                <>
                    {responseCustomersList ?
                        <h1>
                            No Customers Till Now
                        </h1>
                        :
                        <>
                            <Typography variant="h5" gutterBottom>
                                Customers List:
                            </Typography>

                            <TableTemplate buttonHaver={CustomersButtonHaver} columns={customersColumns} rows={customersRows} />
                        </>
                    }
                </>
            }
        </>
    )
}

export default ShowCustomers