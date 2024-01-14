"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import MarketPlace from "../contractsData/Marketplace.json";
import MarketPlaceAddress from "../contractsData/Marketplace-address.json";
import NFTAbi from "../contractsData/NFT.json";
import NFTAddress from "../contractsData/NFT-address.json";

export default function Index() {
  const { ethers } = require("ethers");
  const [loading, setLoading] = useState(true);
  
  const provider = new ethers.BrowserProvider(window.ethereum)
  const [Marketplace, setMarketplace] = useState(new ethers.Contract(MarketPlaceAddress.address, MarketPlace.abi,provider))
  const [NFT, setNFT] = useState(new ethers.Contract(NFTAddress.address, NFTAbi.abi, provider))
  const [accountCheck, setAccountCheck] = useState((window as any).ethereum._state && (window as any).ethereum._state.accounts.length > 0);

  window.ethereum.on('accountsChanged', async function (accounts:Array<string>) {
    console.log(accounts)
    if(accounts.length > 0){
      const signer = await provider.getSigner()
      loadContracts(signer)
      console.log(Marketplace);
      console.log(NFT);
    }
    setAccountCheck(accounts.length > 0);
  })

  const initializeProvider = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    // Get provider from Metamask
    // Set signer
    const signer = await provider.getSigner()
    window.ethereum.on('chainChanged', (chainId:any) => {
      window.location.reload();
    })

    loadContracts(signer)
  }
  const loadContracts = async (signer:any) => {
    // Get deployed copies of contracts

    setMarketplace(new ethers.Contract(MarketPlaceAddress.address, MarketPlace.abi, signer))
    setNFT(new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer))
    setLoading(false)
  }

  
  return (
    <div className="bg-gray-800">
      <Header
        initializeProvider={initializeProvider}
        accountCheck={accountCheck}
      />
      <Hero
        MarketPlaceContract={Marketplace}
        NFTContract={NFT}
      />
    </div>
  );
}
