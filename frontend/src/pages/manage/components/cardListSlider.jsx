import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export default function CardListSlider({ pendingOrders, handleAccept }) {
    // const [list, setList] = useState([pendingOrders])

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
                {pendingOrders?.map((item, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <Box className='h-[200px] border-2 border-gray-300 rounded-md relative'>
                                <Text>{item.username}</Text>

                                <Flex className='absolute bottom-5 right-5 gap-5'>
                                    <Button onClick={() => handleDeleteCard(index)} colorScheme='red'>Decline</Button>
                                    <Button colorScheme='green' onClick={() => handleAccept(item._id)}>Accept</Button>
                                </Flex>
                            </Box>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </>
    );
}