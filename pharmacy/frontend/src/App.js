import React, { useState } from 'react';
import './App.css'; // Import the CSS file
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './Pages/Home';

const App = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className={isDarkMode ? 'dark' : 'light'}>
            <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
            <Home />
            <Footer />
        </div>
    );
};

export default App;
