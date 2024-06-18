import React, { useEffect, useState } from "react";
import { FaArrowRight, FaEye, FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const ProductList = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);
  const [viewProducts, setViewProducts] = useState(products);
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  useEffect(() => {
    const fetchFoodByRestaurant = async () => {
      try {
        const response = await axios.get(`/api/food/getAllFood/${selectedRestaurant}`)

        if (response.status === 200) {
          setProducts(response.data.foods)
          setViewProducts(response.data.foods)
          console.log(response.data.foods);
        }
      } catch (error) {
        console.error("Error fetching products: ", error)
      }
    }
    fetchFoodByRestaurant()
  }, [selectedRestaurant])

  useEffect(() => {
    const fetchRestaurants = async () => {
      const response = await axios.get("/api/restaurant/");
      if (response.status === 200) {
        setRestaurants(response.data);
      }
    }
    fetchRestaurants()
  }, [])

  const handleSort = (column) => {
    const direction =
      sortedColumn === column && sortDirection === "asc" ? "desc" : "asc";
    setSortedColumn(column);
    setSortDirection(direction);
  };

  const sortedData = [...viewProducts]
    .filter(
      (product) =>
        !selectedRestaurant || product.restaurantId === selectedRestaurant
    )
    .sort((a, b) => {
      if (sortedColumn) {
        if (a[sortedColumn] < b[sortedColumn]) {
          return sortDirection === "asc" ? -1 : 1;
        }
        if (a[sortedColumn] > b[sortedColumn]) {
          return sortDirection === "asc" ? 1 : -1;
        }
      }
      return 0;
    });

  const onSelectRestaurant = (restaurantId) => {
    setSelectedRestaurant(restaurantId);
  };

  const onDelete = async (productId) => {
    console.log(`Delete product with id: ${productId}`);
    try {
      const response = await axios.delete(`/api/food/delete/${productId}`)
      if (response.status === 200) {
        console.log("Food deleted");
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        )
      }
    } catch (error) {
      console.error("Error deleting product: ", error)
    }
    // Add delete functionality here
  };

  const onView = (productId) => {
    console.log(`View product with id: ${productId}`);
    navigate(`/owner/product/detail/${productId}`)
    // Add view functionality here
  };

  const onEdit = (productId) => {
    console.log(`Edit product with id: ${productId}`);
    navigate(`/owner/product/edit/${productId}`)
    // Add edit functionality here
  };

  const handleToggle = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, status: !product.status }
          : product
      )
    );
  };

  const handleSearch = (e) => {
    console.log(e.target.value);
    setViewProducts(products.filter(product => product.name.toLowerCase().includes(e.target.value.toLowerCase())));
  }

  return (
    <div>
      <div className="p-6">
        <div className="flex items-center justify-between w-full mb-6">
          <h4 className="text-xl font-medium">Product List</h4>
          <ol className="hidden md:flex items-center whitespace-nowrap min-w-0 gap-2">
            <li className="text-sm">
              <a className="flex items-center gap-2 align-middle text-default-800 transition-all leading-none hover:text-primary-500">
                Product
                <FaArrowRight />
              </a>
            </li>
            <li
              aria-current="page"
              className="text-sm font-medium text-primary truncate leading-none hover:text-primary-500"
            >
              Product List
            </li>
          </ol>
        </div>
        <div className="grid grid-cols-1">
          <div className="border rounded-lg border-default-200">
            <div className="px-6 py-4">
              <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4">
                <h2 className="text-xl text-default-800 font-semibold">
                  Item List
                </h2>
                <label className="input input-bordered w-[500px] flex items-center gap-2">
                  <input type="text" className="grow" placeholder="Search" onChange={handleSearch}/>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </label>
                <div className="dropdown">
                  <div tabIndex={0} role="button" className="btn m-1">
                    Choose Restaurant
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    {restaurants.map((restaurant) => (
                      <li key={restaurant._id}>
                        <a onClick={() => onSelectRestaurant(restaurant._id)}>
                          {restaurant.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="add"
                    className="py-2.5 px-4 inline-flex rounded-lg text-sm font-medium bg-primary text-white transition-all hover:bg-primary-500"
                  >
                    Add Product
                  </a>
                </div>
              </div>
            </div>

            <div className="relative overflow-x-auto">
              <div className="min-w-full inline-block align-middle">
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-default-200">
                    <thead className="bg-default-100">
                      <tr className="text-start">
                        <th
                          className="px-6 py-3 text-start text-sm whitespace-nowrap font-medium text-default-800 cursor-pointer"
                          onClick={() => handleSort("name")}
                        >
                          Name Product
                        </th>
                        <th
                          className="px-6 py-3 text-start text-sm whitespace-nowrap font-medium text-default-800 cursor-pointer"
                          onClick={() => handleSort("category")}
                        >
                          Category
                        </th>
                        <th
                          className="px-6 py-3 text-start text-sm whitespace-nowrap font-medium text-default-800 cursor-pointer"
                          onClick={() => handleSort("price")}
                        >
                          Price
                        </th>
                        <th className="px-6 py-3 text-start text-sm whitespace-nowrap font-medium text-default-800">
                          Status
                        </th>
                        <th className="px-6 py-3 text-start text-sm whitespace-nowrap font-medium text-default-800">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-default-200">
                      {sortedData.map((product) => (
                        <tr key={product._id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-default-800">
                            <a
                              href={`/owner/product/detail/${product._id}`}
                              className="flex items-center gap-3"
                            >
                              <div className="shrink">
                                <img
                                  src={product.imageUrl}
                                  alt={product.name}
                                  className="h-12 w-12"
                                />
                              </div>
                              <p className="text-base text-default-500 transition-all hover:text-primary">
                                {product.name}
                              </p>
                            </a>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-default-500">
                            {product.categories}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-default-500">
                            {product.price}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-default-500">
                            <input
                              type="checkbox"
                              className="toggle toggle-success"
                              checked={product.status}
                              onChange={() => handleToggle(product.id)}
                            />
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-3">
                              <a
                                className="transition-all hover:text-primary"
                                onClick={() => onEdit(product._id)}
                              >
                                <FaPencil />
                              </a>
                              <a
                                className="transition-all hover:text-primary"
                                onClick={() => onView(product._id)}
                              >
                                <FaEye />
                              </a>
                              <a
                                className="transition-all hover:text-red-500"
                                onClick={() => onDelete(product._id)}
                              >
                                <FaTrash />
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;