import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { FaCapsules } from 'react-icons/fa';

interface Pharmacy {
  id: number;
  nom_pharmacie: string;
  numero_voie: number | null;
  type_de_voie: string;
  voie: string;
  departement: number;
  ville: string;
  cp: number;
  commune: string;
  telephone: number | null;
}

const FilteredPartners = () => {
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const { pharmacies: queryPharmacies } = router.query;

  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const response = await axios.get('http://localhost:8081/pharmacy');
        console.log('API response:', response.data); // Log the response

        if (response.data && Array.isArray(response.data.data)) {
          const allPharmacies = response.data.data;
          console.log('All pharmacies:', allPharmacies);

          if (queryPharmacies) {
            const pharmacyIds = JSON.parse(queryPharmacies as string);
            console.log('Query pharmacy IDs:', pharmacyIds);
            const associatedPharmacies = allPharmacies.filter((pharmacy: { id: any; }) => pharmacyIds.includes(pharmacy.id));
            setPharmacies(associatedPharmacies);
            console.log('Filtered pharmacies by query:', associatedPharmacies);
          } else {
            setPharmacies([]);
          }
        } else {
          console.error('Invalid response format:', response.data);
          setError('Invalid response format');
        }
      } catch (error) {
        console.error('Error fetching pharmacies:', error);
        setError('Error fetching pharmacies');
      } finally {
        setLoading(false);
      }
    };

    fetchPharmacies();
  }, [queryPharmacies]);

  const formatPhoneNumber = (phoneNumber: number | null) => {
    if (phoneNumber === null) {
      return 'N/A';
    }
    const phoneString = phoneNumber.toString();
    return `+33 0${phoneString.slice(1)}`;
  };

  const createGoogleMapsLink = (pharmacy: Pharmacy) => {
    const address = `${pharmacy.numero_voie ? pharmacy.numero_voie + ' ' : ''}${pharmacy.type_de_voie} ${pharmacy.voie}, ${pharmacy.cp} ${pharmacy.commune}, France`;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Pharmacies Partenaires</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {pharmacies.length === 0 ? (
              <p>No pharmacies found.</p>
            ) : (
              pharmacies.map(pharmacy => (
                <a
                  key={pharmacy.id}
                  href={createGoogleMapsLink(pharmacy)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-200 p-4 rounded-lg shadow-md flex items-center hover:bg-gray-300 transition-colors duration-200"
                >
                  <FaCapsules className="text-green-600 h-6 w-6 mr-4" />
                  <div>
                    <h2 className="text-xl font-bold">{pharmacy.nom_pharmacie}</h2>
                    <p>{`${pharmacy.numero_voie !== null ? `${pharmacy.numero_voie} ` : ''}${pharmacy.type_de_voie} ${pharmacy.voie}`}</p>
                    <p>{`${pharmacy.cp} ${pharmacy.commune}`}</p>
                    <p>{formatPhoneNumber(pharmacy.telephone)}</p>
                  </div>
                </a>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilteredPartners;
