import React from 'react';
import '../App.css';

const ProductList = () => {
    const products = [
        { id: 1, name: 'Aspirin', price: '$5.00', image: 'https://via.placeholder.com/150' },
        { id: 2, name: 'Ibuprofen', price: '$7.00', image: 'https://via.placeholder.com/150' },
        { id: 3, name: 'Paracetamol', price: '$3.00', image: 'https://via.placeholder.com/150' },
        // Add more products as needed
    ];

    return (
        <div className="product-section">
            <h2>Available Products</h2>
            <div className="product-list">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <img src={product.image} alt={product.name} className="product-image" />
                        <h3>{product.name}</h3>
                        <p>{product.price}</p>
                        <button>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
