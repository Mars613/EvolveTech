import React from 'react';
import '../App.css'; // Import the CSS file
import ProductList from '../components/ProductList';

const Home = () => {
    return (
        <div>
            <h1>Welcome to Medicart</h1>
            <p>Your health is our priority!</p>
            <ProductList />
        </div>
    );
};

export default Home;
