"use client";
import Card from '../ui/Card'
import { useEffect,useState } from "react";
import { ethers } from "ethers";
import MarketPlace from "../../contractsData/Marketplace.json";
import MarketPlaceAddress from "../../contractsData/Marketplace-address.json";
export default function Hero(props:any){
  const [Cards, setCards] = useState();


  useEffect(() => { 
    const items = async () => {
      console.log(props)
      const itemCount = await props.MarketPlaceContract.itemCount()
      console.log(itemCount)
      const itemsList = []
      for (let i = 1; i <= itemCount; i++) {
        const item = await props.MarketPlaceContract.items(i)
        const uri = await props.NFTContract.tokenURI(item.tokenId)
        const totalPrice = await props.MarketPlaceContract.getTotalPrice(item.itemId)
        itemsList.push({
          tokenId: item.tokenId,
          uri: uri,
          price: totalPrice.toString(),
        })
      }  
     const Cards = itemsList.map((obj:any) => {
      return <Card key={obj} onClick={console.log(obj)} src={"https://ipfs.io/ipfs/"+obj.uri} alt="image" name={obj.tokenId.toString} price={obj.price.toString()} width="300" height="300"/>
    }); 
    return Cards;
    }
    items().then((res:any) => {
      setCards(res)
      console.log(res)
    })
  },[props])
  



      const navbarText = ["Hepsi", "Tarih", "Spor", "Bilim", "Müzik"];
      const navbar = navbarText.map((text:any) => (
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
        <div className="grid grid-cols-5 gap-6 w-full bg-gray-800 px-16 py-8 min-h-[50vh]" >
            {Cards}
        </div>
    </div>
        )
}