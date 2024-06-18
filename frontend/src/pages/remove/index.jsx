import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RemoveRecent = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);
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

  const sortedData = [...products]
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

  return (
    <div className='p-6'>
        <div className="grid grid-cols-1">
          <div className="border rounded-lg border-default-200">
            <div className="px-6 py-4">
              <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4">
                <h2 className="text-xl text-default-800 font-semibold">
                  Item Delete List
                </h2>
                <label className="input input-bordered w-[500px] flex items-center gap-2">
                  <input type="text" className="grow" placeholder="Search" />
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
                          <td className="flex gap-5 items-center px-6 py-4">
                            <div className="btn">
                                Delete
                            </div>
                            <div className="btn">
                                Restore
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
  )
}

export default RemoveRecent