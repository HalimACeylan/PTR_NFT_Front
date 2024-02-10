"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { ethers } from "ethers";
import NFTAbi from "../../contractsData/NFT.json";
import NFTAddress from '../../contractsData/NFT-address.json'
import MarketplaceAbi from '../../contractsData/Marketplace.json'
import MarketplaceAddress from '../../contractsData/Marketplace-address.json'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Contract } from 'ethers';
import Card from '../ui/Card'

const NftPage = () => { 
  return (
    <div className="flex">
    <Card href="/nft" src="https://picsum.photos/1920/1080" alt="image" name="NFT 1" price="0.01 ETH" width="80" height="80"/>
    <div className="flex flex-col justify-center item-center  w-3/4 bg-gray-800 mx-auto">
      <div className="container my-10 mx-auto h-full text-center align-middle">
        <h1 className="text-3xl font-bold mb-5 text-white text-center">NFT İsmi</h1>
        <p className="text-1xl font-bold mb-5 text-white justify-center text-center">NFT Açıklaması</p>
        <p className="text-1xl font-bold mb-5 text-white justify-center text-center">Fiyat</p>
        <button className='m-2 rounded-xl shadow-lg box-border p-4 text-white border-gray-600 bg-gray-700'>
            Envanter'e Ekle
        </button>
      </div>
    </div>
    <ToastContainer />
    </div>

  );
};

export default NftPage;
