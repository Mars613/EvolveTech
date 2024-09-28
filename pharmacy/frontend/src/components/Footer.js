import React from 'react';
import '../App.css'; // Import the CSS file

const Footer = () => {
    return (
        <footer>
            <p>&copy; {new Date().getFullYear()} Medicart. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
