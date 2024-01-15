"use client";
import Card from "../ui/Card";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import MarketPlace from "../../contractsData/Marketplace.json";
import MarketPlaceAddress from "../../contractsData/Marketplace-address.json";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function Hero(props: any) {
  const [Cards, setCards] = useState();

  useEffect(() => {
    const items = async () => {
      console.log(props);
      const itemCount = await props.MarketPlaceContract.itemCount();
      console.log(itemCount);
      const itemsList = [];
      for (let i = 1; i <= itemCount; i++) {
        const item = await props.MarketPlaceContract.items(i);
        console.log(item);
        const uri = await props.NFTContract.tokenURI(item.tokenId);
        const totalPrice = await props.MarketPlaceContract.getTotalPrice(
          item.itemId
        );
        if (!item.sold) {
          itemsList.push({
            itemId: item.itemId,
            tokenId: item.tokenId,
            uri: uri,
            seller: item.seller,
            price: totalPrice.toString(),
          });
        }
      }
      const Purchase = (item: any) => {
        async function buy() {
          if (item.seller.toLowerCase() === props.account.toLowerCase()) {
            console.log("alo");
            toast("Kendi NFT'nizi satın alamazsınız");
            return;
          } else {
            const tx = await props.MarketPlaceContract.purchaseItem(
              item.itemId,
              { value: item.price }
            );
            await tx.wait();
            toast("NFT satın alındı");
            window.location.reload();
            console.log(tx);
          }
        }
        return buy;
      };
      const Cards = itemsList.map((item: any) => {
        return (
          <Card
            key={item.itemId}
            isInventory={false}
            onClick={Purchase(item)}
            src={"https://ipfs.io/ipfs/" + item.uri}
            alt="image"
            name={item.tokenId.toString}
            price={item.price.toString()}
            width="300"
            height="300"
          />
        );
      });
      return Cards;
    };
    items().then((res: any) => {
      setCards(res);
    });
  }, [props]);

  const navbarText = ["Hepsi", "Tarih", "Spor", "Bilim", "Müzik"];
  const navbar = navbarText.map((text: any) => (
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
      <div className="grid grid-cols-5 gap-6 w-full bg-gray-800 px-16 py-8 min-h-[50vh]">
        {Cards}
      </div>
      <div>
      <ToastContainer  
          position="top-left"
          autoClose={1000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          />
      </div>
    </div>
  );
}
