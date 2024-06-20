import CardListSlider from "./components/cardListSlider";
import CardOrder from "./components/cardOrder";
import { Box } from "@chakra-ui/react";


const Manage = () => {
  const title = ['TOTAL ORDERS', 'COMPLETED ORDERS', 'REVENUE']
  return (
    <div className="mt-5 mx-5">
      <div className="grid grid-cols-3 gap-5">
        {new Array(3).fill(null).map((item, index) => {
          return <CardOrder key={index} title={title} index={index} />;
        })}
      </div>

      <Box className="mt-10">
        <CardListSlider />
      </Box>
    </div>
  );
};

export default Manage;
