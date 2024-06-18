import React from "react";
import CardOrder from "./components/cardOrder";
import CardConfirm from "./components/cardConfirm";
import SwiperCard from "./components/swiperCard";

const Manage = () => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-4 gap-5">
        {new Array(4).fill(null).map((item, index) => {
          return <CardOrder key={index} />;
        })}
      </div>

      <div className="">
        <SwiperCard/>
      </div>

      <div></div>
    </div>
  );
};

export default Manage;
