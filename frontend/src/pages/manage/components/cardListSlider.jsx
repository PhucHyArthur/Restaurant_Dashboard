import { Swiper, SwiperSlide } from "swiper/react";
import { IoFastFoodOutline } from "react-icons/io5";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CustomCollapse from "./collapse";

export default function CardListSlider({
  pendingOrders,
  handleAccept,
  handleDecline,
}) {

  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        modules={[Pagination]}
        className="mySwiper"
      >
        {pendingOrders?.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <Box className="h-[300px] border-2 border-gray-300 rounded-md relative p-3">
                <Flex className="items-center gap-2">
                  <Box className="text-[30px] p-2 rounded-full bg-[#ccc] text-gray-600">
                    <IoFastFoodOutline />
                  </Box>
                  <Box>
                    <Text>Order #{item.id + 1}</Text>
                    <Text>{item.cartItems?.length} Items</Text>
                  </Box>
                </Flex>

                <Box className="h-[130px] overflow-y-auto mt-2 border-[1px] rounded-lg p-2">
                  <Box className="font-[500] text-gray-500">
                    Customer:{" "}
                    <Text className="inline-block text-black">
                      {item.username}
                    </Text>
                  </Box>

                  <CustomCollapse cartItems={item.cartItems} />
                </Box>

                <Box className="font-[500] text-gray-500">
                  Total Price:
                  <Text className="inline-block ml-1 text-black">
                    {item.total.toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </Text>
                </Box>

                <Flex className="absolute bottom-5 right-5 gap-5">
                  <Button
                    onClick={() => handleDecline(item._id)}
                    colorScheme="red"
                  >
                    Decline
                  </Button>
                  <Button
                    colorScheme="blue"
                    onClick={() => handleAccept(item._id)}
                  >
                    Accept
                  </Button>
                </Flex>
              </Box>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
