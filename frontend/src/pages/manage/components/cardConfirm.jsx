// import { FaBurger } from "react-icons/fa6";

// const CardConfirm = () => {
//   return (
//     <div className="w-full p-5 border-[1px] border-gray-400 rounded-md">
//       <div className="card_confirm_body">
//         <div className="flex items-center">
//           <div>
//             <FaBurger />
//           </div>
//           <p>Order #6969</p>
//         </div>
//         <div>
//           <p>Date: 132123132</p>
//           <p>Delivery Zone: 123123123</p>
//         </div>
//       </div>
//       <div className="divider"></div>
//       <div className="card_confirm_footer flex items-center gap-2">
//         <div className="btn">
//             Confirm
//         </div>
//         <div className="btn">
//             Delete
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CardConfirm;

import { FaBurger } from "react-icons/fa6";

const CardConfirm = ({ onRemove }) => {
  return (
    <div className="w-full p-5 border-[1px] border-gray-400 rounded-md">
      <div className="card_confirm_body">
        <div className="flex items-center">
          <div>
            <FaBurger />
          </div>
          <p>Order #6969</p>
        </div>
        <div>
          <p>Date: 132123132</p>
          <p>Delivery Zone: 123123123</p>
        </div>
      </div>
      <div className="divider"></div>
      <div className="card_confirm_footer flex items-center gap-2">
        <div className="btn" onClick={onRemove}>
            Confirm
        </div>
        <div className="btn" onClick={onRemove}>
            Delete
        </div>
      </div>
    </div>
  );
};

export default CardConfirm;
