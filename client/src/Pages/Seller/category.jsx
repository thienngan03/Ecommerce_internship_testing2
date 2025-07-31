import "./category.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../Hooks/useAuth.tsx";
import { createCategory, getCategories, updateCategory, deleteCategory } from "../../Api/sellerAPI.jsx";

const Category = () => {
    const { isAuthenticated, loading, shopId } = useAuth();
    const [category, setCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    const [categoryNewName, setCategoryNewName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            if (isAuthenticated && shopId) {
                try {
                    const data = await getCategories(shopId);
                    setCategories(data || []);
                } catch (error) {
                    console.error("Error fetching categories:", error);
                }
            }
        }
        fetchCategories();

    }, [loading, isAuthenticated, navigate, shopId]);

    const handleCreateCategory = async() => {
        const categoryData = {
            name: category,
            isActive: true
        };
        try {
            const response = await createCategory(shopId, categoryData);
            setCategory(response);
            console.log("Category created:", response);
            const newCategories = await getCategories(shopId);
            setCategories(newCategories);
            setCategory(""); // Clear input after creation
        } catch (error) {
            console.error("Error creating category:", error);
        }
    }
    const handleUpdateCategory = async (categoryId) => {
        try {
            const response = await updateCategory(shopId, categoryId, { name: categoryNewName });
            console.log("Category updated:", response);
            const newCategories = await getCategories(shopId);
            setCategories(newCategories);
        } catch (error) {
            console.error("Error updating category:", error);
        }
    }
    
    const handleDeleteCategory = async (categoryId) => {
        try {
            await deleteCategory(shopId, categoryId);
            console.log("Category deleted:", categoryId);
           const newCategories = await getCategories(shopId);
            setCategories(newCategories);
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    }


    return (
        <div className="category-container">
            <h2>Manage Categories</h2>
            <input
                type="text"
                value={category || ""}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter category name"
            />
            <button onClick={handleCreateCategory}>Create Category</button>
            <div className="categories-list">
                <h3>Category List</h3>
                {categories.map((cat) => (
                    <div key={cat.id} className="category-item">
                        <span>{cat.name}</span>
                        <button onClick={() => handleUpdateCategory(cat.id)}>Update</button>
                        <input
                            type="text"
                            value={categoryNewName}
                            onChange={(e) => setCategoryNewName(e.target.value)}
                            placeholder="New category name"
                        />

                        <button onClick={() => handleDeleteCategory(cat.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Category;