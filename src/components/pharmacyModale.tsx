import React, { useState, useEffect } from 'react';

interface PharmacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (pharmacy: any) => void;
  pharmacy?: any;
}

const PharmacyModal: React.FC<PharmacyModalProps> = ({ isOpen, onClose, onSave, pharmacy }) => {
  const [nomPharmacie, setNomPharmacie] = useState('');
  const [numeroVoie, setNumeroVoie] = useState(0);
  const [typeDeVoie, setTypeDeVoie] = useState('');
  const [voie, setVoie] = useState('');
  const [departement, setDepartement] = useState(0);
  const [ville, setVille] = useState('');
  const [cp, setCp] = useState(0);
  const [commune, setCommune] = useState('');
  const [telephone, setTelephone] = useState(0);

  useEffect(() => {
    if (pharmacy) {
      setNomPharmacie(pharmacy.nom_pharmacie);
      setNumeroVoie(pharmacy.numero_voie);
      setTypeDeVoie(pharmacy.type_de_voie);
      setVoie(pharmacy.voie);
      setDepartement(pharmacy.departement);
      setVille(pharmacy.ville);
      setCp(pharmacy.cp);
      setCommune(pharmacy.commune);
      setTelephone(pharmacy.telephone);
    } else {
      setNomPharmacie('');
      setNumeroVoie(0);
      setTypeDeVoie('');
      setVoie('');
      setDepartement(0);
      setVille('');
      setCp(0);
      setCommune('');
      setTelephone(0);
    }
  }, [pharmacy]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: pharmacy?.id,
      nom_pharmacie: nomPharmacie,
      numero_voie: numeroVoie,
      type_de_voie: typeDeVoie,
      voie,
      departement,
      ville,
      cp,
      commune,
      telephone,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">{pharmacy ? 'Edit Pharmacy' : 'Add Pharmacy'}</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Nom de la Pharmacie</label>
            <input
              type="text"
              value={nomPharmacie}
              onChange={e => setNomPharmacie(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Numéro de Voie</label>
            <input
              type="number"
              value={numeroVoie}
              onChange={e => setNumeroVoie(parseInt(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Type de Voie</label>
            <input
              type="text"
              value={typeDeVoie}
              onChange={e => setTypeDeVoie(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Voie</label>
            <input
              type="text"
              value={voie}
              onChange={e => setVoie(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Département</label>
            <input
              type="number"
              value={departement}
              onChange={e => setDepartement(parseInt(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Ville</label>
            <input
              type="text"
              value={ville}
              onChange={e => setVille(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Code Postal</label>
            <input
              type="number"
              value={cp}
              onChange={e => setCp(parseInt(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Commune</label>
            <input
              type="text"
              value={commune}
              onChange={e => setCommune(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Téléphone</label>
            <input
              type="number"
              value={telephone}
              onChange={e => setTelephone(parseInt(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-4 bg-gray-500 text-white px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-fuchsia-600 text-white px-4 py-2 rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PharmacyModal;
