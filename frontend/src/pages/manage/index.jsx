import CardOrder from "./components/cardOrder";


const Manage = () => {
  return (
    <div className="">
      <div className="grid grid-cols-4 gap-5">
        {new Array(4).fill(null).map((item, index) => {
          return <CardOrder key={index} />;
        })}
      </div>

    </div>
  );
};

export default Manage;
