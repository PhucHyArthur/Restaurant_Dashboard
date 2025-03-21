import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { LuArrowDown } from "react-icons/lu";
import CustomModal from "../../components/Modal/default";
import CustomToast from "../../components/Toast";
// import { useNavigate } from "react-router-dom";

const RemoveRecent = () => {
  // const navigate = useNavigate()
  const [products, setProducts] = useState([]);
  const [viewProducts, setViewProducts] = useState(products);
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const showToast = CustomToast()

  useEffect(() => {
    const fetchFoodByRestaurant = async () => {
      try {
        const response = await axios.get(`/api/food/getAllFoodSoftDelete/${selectedRestaurant}`)

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


  const openModal = (productId, action) => {
    setModalContent({
      productId,
      action,
      title: action === "delete" ? "Confirm Deletion" : "Confirm Restoration",
      bodyContent: action === "delete" 
        ? "This product will be permanently deleted. Are you sure to delete this product?" 
        : "This product will be restored and returned to your restaurant. Are you sure to restore this product?"
    });
    setIsModalOpen(true);
  };

  const handleModalConfirm = async () => {
    const { productId, action } = modalContent;
    try {
      if (action === "delete") {
        const response = await axios.delete(`/api/food/delete/${productId}`);
        if (response.status === 200) {
          showToast("success", "Product deleted successfully", "")
          setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
          setViewProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
        }
      } else if (action === "restore") {
        const response = await axios.put(`/api/food/restore/${productId}`);
        if (response.status === 200) {
          showToast("success", "Product restored successfully", "")
          setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
          setViewProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
        }
      }
    } catch (error) {
      showToast("error", `Error ${action === "delete" ? "deleting" : "restoring"} product`, "")
      console.error(`Error ${action === "delete" ? "deleting" : "restoring"} product: `, error);
    }
    setIsModalOpen(false);
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
              <Menu>
                <MenuButton as={Button} rightIcon={<LuArrowDown />}>
                  Actions
                </MenuButton>

                <MenuList>
                  {restaurants.map((restaurant) => (
                    <MenuItem key={restaurant._id} onClick={() => setSelectedRestaurant(restaurant._id)}>
                      <a>
                        {restaurant.name}
                      </a>
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
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
                                src={product.image}
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
                          {product.categories[0].name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-default-500">
                          {product.price}
                        </td>
                        <td className="flex gap-5 items-center px-6 py-4">
                          <Button colorScheme="red" onClick={() => openModal(product._id, "delete")}>
                            Delete
                          </Button>

                          <Button colorScheme="whatsapp" onClick={() => openModal(product._id, "restore")}>
                            Restore
                          </Button>
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
      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalContent?.title}
        bodyContent={modalContent.bodyContent}
        onConfirm={handleModalConfirm}
      />
    </div>
  )
}

export default RemoveRecent