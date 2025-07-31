import "./Product.css"
import { useState, useEffect } from "react";
import { useAuth } from "../../Hooks/useAuth.tsx";
import { useNavigate } from "react-router-dom";
import CreateProduct from "./productMethod.jsx";
import { getProductsByShopId, deleteProduct } from "../../Api/sellerAPI.jsx";

const Product = () => {
  const { isAuthenticated, shopId, loading } = useAuth();
  const [products, setProducts] = useState([]);
  const [createProductOpen, setCreateProductOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated|| !shopId) {
      navigate("/login");
    } else {
        const fetchProducts = async () => {
            try {
            // Assuming you have a function to fetch products
            const data = await getProductsByShopId(shopId);
            setProducts(data);
            } catch (error) {
            console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }
  }, [isAuthenticated, shopId, navigate]);
    if (loading) {
        return <div>Loading...</div>;
    }

    const handleDeleteProduct = async (productId) => {
        try {
            // Assuming you have a function to delete products
            await deleteProduct(shopId, productId);
            setProducts(products.filter(product => product.id !== productId));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

  return (
    <div className="product-page">
      <h1>Your Products</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
          </div>

        ))}
      </div>
        <button className="create-product-button" onClick={() => setCreateProductOpen(true)}>
            Create New Product
        </button>
      <CreateProduct 
        isOpen={createProductOpen}
        onClose={() => setCreateProductOpen(false)}
        isEdit={false}
        product={null}
      />
    </div>
    
  );
}
export default Product;