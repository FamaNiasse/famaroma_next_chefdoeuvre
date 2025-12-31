import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { Navigation, Pagination } from 'swiper/modules';
import Link from 'next/link';

export default function Carousel() {
  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold text-center">Afficher tous les produits</h2>
      <div className="my-4">
        <Link href="/products">
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
                src="/assets/images/produits/banniere_1.jpg" 
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
                src="/assets/images/produits/banniere_2.jpg" 
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
                src="/assets/images/produits/banniere_3.jpg" 
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
                src="/assets/images/produits/banniere_4.jpg" 
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
                src="/assets/images/produits/omega3-promo.png" 
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
                src="/assets/images/produits/omega3-promo.png" 
                alt="Product 6" 
                layout="fill" 
                objectFit="cover" 
                objectPosition="center" 
                className="w-full h-auto"
              />
            </div>
          </SwiperSlide>
        </Swiper>
        </Link>
      </div>
    </section>
  );
}
