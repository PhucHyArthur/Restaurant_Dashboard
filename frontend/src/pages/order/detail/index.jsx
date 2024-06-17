import React from "react";
import { FaArrowRight, FaEnvelope } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import mockOrderDetail from "./mockData";

const OrderDetail = () => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between w-full mb-6">
        <h4 className="text-xl font-medium">Order Detail</h4>
        <ol className="hidden md:flex items-center whitespace-nowrap min-w-0 gap-2">
          <li className="text-sm">
            <a className="flex items-center gap-2 align-middle text-default-800 transition-all leading-none hover:text-primary-500">
              Order
              <FaArrowRight />
            </a>
          </li>
          <li
            aria-current="page"
            className="text-sm font-medium text-primary truncate leading-none hover:text-primary-500"
          >
            Order Detail
          </li>
        </ol>
      </div>
      <div className="mt-10 flex flex-col xl:flex-row justify-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
          <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full gap-3">
            <div className="flex justify-start item-start space-y-2 flex-col ">
              <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
                Order #{mockOrderDetail.orderId}
              </h1>
              <h2 className="text-xl font-semibold leading-7 lg:leading-9 text-gray-800">
                Restaurant Name: 
              </h2>
              <p className="text-base font-medium leading-6 text-gray-600">
                {new Date(mockOrderDetail.orderDate).toLocaleDateString()} at {new Date(mockOrderDetail.orderDate).toLocaleTimeString()}
              </p>
            </div>
            {mockOrderDetail.items.map((item, index) => (
              <div key={index} className="w-full border-gray-200 border-b">
                <div className="collapse w-full">
                  <input type="checkbox" />
                  <div className="collapse-title text-xl font-medium flex justify-between w-full">
                    <div className="flex gap-3">
                      <div className="items-center">{item.quantity} x</div>
                      <div className="items-center">{item.name}</div>
                    </div>
                    <div className="flex">
                      <div className="items-center">${item.price.toFixed(2)}</div>
                    </div>
                  </div>
                  <div className="collapse-content">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-[200px]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
            <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
              <h3 className="text-xl font-semibold leading-5 text-gray-800">
                Summary
              </h3>
              <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                <div className="flex justify-between w-full">
                  <p className="text-base leading-4 text-gray-800">Subtotal</p>
                  <p className="text-base leading-4 text-gray-600">${mockOrderDetail.subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base leading-4 text-gray-800">Shipping</p>
                  <p className="text-base leading-4 text-gray-600">${mockOrderDetail.shipping.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex justify-between items-center w-full">
                <p className="text-base font-semibold leading-4 text-gray-800">
                  Total
                </p>
                <p className="text-base font-semibold leading-4 text-gray-600">
                  ${mockOrderDetail.total.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
          <h3 className="text-base font-semibold leading-5 text-gray-800">
            CUSTOMER'S INFORMATION
          </h3>
          <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
            <div className="flex flex-col justify-start items-start flex-shrink-0">
              <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                <div className="flex justify-start items-start flex-col space-y-2">
                  <p>Customer's Name</p>
                  <p className="text-base font-semibold leading-4 text-left text-gray-800">
                    {mockOrderDetail.customerName}
                  </p>
                </div>
              </div>
              <div className="flex justify-center md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                <FaEnvelope />
                <p className="text-sm leading-5 text-gray-800">
                  {mockOrderDetail.email}
                </p>
              </div>
            </div>
            <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
              <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                  <p className="flex items-center justify-center text-base font-semibold leading-4 text-center md:text-left text-gray-800 gap-2">
                    <FaLocationDot />
                    Shipping Address
                  </p>
                  <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                    {mockOrderDetail.shippingAddress}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
