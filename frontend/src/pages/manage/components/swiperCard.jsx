import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './styles.css';

// import required modules
import { Pagination } from 'swiper/modules';
import CardConfirm from './cardConfirm';

export default function SwiperCard() {
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
            renderBullet: false,
          clickable: true,
        }}
        showsPagination={false}
        modules={[Pagination]}
        className="mySwiper"
      >
        {new Array(10).fill(null).map((item,index)=>{
            return(
                <SwiperSlide key={index}>
                    <CardConfirm/>
                </SwiperSlide>
            )
        })}
      </Swiper>
    </>
  );
}
