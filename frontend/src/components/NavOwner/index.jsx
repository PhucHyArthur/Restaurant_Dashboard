import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Flex, Text } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { LuAlignLeft, LuAlignVerticalDistributeCenter, LuDot, LuHotel, LuLayoutDashboard, LuList, LuLogOut, LuSettings, LuShoppingBag, LuSignalZero, LuTrash, LuUsers } from "react-icons/lu"; import { Link, useNavigate } from "react-router-dom";
import './styles.scss'
import { UserContext } from "../../context/UserContext";
import axios from "axios";
const NavOwner = () => {
  const navigate = useNavigate()
  const [page, setPage] = useState('')
  const [userData, setUserData] = useContext(UserContext) 

  const handleLogout = async () => {
    try {
      const response = await axios.post('/api/auth/logout')

      if (response.status === 200) {
        localStorage.setItem('user', null)
        setUserData({
          user : null
        })
      }
    } catch (error) {
      console.error("Error logging out: ", error)
    }
  }

  return (
    <Box className="fixed flex flex-col min-w-[260px] justify-between" h={'calc(100vh - 72px)'} borderRight={'1px solid #ccc'}>
      <Accordion allowToggle className="navOwner p-5 flex flex-col gap-1 max-h-[400px] overflow-y-scroll">

        <AccordionItem className="border-none">
          <AccordionButton onClick={() => setPage('dashboard')} className={`rounded-lg ${page === 'dashboard' ? 'bg-[#fef2e8]' : 'transparent'}`}>
            <Link to={''}>
              <Flex className={`items-center  w-full gap-2  rounded-lg ${page === 'dashboard' ? 'text-[#f58220]' : 'text-black'}`}>
                <LuLayoutDashboard />
                <Text>Dash Board</Text>
              </Flex>
            </Link>
          </AccordionButton>
        </AccordionItem>

        <AccordionItem className="border-none">
          <AccordionButton onClick={() => setPage('manage')} className={`rounded-lg ${page === 'manage' ? 'bg-[#fef2e8]' : 'transparent'}`}>
            <Link to={'manage'}>
              <Flex className={`items-center  w-full gap-2  rounded-lg ${page === 'manage' ? 'text-[#f58220]' : 'text-black'}`}>
                <LuAlignVerticalDistributeCenter />
                <Text>Manage</Text>
              </Flex>
            </Link>
          </AccordionButton>
        </AccordionItem>

        <AccordionItem className="border-none">
          <AccordionButton onClick={() => setPage('order')} className={`rounded-lg ${page === 'order' ? 'bg-[#fef2e8]' : 'transparent'}`}>
            <Flex className={`items-center  w-full gap-2  rounded-lg ${page === 'order' ? 'text-[#f58220]' : 'text-black'}`}>
              <LuList />
              <Text>Order</Text>
            </Flex>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel>
            <Link to={'order/list'}>
              <Flex className="items-center gap-3 p-2 hover:bg-[#f5f5f5]">
                <Box className="text-[20px]"><LuDot /></Box>
                <Text>Order List</Text>
              </Flex>
            </Link>

            <Link to={'order/detail'}>
              <Flex className="items-center gap-3 p-2 hover:bg-[#f5f5f5]">
                <Box className="text-[20px]"><LuDot /></Box>
                <Text>Order Details</Text>
              </Flex>
            </Link>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem className="border-none">
          <AccordionButton onClick={() => setPage('customers')} className={`rounded-lg ${page === 'customers' ? 'bg-[#fef2e8]' : 'transparent'}`}>
            <Flex className={`items-center  w-full gap-2  rounded-lg ${page === 'customers' ? 'text-[#f58220]' : 'text-black'}`}>
              <LuUsers />
              <Text>Customers</Text>
            </Flex>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <Link to={'customer/list'}>
              <Flex className="items-center gap-3 p-2 hover:bg-[#f5f5f5]">
                <Box className="text-[20px]"><LuDot /></Box>
                <Text>Customer List</Text>
              </Flex>
            </Link>
            <Link to={'customer/detail'}>
              <Flex className="items-center gap-3 p-2 hover:bg-[#f5f5f5]">
                <Box className="text-[20px]"><LuDot /></Box>
                <Text>Customer Details</Text>
              </Flex>
            </Link>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem className="border-none">
          <AccordionButton onClick={() => setPage('restaurants')} className={`rounded-lg ${page === 'restaurants' ? 'bg-[#fef2e8]' : 'transparent'}`}>
            <Flex className={`items-center  w-full gap-2  rounded-lg ${page === 'restaurants' ? 'text-[#f58220]' : 'text-black'}`}>
              <LuHotel />
              <Text>Restaurants</Text>
            </Flex>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel>
            <Link to={'restaurant/list'}>
              <Flex className="items-center gap-3 p-2 hover:bg-[#f5f5f5]">
                <Box className="text-[20px]"><LuDot /></Box>
                <Text>Restaurants List</Text>
              </Flex>
            </Link>
            <Link to={'restaurant/detail'}>
              <Flex className="items-center gap-3 p-2 hover:bg-[#f5f5f5]">
                <Box className="text-[20px]"><LuDot /></Box>
                <Text>Restaurants Details</Text>
              </Flex>
            </Link>
            <Link to={'restaurant/add'}>
              <Flex className="items-center gap-3 p-2 hover:bg-[#f5f5f5]">
                <Box className="text-[20px]"><LuDot /></Box>
                <Text>Restaurants Add</Text>
              </Flex>
            </Link>
            <Link to={'restaurant/edit'}>
              <Flex className="items-center gap-3 p-2 hover:bg-[#f5f5f5]">
                <Box className="text-[20px]"><LuDot /></Box>
                <Text>Restaurants Edit</Text>
              </Flex>
            </Link>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem className="border-none">
          <AccordionButton onClick={() => setPage('product')} className={`rounded-lg ${page === 'product' ? 'bg-[#fef2e8]' : 'transparent'}`}>
            <Flex className={`items-center  w-full gap-2  rounded-lg ${page === 'product' ? 'text-[#f58220]' : 'text-black'}`}>
              <LuShoppingBag />
              <Text>Product</Text>
            </Flex>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <Link to={'product/list'}>
              <Flex className="items-center gap-3 p-2 hover:bg-[#f5f5f5]">
                <Box className="text-[20px]"><LuDot /></Box>
                <Text>Product List</Text>
              </Flex>
            </Link>
            <Link to={'product/detail'}>
              <Flex className="items-center gap-3 p-2 hover:bg-[#f5f5f5]">
                <Box className="text-[20px]"><LuDot /></Box>
                <Text>Product Detail</Text>
              </Flex>
            </Link>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <div className="px-10">
        <Link to={'remove'}>
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

        <Flex className="items-center gap-5 text-[#991b1b] px-5 py-2 hover:bg-[#f5f5f5] cursor-pointer rounded-lg" onClick={() => handleLogout()}>
          <Box className="text-[24px]">
            <LuLogOut />
          </Box>
          <Text className="text-[18px]">Logout</Text>
        </Flex>
      </div>
    </Box>
  );
};

export default NavOwner;
