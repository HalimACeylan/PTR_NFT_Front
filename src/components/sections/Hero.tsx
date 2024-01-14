"use client";
import Card from '../ui/Card'
import { ethers } from "ethers";
import myContract from "../../contract.json";
export default function Hero(props:any){

    const buy = async () => {
        if(props.provider && props.contract){
          const signer = await (props.provider as ethers.BrowserProvider).getSigner();
          const contract  = await new ethers.Contract(
            myContract.address,myContract.abi,signer
          );
          const tx = await contract.withdraw();
          console.log(tx);
        }
      };

      const navbarText = ["Hepsi", "Tarih", "Spor", "Bilim", "Müzik"];
      const navbar = navbarText.map((text) => (
        <button
          key={text}
          className="text-white hover:bg-red-600 px-4 rounded-xl py-2.5 text-xl"
        >
          {text}
        </button>
      ));

    return (
    <div>
            <div className="flex py-2 overflow-x-auto mx-12">{navbar}</div>
        <div className="grid grid-cols-5 gap-6 w-full bg-gray-800 px-16 py-8" >
        <Card onClick={buy} src="https://picsum.photos/1920/1080" alt="image" name="NFT 1" price="0.01 ETH" width="120" height="120"/>
        <Card onClick={buy} src="https://picsum.photos/1920/1080" alt="image" name="NFT 2" price="0.01 ETH" width="120" height="120"/>
        <Card onClick={buy} src="https://picsum.photos/1920/1080" alt="image" name="NFT 3" price="0.01 ETH"  width="120" height="120"/>
        <Card onClick={buy} src="https://picsum.photos/1920/1080" alt="image" name="NFT 4" price="0.01 ETH" width="120" height="120" />
        <Card onClick={buy} src="https://picsum.photos/1920/1080" alt="image" name="NFT 5" price="0.01 ETH" width="120" height="120"/>
        <Card onClick={buy} src="https://picsum.photos/1920/1080" alt="image" name="NFT 6" price="0.01 ETH" width="120" height="120"/>
        <Card onClick={buy} src="https://picsum.photos/1920/1080" alt="image" name="NFT 7" price="0.01 ETH"  width="120" height="120"/>
        <Card onClick={buy} src="https://picsum.photos/1920/1080" alt="image" name="NFT 8" price="0.01 ETH" width="120" height="120" />
        <Card onClick={buy} src="https://picsum.photos/1920/1080" alt="image" name="NFT 9" price="0.01 ETH" width="120" height="120"/>
        </div>
    </div>
        )
}