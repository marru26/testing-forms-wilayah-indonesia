import React from 'react';
import AddressForm from '../components/AddressForm';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Formulir Alamat</h1>
      <AddressForm />
    </div>
  );
};

export default Home;