<h1 align="center">
    SHOPCART: Ecommerce Site
</h1>

<h3 align="center">
Seamless shopping, search and explore different product categories, add products to cart, and checkout swiftly. <br>
Become a seller and add products, monitor sales, and gather customer feedback.
</h3>

<br>

[Youtube Video](https://youtu.be/i_z0HYk3IuQ?si=S04-IBq7Ny8k0FYC)
<br><br>
[LinkedIn](https://www.linkedin.com/in/yogndr/)

# About

ShopCart is an ecommerce site developed using the MERN (MongoDB, Express.js, React, Node.js) stack. It offers a user-friendly and efficient shopping experience for customers, while providing sellers with essential tools to manage their products and sales.

## Features

- **User Registration:** ShopCart allows users to register as customers or sellers, enabling a tailored shopping experience.

- **Cart System:** Customers can add products to their cart for easy checkout. The cart allows them to review and manage their selections before completing the purchase.

- **Product Search:** ShopCart offers a search functionality where customers can find products by name or browse through categories such as Electronics, Clothes, Kitchen, and more.

- **Reviews and Ratings:** Customers can leave reviews and ratings (out of 5) for products they've purchased, providing valuable feedback for sellers and building trust within the community.

- **Seller Dashboard:** Sellers have access to a dedicated dashboard where they can manage their products, view sales data, and gain insights into their store's performance through data visualization.

- **Product Management:** Sellers can add products with detailed information and set their prices. They can also check which customers have added their products to their carts.

- **Order Tracking:** Sellers can monitor the products ordered by customers, helping them stay organized and fulfill orders efficiently.

## Technologies Used

- Frontend: React.js, Material UI, Redux Toolkit, Styled Components
- Backend: Node.js, Express.js, JWT Token
- Database: MongoDB
- Data Visualization: React Apexcharts

<br>

# Installation

```sh
git clone https://github.com/Yogndrr/MERN-Ecommerce-Site.git
```
Open 2 terminals in separate windows/tabs.

Terminal 1: Setting Up Backend 
<br><br>
Create a env file and then add your mongodb link and also jwt secret key
```sh
cd backend
npm install
npm start
```

Terminal 2: Setting Up Frontend

```sh
cd frontend
npm install
npm start
```
Create a env file and then write 

```env
REACT_APP_BASE_URL = http://localhost:5000
```

Now, navigate to `localhost:3000` in your browser. 
The Backend API will be running at `localhost:5000`.

<br>

# Deployment
* Render - server side
* Vercel - client side

