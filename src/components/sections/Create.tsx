"use client"
import React, { useState } from 'react';
import axios from 'axios';
import Previews from '../ui/Previews';
import { ethers } from "ethers";
import NFT from "../../contractsData/NFT.json";
import NFTAddress from "../../contractsData/NFT-address.json";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Contract } from 'ethers';


const Create = (props:any) => {
  const [files, setFiles] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const JWT = `${process.env.NEXT_PUBLIC_PINATA_API_KEY}` || 'test';
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
      console.log(res);
      if(res.status !== 200 ){
        toast('NFT oluşturulamadı');
      }else{
        if(res.data?.isDuplicate){
          toast('Bu NFT zaten var');
          createNFT(res.data.IpfsHash,price)
      }else{
        toast('NFT başarıyla oluşturuldu');
        createNFT(res.data.IpfsHash,price);
      }
    }
    } catch (error) {
      console.error(error);
    }
  };
  
  const createNFT = async (tokenURI:any,price:any) => {
    console.log(props)
    if(props.provider){
      console.log(tokenURI);
      const signer = await (props.provider as ethers.BrowserProvider).getSigner();
      const NFTcontract  = await new ethers.Contract(
        NFTAddress.address,NFT.abi,signer
      );
      const tx = await NFTcontract.createNFT(tokenURI);
      if(tx.data){
        props.contract.makeItem(NFTAddress.address,tx.data,price);
      }
    }
  };
  

  const request = async (e : any) => {
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
          <h1 className="text-3xl font-bold mb-5 text-white text-center">Create an NFT</h1>
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
              <button onClick={request} className=' m-2 rounded-xl shadow-lg box-border p-4 text-white border-gray-600 bg-gray-700'>
                Create & List NFT!
              </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Create;
