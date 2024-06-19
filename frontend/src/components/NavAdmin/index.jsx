import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  LuAlignLeft,
  LuAlignVerticalDistributeCenter,
  LuDot,
  LuHotel,
  LuLayoutDashboard,
  LuList,
  LuLogOut,
  LuSettings,
  LuShoppingBag,
  LuSignalZero,
  LuTrash,
  LuUsers,
} from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";

const NavAdmin = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState("");

  return (
    <Box
      className="fixed flex flex-col min-w-[260px] justify-between"
      h={"calc(100vh - 72px)"}
      borderRight={"1px solid #ccc"}
    >
      <Accordion allowToggle className="p-5 flex flex-col gap-1">
        <AccordionItem className="border-none">
          <AccordionButton
            onClick={() => setPage("dashboard")}
            className={`rounded-lg ${
              page === "dashboard" ? "bg-[#fef2e8]" : "transparent"
            }`}
          >
            <Link to={""}>
              <Flex
                className={`items-center  w-full gap-2  rounded-lg ${
                  page === "dashboard" ? "text-[#f58220]" : "text-black"
                }`}
              >
                <LuLayoutDashboard />
                <Text>Dash Board</Text>
              </Flex>
            </Link>
          </AccordionButton>
        </AccordionItem>

        <AccordionItem className="border-none">
          <AccordionButton
            onClick={() => setPage("manage")}
            className={`rounded-lg ${
              page === "manage" ? "bg-[#fef2e8]" : "transparent"
            }`}
          >
            <Link to={"manage"}>
              <Flex
                className={`items-center  w-full gap-2  rounded-lg ${
                  page === "manage" ? "text-[#f58220]" : "text-black"
                }`}
              >
                <LuAlignVerticalDistributeCenter />
                <Text>Manage</Text>
              </Flex>
            </Link>
          </AccordionButton>
        </AccordionItem>

        <AccordionItem className="border-none">
          <AccordionButton
            onClick={() => setPage("customers")}
            className={`rounded-lg ${
              page === "customers" ? "bg-[#fef2e8]" : "transparent"
            }`}
          >
            <Flex
              className={`items-center  w-full gap-2  rounded-lg ${
                page === "customers" ? "text-[#f58220]" : "text-black"
              }`}
            >
              <LuUsers />
              <Text>Customers</Text>
            </Flex>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <Link to={"customerAdmin/list"}>
              <Flex className="items-center gap-3 p-2 hover:bg-[#f5f5f5]">
                <Box className="text-[20px]">
                  <LuDot />
                </Box>
                <Text>Customer List</Text>
              </Flex>
            </Link>
            <Link to={"customerAdmin/edit"}>
              <Flex className="items-center gap-3 p-2 hover:bg-[#f5f5f5]">
                <Box className="text-[20px]">
                  <LuDot />
                </Box>
                <Text>Customer Edit</Text>
              </Flex>
            </Link>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem className="border-none">
          <AccordionButton
            onClick={() => setPage("restaurants")}
            className={`rounded-lg ${
              page === "restaurants" ? "bg-[#fef2e8]" : "transparent"
            }`}
          >
            <Flex
              className={`items-center  w-full gap-2  rounded-lg ${
                page === "restaurants" ? "text-[#f58220]" : "text-black"
              }`}
            >
              <LuHotel />
              <Text>Restaurants</Text>
            </Flex>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel>
            <Link to={"restaurantAdmin/list"}>
              <Flex className="items-center gap-3 p-2 hover:bg-[#f5f5f5]">
                <Box className="text-[20px]">
                  <LuDot />
                </Box>
                <Text>Restaurants List</Text>
              </Flex>
            </Link>
            <Link to={"restaurantAdmin/detail"}>
              <Flex className="items-center gap-3 p-2 hover:bg-[#f5f5f5]">
                <Box className="text-[20px]">
                  <LuDot />
                </Box>
                <Text>Restaurants Details</Text>
              </Flex>
            </Link>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <div className="px-10">
        <Link to={"remove"}>
          <Flex className="items-center gap-5 px-5 py-2 hover:bg-[#f5f5f5] cursor-pointer rounded-lg">
            <Box className="text-[24px]">
              <LuTrash />
            </Box>
            <Text className="text-[18px]">Remove</Text>
          </Flex>
        </Link>

        <Flex className="items-center gap-5 px-5 py-2 hover:bg-[#f5f5f5] cursor-pointer rounded-lg">
          <Box className="text-[24px]">
            <LuSettings />
          </Box>
          <Text className="text-[18px]">Settings</Text>
        </Flex>

        <Flex className="items-center gap-5 text-[#991b1b] px-5 py-2 hover:bg-[#f5f5f5] cursor-pointer rounded-lg">
          <Box className="text-[24px]">
            <LuLogOut />
          </Box>
          <Text className="text-[18px]">Logout</Text>
        </Flex>
      </div>
    </Box>
  );
};

export default NavAdmin;
