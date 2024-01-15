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
  const [account , setAccount] = useState((window as any).ethereum._state?.accounts[0]);

  window.ethereum.on('accountsChanged', async function (accounts:Array<string>) {
    window.location.reload();
    console.log(accounts)
    if(accounts.length > 0){
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      setMarketplace(new ethers.Contract(MarketPlaceAddress.address, MarketPlace.abi, signer))
      setNFT(new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer))
      console.log(Marketplace);
      console.log(NFT);
    }
    setAccountCheck(accounts.length > 0);
  })

  useEffect(() => {
    if (window.ethereum) {
      initializeProvider()
    }
  }, [])

  const initializeProvider = async () => {
    if ((window as any).ethereum) {
      await (window as any).ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner()
      setAccountCheck((window as any).ethereum._state && (window as any).ethereum._state.accounts.length > 0);
      const accounts = await provider.send("eth_requestAccounts", []);
      const balance = await provider.getBalance(accounts[0]);
      const block = await provider.getBlockNumber();
      loadContracts(signer)

    }

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
        account={account}
      />
    </div>
  );
}
