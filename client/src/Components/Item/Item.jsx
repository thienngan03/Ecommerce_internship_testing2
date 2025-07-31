import React from "react";
import "./Item.css";

const Item = ({ item }) => {
  return (
    <div className="item">
        <div className="item">
            <img src={item.image} alt={item.name} className="item-image" />
            <h3 className="item-name">{item.name}</h3>
            <div className="item-price">
                <div className="item-price-new">
                    {item.newPrice}
                </div>
                <div className="item-price-old">
                    {item.oldPrice}
                </div>

            </div>
            <button className="item-add-to-cart">Add to Cart</button>
        </div>
    </div>
  );
};

export default Item;