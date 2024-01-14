import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    const bottomLinkTitles = [
        "Hakkında",
        "NFT Oluştur",
        "SSS",
        "Biz Kimiz?",
    ]

    const bottomRoutes = [
        "/about",
        "/create-nft",
        "/sss",
        "/whoweare"
    ]

    const bottom = bottomLinkTitles.map((text, index) => (
        <Link href={bottomRoutes[index]} key={text} className="border-b w-3/4 p-2 ml-auto hover:bg-red-600 rounded-xl">
            {text}
        </Link>
    ))
  return (
    <div className="bg-gray-800 border-t text-white">
      <div className="flex flex-row px-16 justify-between">
        <div className="flex flex-row items-center w-1/2">
          <Logo />
          <span>
            PTR - ParlaTR is a project of CENG 3550.
          </span>
        </div>
       <div className="flex flex-col w-1/3 items-right ml-8">
        <h1 className=" text-2xl text-left ml-auto py-3 text-red-600 ">Kısa Bağlantılar</h1>
       <div className="w-full flex flex-row-reverse" >
            <div className="flex flex-col flex-1">
            {bottom}
            </div>
        </div>
       </div>
      </div>
      <div className="bg-gray-700 py-4 text-center bottom-0 mt-3">
        <p>2024 - Muğla Sıtkı Koçman University - All Rights Reserved</p>
      </div>
    </div>
  );
}

function Logo(props: any) {
  return (
    <div {...props}>
      <Image width="240" height="240" src="/assets/logo.png" alt="logo" />
    </div>
  );
}
