"use client";
import React, { useEffect, useState } from 'react';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import { ethers } from "ethers";
import myContract from "@/contract.json";
import '@/app/globals.css'
import TextField from '@/components/sections/TextField';

export default function WhoWeAre(){

    const { ethers } = require("ethers");
    const [provider, setProvider] = useState(null);
    const [network, setNetwork] = useState("");
    const [contract, setContract] = useState(null);
    const [accountCheck, setAccountCheck] = useState(false);


    useEffect(() => {
      setAccountCheck((window as any).ethereum._state && (window as any).ethereum._state.accounts.length > 0);

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
      }, [contract, network, provider,accountCheck]);

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

    return(
        <div className='bg-gray-800'>
            <Header initializeProvider={initializeProvider} accountCheck={accountCheck} />
            <TextField header={"Biz Kimiz"} content={"Fatih Emre YILDIZ 180702004,1 | Halim A. Ceylan 190709043"}/>
            <Footer />
        </div>
    )
}

