import { useEffect, useRef, useState } from "react";
import { FaArrowRight, FaEye, FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Flex, Image, Menu, MenuButton, MenuItem, MenuList, Switch} from "@chakra-ui/react";
import { LuEye, LuMoveDown, LuPencil, LuTrash } from "react-icons/lu";
import CustomModal from "../../../components/Modal/default";

const ProductList = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);
  const [viewProducts, setViewProducts] = useState(products);
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});

  useEffect(() => {
    const fetchFoodByRestaurant = async () => {
      try {
        const response = await axios.get(`/api/food/getAllFood/${selectedRestaurant}`)

        if (response.status === 200) {
          setProducts(response.data.foods)
          setViewProducts(response.data.foods)
          // console.log(response.data.foods);
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
        // console.log(response.data);
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

  const handleSearch = (e) => {
    // console.log(e.target.value);
    setViewProducts(products.filter(product => product.name.toLowerCase().includes(e.target.value.toLowerCase())));
  }

  const openModal = (productId, action) => {
    setModalContent({
      productId,
      action,
      title: action === "delete" ? "Confirm Deletion" : "Confirm Availability",
      bodyContent: action === "delete" 
        ? "This product will move to Remove if you click confirm" 
        : "Are you sure you want to change the availability of this product?"
    });
    setIsModalOpen(true);
  };

  const handleModalConfirm = async () => {
    const { productId, action } = modalContent;
    try {
      if (action === "delete") {
        const response = await axios.put(`/api/food/softDelete/${productId}`);
        if (response.status === 200) {
          setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
          setViewProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
        }
      } else if (action === "toggle") {
        const product = products.find((product) => product._id === productId);
        const productData = {
          name: product.name,
          categories: product.categories[0]._id,
          price: product.price,
          restaurantId: product.restaurantId,
          ingredients: product.ingredients,
          description: product.description,
          image: product.image,
          available: !product.available
        };
        const response = await axios.put(`/api/food/update/${productId}`, productData);
        if (response.status === 200) {
          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product._id === productId
                ? { ...product, available: !product.available }
                : product
            )
          );
          setViewProducts((prevProducts) =>
            prevProducts.map((product) =>
              product._id === productId
                ? { ...product, available: !product.available }
                : product
            )
          );
        }
      }
    } catch (error) {
      console.error(`Error ${action === "delete" ? "deleting" : "updating"} product: `, error);
    }
    setIsModalOpen(false);
  };

  

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
              <div className="flex justify-between items-center">
                <h2 className="text-xl text-default-800 font-semibold">
                  Item List
                </h2>
                <label className="input input-bordered w-[500px] flex items-center gap-2">
                  <input type="text" className="grow" placeholder="Search" onChange={handleSearch} />
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

                <Flex className="items-center gap-2">
                  <Menu>
                    <MenuButton as={Button} rightIcon={<LuMoveDown />}>
                      Actions
                    </MenuButton>
                    <MenuList>
                      {restaurants.map((restaurant) => (
                        <MenuItem key={restaurant._id}>
                          <a onClick={() => onSelectRestaurant(restaurant._id)}>
                            {restaurant.name}
                          </a>
                        </MenuItem>
                      ))}
                    </MenuList>
                  </Menu>

                  <Button colorScheme="whatsapp">
                    <a
                      href="add"
                      className="py-2.5 px-4 inline-flex rounded-lg text-sm font-medium bg-primary  transition-all hover:bg-primary-500"
                    >
                      Add Product
                    </a>
                  </Button>
                </Flex>
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
                              <Image
                                src={product.image}
                                alt={product.name}
                                className="h-12 w-12"
                              />
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
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-default-500">
                            <Switch
                              isChecked={product.available}
                              onChange={() => openModal(product._id, "toggle")}
                            />
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-3">
                              <a
                                className="transition-all hover:text-primary p-2 bg-gray-200 rounded-full hover:text-blue-500 cursor-pointer"
                                onClick={() => onEdit(product._id)}
                              >
                                <LuPencil />
                              </a>
                              <a
                                className="transition-all hover:text-primary p-2 bg-gray-200 rounded-full hover:text-green-500 cursor-pointer"
                                onClick={() => onView(product._id)}
                              >
                                <LuEye />
                              </a>
                              <a
                                className="transition-all hover:text-red-500 p-2 bg-gray-200 rounded-full cursor-pointer"
                                onClick={() => openModal(product._id, "delete")}
                              >
                                <LuTrash />
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
      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalContent.title}
        bodyContent={modalContent.bodyContent}
        onConfirm={handleModalConfirm}
      />
    </div>
  );
};

export default ProductList;