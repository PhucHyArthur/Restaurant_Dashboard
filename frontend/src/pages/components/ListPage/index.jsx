import { FaEye, FaPencilAlt, FaTrash } from "react-icons/fa";

const fakeList = [
  {
    product: "Pizza",
    type: "Italian",
    price: 45,
    status: true,
  },
  {
    product: "Sushi",
    type: "Japanese",
    price: 60,
    status: true,
  },
  {
    product: "Burger",
    type: "American",
    price: 30,
    status: false,
  },
  {
    product: "Tacos",
    type: "Mexican",
    price: 25,
    status: true,
  },
  {
    product: "Croissant",
    type: "French",
    price: 15,
    status: false,
  },
  {
    product: "Pad Thai",
    type: "Thai",
    price: 35,
    status: true,
  },
  {
    product: "Paella",
    type: "Spanish",
    price: 50,
    status: true,
  },
  {
    product: "Curry",
    type: "Indian",
    price: 40,
    status: false,
  },
  {
    product: "Dim Sum",
    type: "Chinese",
    price: 55,
    status: true,
  },
  {
    product: "Kebab",
    type: "Middle Eastern",
    price: 45,
    status: false,
  },
  {
    product: "Pasta",
    type: "Italian",
    price: 35,
    status: true,
  },
];

const ListPage = () => {
  return (
    <div className="w-full p-5">
      <table className="table w-full border border-collapse border-black">
        <thead>
          <tr>
            <th className="border border-black">Product</th>
            <th className="border border-black">Type</th>
            <th className="border border-black">Price</th>
            <th className="border border-black">Status</th>
            <th className="border border-black">Action</th>
          </tr>
        </thead>
        <tbody>
          {fakeList.map((item, index) => {
            return (
              <tr key={index}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png"
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item.product}</div>
                    </div>
                  </div>
                </td>
                <td>{item.type}</td>
                <td>{item.price}$</td>
                <td>{item.status}</td>
                <td>
                    <div className="flex items-center gap-2 h-full text-lg justify-center">
                    <div><FaPencilAlt/></div>
                    <div><FaEye/></div>
                    <div><FaTrash/></div>
                    </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ListPage;
