import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import WidgetsIcon from '@mui/icons-material/Widgets';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useSelector } from 'react-redux';

const SideBar = () => {

    const location = useLocation();

    const { currentRole } = useSelector(state => state.user);

    return (
        <>
            <React.Fragment>
                <ListItemButton
                    component={Link} to="/"
                    sx={(location.pathname === "/" || location.pathname === "/Seller/dashboard") ? styles.currentStyle : styles.normalStyle}
                >
                    <ListItemIcon>
                        <WidgetsIcon sx={{ color: (location.pathname === "/" || location.pathname === "/Seller/dashboard") ? '#4d1c9c' : 'inherit' }} />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItemButton>

                <ListItemButton
                    component={Link} to="/Seller/products"
                    sx={location.pathname.startsWith('/Seller/products') ? styles.currentStyle : styles.normalStyle}
                >
                    <ListItemIcon>
                        <ShoppingCartIcon sx={{ color: location.pathname.startsWith('/Seller/products') ? '#4d1c9c' : 'inherit' }} />
                    </ListItemIcon>
                    <ListItemText primary="Products" />
                </ListItemButton>
                <ListItemButton
                    component={Link} to="/Seller/orders"
                    sx={location.pathname.startsWith('/Seller/orders') ? styles.currentStyle : styles.normalStyle}
                >
                    <ListItemIcon>
                        <PendingActionsIcon sx={{ color: location.pathname.startsWith("/Seller/orders") ? '#4d1c9c' : 'inherit' }} />
                    </ListItemIcon>
                    <ListItemText primary="Orders" />
                </ListItemButton>
                {
                    currentRole === "Shopcart" &&
                    <ListItemButton
                        component={Link} to="/Seller/shopcart"
                        sx={location.pathname.startsWith('/Seller/shopcart') ? styles.currentStyle : styles.normalStyle}
                    >
                        <ListItemIcon>
                            <AdminPanelSettingsIcon sx={{ color: location.pathname.startsWith("/Seller/shopcart") ? '#4d1c9c' : 'inherit' }} />
                        </ListItemIcon>
                        <ListItemText primary="Shopcart" />
                    </ListItemButton>
                }
            </React.Fragment>
            <Divider sx={{ my: 1 }} />
            <React.Fragment>
                <ListItemButton
                    component={Link} to="/Seller/profile"
                    sx={location.pathname.startsWith('/Seller/profile') ? styles.currentStyle : styles.normalStyle}
                >
                    <ListItemIcon>
                        <AccountCircleIcon sx={{ color: location.pathname.startsWith("/Seller/profile") ? '#4d1c9c' : 'inherit' }} />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                </ListItemButton>
                <ListItemButton
                    component={Link} to="/logout"
                    sx={location.pathname.startsWith('/logout') ? styles.currentStyle : styles.normalStyle}
                >
                    <ListItemIcon>
                        <LogoutIcon sx={{ color: location.pathname.startsWith("/logout") ? '#4d1c9c' : 'inherit' }} />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>

            </React.Fragment>
        </>
    );
}

export default SideBar;

const styles = {
    normalStyle: {
        color: "inherit",
        backgroundColor: "inherit"
    },
    currentStyle: {
        color: "#4d1c9c",
        backgroundColor: "#ebebeb"
    },
}