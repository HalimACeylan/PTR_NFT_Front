import React, { useState } from 'react';
import axios from 'axios';
import Previews from '../ui/Previews';

const Create = () => {
  const [files, setFiles] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const JWT = `${process.env.PINATA_JWT}`
  const pinFileToIPFS = async () => {
    try {
      if (files.length < 0) {
        console.error("File is null");
        return;
      }
  
      const formData = new FormData();
      formData.append('file', files[0]);
  
      const pinataMetadata = {
        name: name,
        keyvalues: {
          'Description': description,
          'Price': price,
        },
      };
  
      formData.append('pinataMetadata', JSON.stringify(pinataMetadata));
      formData.append('pinataOptions', JSON.stringify({ cidVersion: 0 }));
  
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${JWT}`,
        },
      };
  
      const res = await axios.post(
        'https://api.pinata.cloud/pinning/pinFileToIPFS',
        formData,
        config
      );
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  

  const createNFT = async (e : any) => {
    console.log('Create NFT is pressed');
    e.preventDefault();
    try {
      await pinFileToIPFS();
      console.log('NFT created successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex flex-col w-8/12 bg-gray-800  mx-auto">
        <div className="container mx-auto my-10">
          <h1 className="text-3xl font-bold mb-5 text-center">Create an NFT</h1>
          <form className='flex flex-col items-center'>
            <div className='w-full h-max-92 max-h-max m-6'>
            <Previews files={files} setFiles={setFiles} />
            </div>
              <input
                className='w-full h-10 m-2 rounded-xl shadow-lg box-border p-2 text-white border-gray-600 bg-gray-700'
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
              <textarea
                value={description}
                className='w-full h-40 m-2 rounded-xl shadow-lg box-border p-2 text-white border-gray-600 bg-gray-700'
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
              ></textarea>

              <input
                type="number"
                className='w-full h-10 m-2 rounded-xl shadow-lg box-border p-2 text-white border-gray-600 bg-gray-700'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price in PTR"
              />
              <button onClick={createNFT} className=' m-2 rounded-xl shadow-lg box-border p-4 text-white border-gray-600 bg-gray-700'>
                Create & List NFT!
              </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
