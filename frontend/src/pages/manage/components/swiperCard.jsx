// import React, { useRef, useState } from 'react';
// // Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/pagination';

// import './styles.css';

// // import required modules
// import { Pagination } from 'swiper/modules';
// import CardConfirm from './cardConfirm';

// export default function SwiperCard() {
//   return (
//     <>
//       <Swiper
//         slidesPerView={3}
//         spaceBetween={30}
//         pagination={{
//         clickable: true,
//         }}
//         Pagination={false}
//         navigation
//         modules={[Pagination]}
//         className="mySwiper"
//       >
//         {new Array(10).fill(null).map((item,index)=>{
//             return(
//                 <SwiperSlide key={index}>
//                     <CardConfirm/>
//                 </SwiperSlide>
//             )
//         })}
//       </Swiper>
//     </>
//   );
// }

import React, { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import './styles.css';

// Import required modules
import { Navigation } from 'swiper/modules';
import CardConfirm from './cardConfirm';

export default function SwiperCard() {
  const [items, setItems] = useState(new Array(10).fill(null).map((_, index) => index));
  const [removing, setRemoving] = useState(null);

  const handleRemove = (index) => {
    setRemoving(index);
    setTimeout(() => {
      setItems((prevItems) => prevItems.filter((_, i) => i !== index));
      setRemoving(null);
    }, 500); // Match this duration with the CSS transition duration
  };

  return (
    <>
      <Swiper
        slidesPerView={3}
        navigation
        modules={[Navigation]}
        className="mySwiper flex "
      >
        {items.map((item, index) => (
            <div key={index} className={`card-container mr-2 ${removing === index ? 'removing' : ''}`}>
              <CardConfirm onRemove={() => handleRemove(index)} />
            </div>
        ))}
      </Swiper>
    </>
  );
}
