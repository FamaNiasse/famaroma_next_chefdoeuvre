import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { Navigation, Pagination } from 'swiper/modules';

export default function Carousel() {
  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold text-center">Best Seller du Jour</h2>
      <div className="my-4">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          className="w-full"
        >
          <SwiperSlide>
            <div className="relative w-full h-96">
              <Image 
                src="/assets/images/produits/omega3-promo.png" 
                alt="" 
                layout="fill" 
                objectFit="cover" 
                objectPosition="center" 
                className="w-full h-auto"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative w-full h-96">
              <Image 
                src="/assets/images/imgenerate/carousel_1.jpg" 
                alt="Product 2" 
                layout="fill" 
                objectFit="cover" 
                objectPosition="center" 
                className="w-full h-auto"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative w-full h-96">
              <Image 
                src="/assets/images/produits/promo_2.png" 
                alt="Product 3" 
                layout="fill" 
                objectFit="cover" 
                objectPosition="center" 
                className="w-full h-auto"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative w-full h-96">
              <Image 
                src="/assets/images/produits/promo_3.png" 
                alt="Product 4" 
                layout="fill" 
                objectFit="cover" 
                objectPosition="center" 
                className="w-full h-auto"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative w-full h-96">
              <Image 
                src="/assets/images/produits/promo_4.png" 
                alt="Product 5" 
                layout="fill" 
                objectFit="cover" 
                objectPosition="center" 
                className="w-full h-auto"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative w-full h-96">
              <Image 
                src="/assets/images/produits/promo_5.png" 
                alt="Product 6" 
                layout="fill" 
                objectFit="cover" 
                objectPosition="center" 
                className="w-full h-auto"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}
