"use client";
import Card from "../ui/Card";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import MarketPlace from "../../contractsData/Marketplace.json";
import MarketPlaceAddress from "../../contractsData/Marketplace-address.json";
import NFTabi from "../../contractsData/NFT.json";
import NFTAddress from "../../contractsData/NFT-address.json";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function Hero(props: any) {
  const [Cards, setCards] = useState();
  const [MarketPlaceContract, setMarketPlaceContract] = useState(props.MarketPlaceContract);
  const [NFTContract, setNFTContract] = useState(props.NFTContract);

  useEffect(() => {
    const items = async () => {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      setMarketPlaceContract(new ethers.Contract(MarketPlaceAddress.address, MarketPlace.abi, signer))
      setNFTContract(new ethers.Contract(NFTAddress.address, NFTabi.abi, signer))
      const itemCount = await MarketPlaceContract.itemCount();
      const itemsList = [];
      for (let i = 1; i <= itemCount; i++) {
        const item = await MarketPlaceContract.items(i);
        const uri = await NFTContract.tokenURI(item.tokenIdInNFT);
        const totalPrice = await MarketPlaceContract.getTotalPrice(
          item.itemIdInMarketplace
        );
        console.log(item)
        if (!item.sold) {
          itemsList.push({
            inListItemIdInMarketplace: item.itemIdInMarketplace,
            inListTokenIdInNFT: item.tokenIdInNFT,
            uri: uri,
            owner: item.owner,
            price: totalPrice.toString(),
          });
        }
      }
      const Purchase = (item: any) => {
        async function buy() {
          if (item.owner.toLowerCase() === props.account.toLowerCase()) {
            toast("Kendi NFT'nizi satın alamazsınız");
            return;
          } else {
            console.log(MarketPlaceContract)
            const tx = await MarketPlaceContract.purchaseItem(
              item.inListItemIdInMarketplace,
              { value: item.price }
            );
            console.log(tx);
            await tx.wait().catch((error:any) => {
              console.error("Transaction failed:", error);
              toast("NFT satın alma işlemi başarısız oldu");
            });

          }
        }
        return buy;
      };
      const Cards = itemsList.map((item: any) => {
        return (
          <Card
            key={item.itemIdInMarketplace}
            isInventory={false}
            onClick={Purchase(item)}
            src={"https://ipfs.io/ipfs/" + item.uri}
            alt="image"
            name={item.inListItemIdInMarketplace.toString()}
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
  }, [props.account,props.MarketPlaceContract,props.NFTContract]);

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
