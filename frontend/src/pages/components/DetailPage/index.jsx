import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockProduct, mockCategories } from "./mockData";
import axios from "axios";

const DetailPage = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Use mock data instead of fetching from an API
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/food/getFoodById/${productId}`);
        if (response.status === 200) {
          setProduct(response.data.food);
          console.log(response.data.food);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/products/${productId}`);
      console.log("Product deleted");
      navigate("/owner/product/list");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = () => {
    navigate(`/owner/product/edit/${productId}`);
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="p-6 page-content">
      <div className="flex items-center justify-between w-full mb-6">
        <h4 className="text-xl font-medium">Products Detail</h4>
        <ol
          aria-label="Breadcrumb"
          className="hidden md:flex items-center whitespace-nowrap min-w-0 gap-2"
        >
          <li className="text-sm">
            <a
              className="flex items-center gap-2 align-middle text-default-800 transition-all leading-none hover:text-primary-500"
              href="#"
            >
              Products
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="lucide lucide-chevron-right w-4 h-4"
              >
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </a>
          </li>
          <li
            aria-current="page"
            className="text-sm font-medium text-primary truncate leading-none hover:text-primary-500"
          >
            Products Detail
          </li>
        </ol>
      </div>
      <div className="flex gap-6">
        <div className="w-full overflow-hidden border rounded-lg border-default-200">
          <img src={product.image} className="w-full" alt={product.name} />
        </div>
        <div className="w-full p-6 border rounded-lg border-default-200">
          <h3 className="text-4xl font-medium text-default-800 mb-1">
            {product.name}
          </h3>
          <h5 className="text-lg font-medium text-default-600 mb-2">
            <span className="text-base font-normal text-default-500">by</span>{" "}
            {product.restaurantName}
          </h5>
          <h5 className="text-lg font-medium text-default-600 mb-2">
            Description
          </h5>
          <p className="text-sm text-default-500 mb-4">{product.description}</p>
          <div className="mb-4">
            <h5 className="text-lg font-medium text-default-600 mb-2">
              Category
            </h5>
            <div className="flex flex-wrap gap-2">
              {product.categories.map((category) => (
                <span
                  key={category._id}
                  className="bg-gray-200 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded"
                >
                  {category.name}
                </span>
              ))}
            </div>
          </div>
          <div className="p-6 border rounded-lg border-default-200">
            <h5 className="text-lg font-medium text-default-600 mb-2">
              Ingredients
            </h5>
            <ul className="list-disc list-inside text-sm text-default-500">
              {product.ingredients.split(",").map((ingredient, index) => (
                <li key={index}>{ingredient.trim()}</li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-end gap-2 mt-4">
            <button
              type="button"
              className="btn btn-outline"
              onClick={handleEdit}
            >
              Edit
            </button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
