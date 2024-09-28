import React from 'react';
import '../App.css'; // Adjusted import path

const Header = ({ toggleTheme, isDarkMode }) => {
    return (
        <header>
            <h1>Medicart</h1>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/products">Products</a></li>
                    <li><a href="/about">About Us</a></li>
                </ul>
            </nav>
            <button onClick={toggleTheme}>
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
        </header>
    );
};

export default Header;
