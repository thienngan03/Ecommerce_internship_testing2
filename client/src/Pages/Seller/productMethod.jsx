import "./productMethod.css";
import { useState, useEffect } from "react";
import { useAuth } from "../../Hooks/useAuth.tsx";
import { useNavigate } from "react-router-dom";
import { createProduct, getCategories, updateProduct } from "../../Api/sellerAPI.jsx";
import PropType from "prop-types";

const CreateProduct = ({ isOpen, onClose,isEdit, product }) => {
    const { isAuthenticated, shopId } = useAuth();
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const [productData, setProductData] = useState({
        name: "",
        type: "product",
        description: "",
        price: "",
        category: [""],
        stock: "",
        image: null,
    });
    if (isEdit && product) {
        setProductData({
            name: product.name,
            type: product.type,
            description: product.description,
            price: product.price,
            category: product.category,
            stock: product.stock,
            image: product.image,
        });
    }


    useEffect(() => {
        if (!isAuthenticated || !shopId) {
        navigate("/login");
        } else {
            const fetchCategories = async () => {
                try {
                    const data = await getCategories(shopId);
                    setCategories(data);
                } catch (error) {
                    console.error("Error fetching categories:", error);
                }
            }
            fetchCategories();
        }
    }, [isAuthenticated, shopId, navigate]);
    const handleImageUpload = (e) => {
        const fileImage = e.target.files[0];
        if (fileImage) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setProductData((prevData) => ({
                    ...prevData,
                    image: event.target.result,
                }));
            };
            reader.readAsDataURL(fileImage);
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        if (isEdit && product) {
            await updateProduct(shopId, product.id, productData);
        }
        else {
            await createProduct(shopId, productData);
        }
        navigate("/products");
        } catch (error) {
        console.error("Error creating product:", error);
        }
    };
    if (!isOpen) {
        return null;
    }
    
    return (
        <div className="create-product-page">
        <h1>Create Product</h1>
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={productData.name}
            onChange={handleChange}
            required
            />
            <textarea
            name="description"
            placeholder="Product Description"
            value={productData.description}
            onChange={handleChange}
            required
            />
            <input
            type="number"
            name="price"
            placeholder="Price"
            value={productData.price}
            onChange={handleChange}
            required
            />
            <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={productData.stock}
            onChange={handleChange}
            required
            />
            <select name="category" value={productData.category} onChange={handleChange} required>
            <option value="">Select Category</option>
            {categories.map((category) => (
                <option key={category.id} value={category.id}>
                {category.name}
                </option>
            ))}
            </select>
            <input type="file" onChange={handleImageUpload} />
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
        </form>
        </div>
    );
}
CreateProduct.propTypes = {
    isOpen: PropType.bool,
    onClose: PropType.func.isRequired,
    isEdit: PropType.bool,
    product: PropType.object
};
export default CreateProduct;