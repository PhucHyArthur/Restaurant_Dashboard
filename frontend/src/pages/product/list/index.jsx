import React from 'react';
import { useForm } from 'react-hook-form';
import { FaArrowRight, FaEye, FaTrash } from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';
import mockData from './mockData';

const ProductList = () => {
  const { handleSubmit } = useForm();

  const onDelete = (productId) => {
    console.log(`Delete product with id: ${productId}`);
    // Add delete functionality here
  };

  const onView = (productId) => {
    console.log(`View product with id: ${productId}`);
    // Add view functionality here
  };

  const onEdit = (productId) => {
    console.log(`Edit product with id: ${productId}`);
    // Add edit functionality here
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
            <div className="px-6 py-4 overflow-hidden ">
              <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4">
                <h2 className="text-xl text-default-800 font-semibold">
                  Item List
                </h2>
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
                        <th className="px-6 py-3 text-start text-sm whitespace-nowrap font-medium text-default-800">
                          Name Product
                        </th>
                        <th className="px-6 py-3 text-start text-sm whitespace-nowrap font-medium text-default-800">
                          Category
                        </th>
                        <th className="px-6 py-3 text-start text-sm whitespace-nowrap font-medium text-default-800">
                          Price
                        </th>
                        <th className="px-6 py-3 text-start text-sm whitespace-nowrap font-medium text-default-800">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-default-200">
                      {mockData.map((product) => (
                        <tr key={product.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-default-800">
                            <a
                              href="admin-product-details.html"
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
                            {product.category}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-default-500">
                            {product.price}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-3">
                              <a
                                className="transition-all hover:text-primary"
                                onClick={() => onEdit(product.id)}
                              >
                                <FaPencil />
                              </a>
                              <a
                                className="transition-all hover:text-primary"
                                onClick={() => onView(product.id)}
                              >
                                <FaEye />
                              </a>
                              <a
                                className="transition-all hover:text-red-500"
                                onClick={() => onDelete(product.id)}
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
