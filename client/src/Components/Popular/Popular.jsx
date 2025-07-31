// import React from "react";
import './Popular.css';

const Popular = () => {
    return (
        <div className="popular">
            <h2>Popular Products</h2>
            <div className="popular-items">
                {/* Example items, replace with actual product data */}
                <div className="item">
                    <img src="https://via.placeholder.com/150" alt="Product 1" />
                    <h3>Product 1</h3>
                    <p>$100</p>
                </div>
                <div className="item">
                    <img src="https://via.placeholder.com/150" alt="Product 2" />
                    <h3>Product 2</h3>
                    <p>$120</p>
                </div>
                <div className="item">
                    <img src="https://via.placeholder.com/150" alt="Product 3" />
                    <h3>Product 3</h3>
                    <p>$80</p>
                </div>
            </div>
        </div>
    )
}
export default Popular;