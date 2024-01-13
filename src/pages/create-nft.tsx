"use client";
import React, { useEffect, useState } from 'react';
import Header from '@/components/sections/Header';
import Create from '@/components/sections/Create';
import Footer from '@/components/sections/Footer';
import { ethers } from "ethers";
import myContract from "@/contract.json";
import '@/app/globals.css'
export default function NFTCreate(){

    const { ethers } = require("ethers");
    const [provider, setProvider] = useState(null);
    const [network, setNetwork] = useState("");
    const [contract, setContract] = useState(null);


    useEffect(() => {
        const contract = async () => {
          if (provider) {
            const signer = await (provider as ethers.BrowserProvider ).getSigner();
            const contract  = await new ethers.Contract(
               myContract.address,myContract.abi,signer
            );
            setContract(contract);
          }
        }
          contract();
        const getNetwork = async () => {
          if (provider) {
            const network = await (provider as ethers.BrowserProvider ).getNetwork();
            console.log(network);
            setNetwork(network.name);
          }
        };
    
        getNetwork();
      }, [ethers.provider, contract, network, provider, ethers.BrowserProvider, ethers.Contract, myContract.address]);

      const initializeProvider = async () => {
        if ((window as any).ethereum) {
          await (window as any).ethereum.request({ method: "eth_requestAccounts" });
          const provider = new ethers.BrowserProvider((window as any).ethereum);
          const accounts = await provider.send("eth_requestAccounts", []);
          const balance = await provider.getBalance(accounts[0]);
          const block = await provider.getBlockNumber();
          setProvider(provider);
        }
      };

    return(
        <div className='bg-gray-800'>
            <Header initializeProvider={initializeProvider} />
            <Create />
            <Footer />
        </div>
    )
}

