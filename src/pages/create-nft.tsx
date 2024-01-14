"use client";
import React, { useEffect, useState } from 'react';
import Header from '@/components/sections/Header';
import Create from '@/components/sections/Create';
import Footer from '@/components/sections/Footer';
import Warn from '@/components/sections/SignInWarn';
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
    const [marketplaceContract, setMarketPlaceContract] = useState(null);
    const [nftContract, setNftContract] = useState(null);

    const [accountCheck, setAccountCheck] = useState(false);
    const [events, setEvents] = useState([]);

    if(typeof window !== "undefined"){
      window.ethereum.on('accountsChanged', async function (accounts:Array<string>) {
        window.location.reload();
        console.log(accounts)
        if(accounts.length > 0){
          const provider = new ethers.BrowserProvider(window.ethereum)
          const signer = await provider.getSigner()
          setMarketPlaceContract(new ethers.Contract(MarketPlaceAddress.address, MarketPlace.abi, signer))
          setNftContract(new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer))
          console.log(marketplaceContract);
          console.log(nftContract);
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
        const balance = await provider.getBalance(accounts[0]);
        const block = await provider.getBlockNumber();
      }
    };


    useEffect(() => {
      if (window.ethereum) {
        initializeProvider()
      }
  
        const defineContract = async () => {
          if (providerState) {
            const signer = await (providerState as ethers.BrowserProvider).getSigner();
            const marketPlace  = await new ethers.Contract(
              MarketPlaceAddress.address,MarketPlace.abi,signer
            );
            const nftContract  = await new ethers.Contract(
              NFTAddress.address,NFTAbi.abi,signer
            );
            setMarketPlaceContract(marketPlace);
            setNftContract(nftContract);
            console.log(marketPlace);
            console.log(nftContract);
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
          {accountCheck ? (<div>
            <Header initializeProvider={initializeProvider} accountCheck={accountCheck} />
            <Create  marketPlaceConract={marketplaceContract} nftContract={nftContract} />
            <Footer />
            </div>) : (<div>
              <Header initializeProvider={initializeProvider} accountCheck={accountCheck} />
              <Warn />
              <Footer />
            </div> )}
        </div>
    )
}

