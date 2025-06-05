import React, { useState, useEffect } from 'react';

interface Region {
  id: string;
  name: string;
}

const AddressForm: React.FC = () => {
  const [address, setAddress] = useState<string>('');
  const [provinces, setProvinces] = useState<Region[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string>('');
  const [regencies, setRegencies] = useState<Region[]>([]);
  const [selectedRegency, setSelectedRegency] = useState<string>('');
  const [districts, setDistricts] = useState<Region[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [villages, setVillages] = useState<Region[]>([]);
  const [selectedVillage, setSelectedVillage] = useState<string>('');
  const [postalCode, setPostalCode] = useState<string>('');

  useEffect(() => {
    fetch('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json')
      .then(response => response.json())
      .then(data => setProvinces(data))
      .catch(error => console.error('Error fetching provinces:', error));
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvince}.json`)
        .then(response => response.json())
        .then(data => {
          setRegencies(data);
          setSelectedRegency('');
          setDistricts([]);
          setVillages([]);
        })
        .catch(error => console.error('Error fetching regencies:', error));
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedRegency) {
      fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${selectedRegency}.json`)
        .then(response => response.json())
        .then(data => {
          setDistricts(data);
          setSelectedDistrict('');
          setVillages([]);
        })
        .catch(error => console.error('Error fetching districts:', error));
    }
  }, [selectedRegency]);

  useEffect(() => {
    if (selectedDistrict) {
      fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${selectedDistrict}.json`)
        .then(response => response.json())
        .then(data => {
          setVillages(data);
          setSelectedVillage('');
        })
        .catch(error => console.error('Error fetching villages:', error));
    }
  }, [selectedDistrict]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const provinceName = provinces.find(p => p.id === selectedProvince)?.name;
    const regencyName = regencies.find(r => r.id === selectedRegency)?.name;
    const districtName = districts.find(d => d.id === selectedDistrict)?.name;
    const villageName = villages.find(v => v.id === selectedVillage)?.name;

    console.log({
      address,
      province: provinceName,
      regency: regencyName,
      district: districtName,
      village: villageName,
      postalCode,
    });
    alert('Form submitted! Check console for data.');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Form Alamat</h2>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Alamat Lengkap</label>
        <textarea
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          rows={3}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Masukkan alamat lengkap Anda"
          required
        ></textarea>
      </div>

      <div>
        <label htmlFor="province" className="block text-sm font-medium text-gray-700">Provinsi</label>
        <select
          id="province"
          value={selectedProvince}
          onChange={(e) => setSelectedProvince(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        >
          <option value="">Pilih Provinsi</option>
          {provinces.map(province => (
            <option key={province.id} value={province.id} >{province.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="regency" className="block text-sm font-medium text-gray-700">Kabupaten/Kota</label>
        <select
          id="regency"
          value={selectedRegency}
          onChange={(e) => setSelectedRegency(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          disabled={!selectedProvince}
          required
        >
          <option value="">Pilih Kabupaten/Kota</option>
          {regencies.map(regency => (
            <option key={regency.id} value={regency.id}>{regency.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="district" className="block text-sm font-medium text-gray-700">Kecamatan</label>
        <select
          id="district"
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          disabled={!selectedRegency}
          required
        >
          <option value="">Pilih Kecamatan</option>
          {districts.map(district => (
            <option key={district.id} value={district.id}>{district.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="village" className="block text-sm font-medium text-gray-700">Kelurahan</label>
        <select
          id="village"
          value={selectedVillage}
          onChange={(e) => setSelectedVillage(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          disabled={!selectedDistrict}
          required
        >
          <option value="">Pilih Kelurahan</option>
          {villages.map(village => (
            <option key={village.id} value={village.id}>{village.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Kode Pos</label>
        <input
          type="text"
          id="postalCode"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Masukkan Kode Pos"
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Submit
      </button>


    </form>
  );
};

export default AddressForm;