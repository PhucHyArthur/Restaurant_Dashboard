import { useEffect, useState } from "react";
import CardListSlider from "./components/cardListSlider";
import CardOrder from "./components/cardOrder";
import { Box } from "@chakra-ui/react";
import axios from "axios";


const Manage = () => {
  const title = ['TOTAL ORDERS', 'COMPLETED ORDERS', 'REVENUE']
  const [count, setCount] = useState({})
  const [pendingOrders, setPendingOrders] = useState([])

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await axios.get("/api/order/getOrdersCount")
        if (response.status === 200) {
          setCount(response.data)
        }
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    }

    const fetchPendingOrders = async () => {
      try {
        const response = await axios.get("/api/order/getPendingOrders")
        if (response.status === 200) {
          setPendingOrders(response.data)
          console.log("Pending orders:", response.data)
        }
      } catch (error) {
        console.error("Error fetching pending orders:", error);

      }
    }
    fetchCount()
    fetchPendingOrders()
  }, [])

  const handleAccept = async (orderId) => {
    console.log("Accepting order:", orderId)
  }

  return (
    <div className="mt-5 mx-5">
      <div className="grid grid-cols-3 gap-5">
        {new Array(3).fill(null).map((item, index) => {
          return <CardOrder key={index} title={title} index={index} count={count} />;
        })}
      </div>

      <Box className="mt-10">
        <CardListSlider pendingOrders={pendingOrders} handleAccept={handleAccept} />
      </Box>
    </div>
  );
};

export default Manage;
