import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';

export default function CardListSlider() {
    const listDefault = [
        { name: 'Peter', age: 52 },
        { name: 'Thomas', age: 64 },
        { name: 'Alice', age: 36 },
        { name: 'Olivia', age: 42 },
        { name: 'Frank', age: 41 },
        { name: 'Olivia', age: 49 },
        { name: 'Noah', age: 54 },
        { name: 'David', age: 64 },
        { name: 'Jack', age: 76 },
        { name: 'Eve', age: 21 }
    ]
    const [list, setList] = useState(listDefault)

    const handleDeleteCard = (cardIndex) => {
        console.log('check cardIndex:', cardIndex)
        const newList = list.filter((item, index) => index !== cardIndex)
        setList(newList)
    }
    return (
        <>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                modules={[Pagination]}
                className="mySwiper"
            >
                {list.map((item, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <Box className='h-[200px] border-2 border-gray-300 rounded-md relative'>
                                <Text>{item.name}</Text>
                                <Flex className='absolute bottom-5 right-5 gap-5'>
                                    <Button onClick={() => handleDeleteCard(index)} colorScheme='red'>Decline</Button>
                                    <Button colorScheme='green'>Accept</Button>
                                </Flex>
                            </Box>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </>
    );
}