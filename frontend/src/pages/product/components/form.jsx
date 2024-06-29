import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Form = ({
  title,
  handleSubmit,
  onSubmit,
  errors,
  register,
  imageSource = "",
  setImageSource,
  restaurants = [],
  categories = [],
}) => {
  const navigate = useNavigate()
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-6">
          <div className="flex items-center justify-between w-full mb-6">
            <h4 className="text-xl font-medium">Product {title}</h4>
            <ol className="hidden md:flex items-center whitespace-nowrap min-w-0 gap-2">
              <li className="text-sm">
                <a className="flex items-center gap-2 align-middle text-default-800 transition-all leading-none hover:text-primary-500 cursor-pointer" onClick={()=>navigate("/owner/product/list")}>
                  Product
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
                Product {title}
              </li>
            </ol>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg border">
              <div className="h-96 p-6 flex flex-col items-center justify-center rounded-lg border mb-4">
                <label htmlFor="image-upload" className="cursor-pointer">
                  <h5 className="text-base text-primary font-medium mb-2">
                    Upload Image
                  </h5>
                </label>
                <p className="text-sm text-default-600 mb-2">
                  Upload a cover image for your product.
                </p>
                <p className="text-sm text-default-600">
                  File Format
                  <span className="text-default-800"> jpeg, png </span>
                  Recommended Size
                  <span className="text-default-800"> 600x600 (1:1) </span>
                </p>
                <input
                  id="image-upload"
                  type="file"
                  {...register("image")}
                  className="hidden"
                />
                <img src={imageSource}></img>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="p-6 rounded-lg border">
                <div className="grid lg:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-6">
                    <div>
                      <input
                        className="block w-full bg-transparent rounded-lg py-2.5 px-4 border focus:ring-transparent"
                        type="text"
                        placeholder="Product Name"
                        {...register("name", { required: true })}
                      />
                      {errors.name && (
                        <span className="text-red-500">
                          Product Name is required
                        </span>
                      )}
                    </div>

                    <div>
                      <select
                        className="block w-full bg-transparent rounded-lg py-2.5 px-4 border focus:ring-transparent"
                        {...register("categories", { required: true })}
                      >
                        <option value="">Select Product Category</option>
                        {categories.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                      {errors.categories && (
                        <span className="text-red-500">
                          Category is required
                        </span>
                      )}
                    </div>

                    <div>
                      <select
                        className="block w-full bg-transparent rounded-lg py-2.5 px-4 border focus:ring-transparent"
                        {...register("restaurantId", { required: true })}
                      >
                        <option value="">Select Restaurant</option>
                        {restaurants.map((restaurant) => (
                          <option key={restaurant._id} value={restaurant._id}>
                            {restaurant.name}
                          </option>
                        ))}
                      </select>
                      {errors.restaurantId && (
                        <span className="text-red-500">
                          Restaurant is required
                        </span>
                      )}
                    </div>

                    <div>
                      <input
                        className="block w-full bg-transparent rounded-lg py-2.5 px-4 border focus:ring-transparent"
                        type="text"
                        placeholder="Selling Price"
                        {...register("price", { required: true })}
                      />
                      {errors.price && (
                        <span className="text-red-500">Price is required</span>
                      )}
                    </div>

                    <div>
                      <textarea
                        className="block w-full bg-transparent rounded-lg py-2.5 px-4 border focus:ring-transparent"
                        rows="5"
                        placeholder="Ingredients"
                        {...register("ingredients", { required: true })}
                      ></textarea>
                      {errors.ingredients && (
                        <span className="text-red-500">
                          Ingredients are required
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <textarea
                        className="block w-full bg-transparent rounded-lg py-2.5 px-4 border focus:ring-transparent"
                        rows="5"
                        placeholder="Description"
                        {...register("description", { required: true })}
                      ></textarea>
                      {errors.description && (
                        <span className="text-red-500">
                          Description is required
                        </span>
                      )}
                    </div>

                    <div className="flex justify-end gap-4">
                      <Button colorScheme="twitter" type="submit">
                        Save
                      </Button>
                      <Button colorScheme="red" type="button">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
