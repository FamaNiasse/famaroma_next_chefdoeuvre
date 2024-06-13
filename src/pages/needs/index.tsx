// pages/besoins.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Needs {
  id: string;
  nom_besoin: string;
  pictogramme: string;
}

export default function Besoins() {
  const [needs, setNeeds] = useState<Needs[]>([]);

  useEffect(() => {
    const fetchNeeds = async () => {
      try {
        const response = await axios.get('http://localhost:8081/needs');
        const data = response.data;
        if (data.status === "OK" && Array.isArray(data.data)) {
          setNeeds(data.data);
        } else {
          console.error('API response is not an array or failed:', data);
          setNeeds([]);
        }
      } catch (error) {
        console.error('Error fetching needs:', error);
        setNeeds([]);
      }
    };

    fetchNeeds();
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900">Besoins</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {needs.length > 0 ? (
            needs.map((need) => (
              <Link key={need.id} href={`/needs/${need.id}`}>
                <div className="cursor-pointer bg-gray-100 p-4 rounded shadow-md">
                  <img src={need.pictogramme} alt={need.nom_besoin} className="w-full h-32 object-cover"/>
                  <h3 className="mt-4 text-sm text-gray-700">{need.nom_besoin}</h3>
                </div>
              </Link>
            ))
          ) : (
            <p>No needs available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
