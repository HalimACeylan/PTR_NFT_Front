"use client"
import React, { useState } from 'react';
import axios from 'axios';
import Previews from '../ui/Previews';
import { ethers } from "ethers";
import NFTAddress from '../../contractsData/NFT-address.json'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

const Create = (props:any) => {

  const route = useRouter();

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
      if(res.status !== 200 ){
        toast('NFT oluşturulamadı');
      }else{
        if(res.data?.isDuplicate){
          toast('Bu NFT zaten IPFS üzerinde mevcut Yeniden oluşturuluyor');
          frontCreateNFT(res.data.IpfsHash,price)
      }else{
        frontCreateNFT(res.data.IpfsHash,price);
      }
    }
    } catch (error) {
      console.error(error);
    }
  };
  
  // TODO: Add few checks, such as failing to upload IPFS, user should be warned
  const frontCreateNFT = async (tokenURI:any,price:any) => {
    const provider = new ethers.BrowserProvider(window.ethereum)
    if(provider){
      try{
        const tx = await props.nftContract.createNFT(tokenURI);
        await tx.wait();
        if(tx.data){
          try{
            const txMarket = await props.nftContract.setApprovalForAll(props.marketPlaceConract, true);
            await txMarket.wait();
          }catch(error){
            console.error(error);
            toast('NFT oluştuşturulurken bir hata oluştu');
          }
  
          try{
            await (await props.marketPlaceConract.makeItem(NFTAddress.address, props.nftContract.tokenCount(), price)).wait();
            toast('NFT başarıyla oluşturuldu');
            route.push('/');
  
          }catch(error){
            console.error(error);
            toast('NFT oluştuşturulken bir hata oluştu');
  
          } 
        }
      }catch(error){
        console.error(error);
        toast('NFT oluştuşturulurken bir hata oluştu');
      }
          
    }
  };

  const testChain = async (e : any) => {
    console.log('TestChain pressed');
    e.preventDefault();
    try {
      console.log('Printed pressed.');
      await props.testContract.printAllItemsAndMetadata();
      console.log("Check hardhat if it is printed.");
    } catch (error) {
      console.error(error);
    }
  };
  

  const request = async (e : any) => {
    console.log('Create NFT is pressed');
    e.preventDefault();
    try {
      await pinFileToIPFS();
      console.log('NFT created successfully');
    } catch (error) {
      toast('NFT oluştuşturulken bir hata oluştu');
    }
  };

  return (
    <div>
      <div className="flex flex-col w-8/12 bg-gray-800  mx-auto">
        <div className="container mx-auto my-10">
          <h1 className="text-3xl font-bold mb-5 text-white text-center">NFT Oluştur</h1>
          <form className='flex flex-col items-center'>
            <div className='w-full h-max-92 max-h-max m-6'>
            <Previews files={files} setFiles={setFiles} />
            </div>
              <input
                className='w-full h-10 m-2 rounded-xl shadow-lg box-border p-2 text-white border-gray-600 bg-gray-700'
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="İsim"
              />
              <textarea
                value={description}
                className='w-full h-40 m-2 rounded-xl shadow-lg box-border p-2 text-white border-gray-600 bg-gray-700'
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Açıklama"
              ></textarea>

              <input
                type="number"
                className='w-full h-10 m-2 rounded-xl shadow-lg box-border p-2 text-white border-gray-600 bg-gray-700'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price in PTR"
              />
              <button onClick={request} className=' m-2 rounded-xl shadow-lg box-border p-4 text-white border-gray-600 bg-gray-700'>
                NFT Oluştur ve Listele!
              </button>
              <button data-id="${testChain}" onClick={testChain} className=' m-2 rounded-xl shadow-lg box-border p-4 text-white border-gray-600 bg-gray-700'>
                Test Chain
              </button>
          </form>
        </div>
      </div>
      <ToastContainer  
      position="top-left"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
       />
    </div>
  );
};

export default Create;
