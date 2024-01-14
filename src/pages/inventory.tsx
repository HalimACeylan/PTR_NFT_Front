"use client";
import React, { useEffect, useState } from 'react';
import Header from '@/components/sections/Header';
import Create from '@/components/sections/Create';
import Footer from '@/components/sections/Footer';
import Warn from '@/components/sections/SignInWarn';
import Inventory from '@/components/sections/Inventory';
import { ethers } from "ethers";
import MarketPlace from "../contractsData/Marketplace.json";
import MarketPlaceAddress from "../contractsData/Marketplace-address.json";
import NFTAbi from "../contractsData/NFT.json";
import NFTAddress from "../contractsData/NFT-address.json";
import '@/app/globals.css'
export default function NFTCreate(){


  const { ethers } = require("ethers");
  const [providerState, setProvider] = useState();
  const [network, setNetwork] = useState("");
  const [Marketplace, setMarketplace] = useState(null);
  const [NFT, setNFT] = useState(null);
  const [accountCheck, setAccountCheck] = useState(false);
  const [events, setEvents] = useState([]);
  const [account , setAccount] = useState(null);

if(typeof window !== 'undefined'){
  window.ethereum.on('accountsChanged', async function (accounts:Array<string>) {
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
}


  const initializeProvider = async () => {
    if ((window as any).ethereum) {
      await (window as any).ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      setProvider(provider);
      setAccountCheck((window as any).ethereum._state && (window as any).ethereum._state.accounts.length > 0);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
      const balance = await provider.getBalance(accounts[0]);
      const block = await provider.getBlockNumber();
    }
  };


  useEffect(() => {

      const defineContract = async () => {
        if (providerState) {
          const signer = await (providerState as ethers.BrowserProvider).getSigner();
          const marketPlace  = await new ethers.Contract(
            MarketPlaceAddress.address,MarketPlace.abi,signer
          );
          const nftContract  = await new ethers.Contract(
            NFTAddress.address,NFTAbi.abi,signer
          );
          setMarketplace(marketPlace);
          setNFT(nftContract);
        }
      }
      const getNetwork = async () => {
        if (providerState) {
          const network = await (providerState as ethers.BrowserProvider ).getNetwork();
          console.log(network);
          setNetwork(network.name);
        }
      };
  


      const onMount = async () => {
        await initializeProvider();
        await defineContract();
        await getNetwork();
      };
      onMount();

    }, [accountCheck]);

    return(
        <div className='bg-gray-800'>
            <Header initializeProvider={initializeProvider} accountCheck={accountCheck} />
            {accountCheck && Marketplace && NFT ? (<Inventory MarketPlaceContract={Marketplace}  NFTContract={NFT} account={account} />) : (<Warn />)}
            <Footer />
        </div>
    )
}

