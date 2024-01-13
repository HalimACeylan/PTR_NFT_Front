import React, { useState } from 'react';
import axios from 'axios';

const Create = () => {
  const [file, setFile] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const JWT = `${process.env.PINATA_JWT}`

  function handleFileChange(e : any) {
    console.log(e.target.files);
    setFile(e.target.files[0]);
  };

  const pinFileToIPFS = async () => {
    try {
      if (file === null) {
        console.error("File is null");
        return;
      }
  
      const formData = new FormData();
      formData.append('file', file);
  
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
      <div className="grid grid-cols-5 gap-6 w-full bg-gray-800 px-16 py-8">
        <div className="container mx-auto my-10">
          <h1 className="text-3xl font-bold mb-5">Create an NFT</h1>
          <form>
            <label>
              File:
              <input
                type="file"
                required
                name="file"
                onChange={handleFileChange}
              />
            </label>
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
            </label>
            <label>
              Description:
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
              ></textarea>
            </label>
            <label>
              Price in PTR:
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price in PTR"
              />
            </label>
            <div className="d-grid px-0 bg-black">
              <button onClick={createNFT} className="btn-primary">
                Create & List NFT!
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
