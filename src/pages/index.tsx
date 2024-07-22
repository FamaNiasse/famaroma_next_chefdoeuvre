// pages/index.tsx
import Carousel from '@/components/carousel';

import Link from 'next/link';
import React, {useEffect, useState} from 'react';




const HomePage: React.FC = () => {



  return (

    // <div>{message}</div>
    
    <div className="bg-white text-gray-900">
      <main className="container mx-auto p-4">
        <section className="text-center my-8">
        <h1 className="text-center text-4xl p-10">Vous cherchez le <span className="text-green-700">naturel</span> ? Vous êtes au bon <span className="text-green-700">endroit</span>
    <br /> Bienvenue chez <span className="text-green-700">Fam@roma</span></h1>
        </section>

          <Carousel />

        <section className="my-8">
          <h2 className="text-2xl font-bold text-center">Promotion du Jour</h2>
          <div className="flex justify-around">
            <div className="bg-gray-100 p-4 rounded shadow-md">
              <img src="/assets/images/produits/promo_1.png" alt="Product 1" className="w-full"/>
              <button className="mt-2 bg-fuchsia-800 text-white py-2 px-4 rounded">Je découvre</button>
              <p className="mt-2">Silhouette affinée et meilleur confort</p>
              <p className="font-bold">20,90 €</p>
            </div>
            <div className="bg-gray-100 p-4 rounded shadow-md">
              <img src="/assets/images/produits/promo_4.png" alt="Product 4" className="w-full"/>
              <button className="mt-2 bg-fuchsia-800 text-white py-2 px-4 rounded">Je découvre</button>
              <p className="mt-2">Indispensable d'une santé en fer</p>
              <p className="font-bold">25,90 €</p>
            </div>
          </div>
        </section>
        <section className="my-8">
          <h2 className="text-2xl font-bold text-center">Conseils & Astuces</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-gray-100 p-4 rounded shadow-md">
             <img src="/assets/images/pictogrammes/alternatives_saines.png" alt="alternatives_saines" className="w-full"/>
            </div>
            <div className="bg-gray-100 p-4 rounded shadow-md">
            <img src="/assets/images/pictogrammes/anti_oxydant.png" alt="anti_oxydant" className="w-full"/>
            </div>
            <div className="bg-gray-100 p-4 rounded shadow-md">
              <img src="/assets/images/pictogrammes/beaute_cheveux.png" alt="beaute_cheveux" className="w-full"/>
            </div>
               <div className="bg-gray-100 p-4 rounded shadow-md">
               <img src="/assets/images/pictogrammes/beaute_minceur.png" alt="beaute_minceur" className="w-full"/>  
            </div>
            <div className="bg-gray-100 p-4 rounded shadow-md">
            <img src="/assets/images/pictogrammes/bronzage.png" alt="bronzage" className="w-full"/>     
            </div>
            <div className="bg-gray-100 p-4 rounded shadow-md">
            <img src="/assets/images/pictogrammes/cerveau.png" alt="cerveau" className="w-full"/>
            </div>
          </div>
        </section>
      </main>
    </div>


  )
}

export default HomePage;
