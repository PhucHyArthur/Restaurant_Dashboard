import { Box, Flex, Text } from '@chakra-ui/react'
import { FcKindle, FcMoneyTransfer, FcTodoList } from "react-icons/fc";

const CardOrder = ({ title, index }) => {

  return (
    <Box className='w-full p-5 border-2 border-[#ccc] rounded-md'>
      <Text className='text-lg font-[500] text-gray-500'>{title[index]}</Text>
      <Flex className='items-center gap-2'>
        <Box className='text-[24px]'>
          {index == 0 && <FcKindle />}
          {index == 1 && <FcTodoList />}
          {index == 2 && <FcMoneyTransfer />}
        </Box>

        <Text className='text-[20px] font-[500]'>
          6969
        </Text>
      </Flex>

    </Box>
  )
}

export default CardOrder