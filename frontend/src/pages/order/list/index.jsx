import React from "react";

const OrderList = () => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between w-full mb-6">
        <h4 className="text-xl font-medium">Order Edit</h4>
        <ol className="hidden md:flex items-center whitespace-nowrap min-w-0 gap-2">
          <li className="text-sm">
            <a className="flex items-center gap-2 align-middle text-default-800 transition-all leading-none hover:text-primary-500">
              Order
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
            Order List
          </li>
        </ol>
      </div>
      <div className="grid xl:grid-cols-12 gap-6 w-full overflow-hidden">
        <div className="xl:col-span-12 w-full">
          <div className="space-y-6 w-full">
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6 overflow-hidden border-default-200 w-full">
                <div className="flex items-center gap-4">
                  <div className="inline-flex items-center justify-center rounded-full bg-primary/20 text-primary h-16 w-16"></div>
                  <div className="">
                    <p className="text-base text-default-500 font-medium mb-1">
                      Food Delivered
                    </p>
                    <h4 className="text-2xl text-default-950 font-semibold mb-2">
                      23,568
                    </h4>
                  </div>
                </div>
              </div>
              <div className="border rounded-lg p-6 overflow-hidden border-default-200 w-full">
                <div className="flex items-center gap-4">
                  <div className="inline-flex items-center justify-center rounded-full bg-yellow-500/20 text-yellow-500 h-16 w-16"></div>
                  <div>
                    <p className="text-base text-default-500 font-medium mb-1">
                      Your Balance
                    </p>
                    <h4 className="text-2xl text-default-950 font-semibold mb-2">
                      $ 8,904.80
                    </h4>
                  </div>
                </div>
              </div>
              <div className="border rounded-lg p-6 overflow-hidden border-default-200 w-full">
                <div className="flex items-center gap-4">
                  <div className="inline-flex items-center justify-center rounded-full bg-green-500/20 text-green-500 h-16 w-16"></div>
                  <div className="">
                    <p className="text-base text-default-500 font-medium mb-1">
                      Satisfaction Rating
                    </p>
                    <h4 className="text-2xl text-default-950 font-semibold mb-2">
                      98%
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 overflow-x-auto">
              <div className="border rounded-lg border-default-200 ">
                <div className="p-6">
                  <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4">
                    <h2 className="text-xl text-default-800 font-semibold">
                      Order History
                    </h2>
                    <label className="input input-bordered flex items-center gap-2 w-1/2">
                      <input
                        type="text"
                        className="grow w-1/2"
                        placeholder="Search"
                      />
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
                        Sort by
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content z-[10] menu p-2 shadow bg-base-100 rounded-box w-52"
                      >
                        <li>
                          <a>Refund</a>
                        </li>
                        <li>
                          <a>Ordered</a>
                        </li>
                        <li>
                          <a>Pending</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="min-w-full inline-block align-middle">
                      <table className="min-w-full divide-y divide-default-200 w-[1000px]">
                        <thead className="bg-default-100">
                          <tr className="text-start">
                            <th className="px-6 py-3 text-start text-sm whitespace-nowrap font-medium text-default-800">
                              Date
                            </th>
                            <th className="px-6 py-3 text-start text-sm whitespace-nowrap font-medium text-default-800">
                              Order ID
                            </th>
                            <th className="px-6 py-3 text-start text-sm whitespace-nowrap font-medium text-default-800 min-w">
                              Customer's Name
                            </th>
                            <th className="px-6 py-3 text-start text-sm whitespace-nowrap font-medium text-default-800 min-w">
                              Restaurant Name
                            </th>
                            <th className="px-6 py-3 text-start text-sm whitespace-nowrap font-medium text-default-800 min-w">
                              Amount
                            </th>
                            <th className="px-6 py-3 text-start text-sm whitespace-nowrap font-medium text-default-800 min-w-[10rem]">
                              Status
                            </th>
                            <th className="px-6 py-3 text-start text-sm whitespace-nowrap font-medium text-default-800 min-w-[10rem]">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-default-200">
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-default-500">
                              01/Sep/22
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-default-500">
                              #4357
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-default-500">
                              Dong
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-default-800">
                              BBC Restaurant
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-default-500">
                              $45.24
                            </td>
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center gap-1 py-1 px-4 rounded-full text-sm font-medium bg-yellow-500/20 text-yellow-500">
                                Refund
                              </span>
                            </td>
                            <td className="px-6 py-4">
                            <button className="btn">View Details</button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
