/**
 * v0 by Vercel.
 * @see https://v0.dev/t/2SskX0O5eBV
 */
"use client";
import Link from "next/link";
import Image from "next/image";
export default function Header(props:any) {
  const navbarText = [
    "Hepsi",
    "Tarih",
    "Spor",
    "Bilim",
    "Müzik",
  ];
  const navbar = navbarText.map((text) => (
    <button
      key={text}
      className="text-white hover:bg-red-600 px-4 rounded-xl py-2.5 text-xl"
    >
      {text}
    </button>
  ));

  return (
    <div className="bg-gray-800">
      <nav className="flex items-center justify-between mx-16 py-2">
        <div className="flex items-center text-xl">
          <Logo />
          <div className="flex border-l pl-4 space-x-4">
            <Link
              className="text-white font-semibold hover:text-red-600"
              href="#"
            >
              Ana sayfa
            </Link>
            <Link
              className="text-white font-semibold hover:text-red-600"
              href="#"
            >
              Envanter
            </Link>
            <Link
              className="text-white font-semibold hover:text-red-600"
              href="#"
            >
              NFT Oluştur
            </Link>
          </div>
        </div>
        <div className="flex items-center bg-[#343338] rounded-xl px-2 py-1 w-1/3 h-12">
          <SearchIcon className="h-5 w-5 mr-3 text-white" />
          <input
            className="bg-transparent text-white w-full placeholder-white outline-none"
            placeholder="Ara"
            type="Search"
          />
        </div>
        <div className="flex items-center space-x-4">
          { (props.accountCheck && props.accountCheck._state && props.accountCheck._state.accounts.length > 0) ? (
            <button
              className="bg-red-600 group hover:bg-gray-300 text-white px-4 py-3 rounded-lg flex flex-row"
            >
              <span className="group group-hover:text-red-600 mr-2">Hoş geldin</span>{" "}
              <WalletIcon />
            </button>
          ) : (
            <button
              onClick={props.initializeProvider}
              className="bg-red-600 group hover:bg-gray-300 text-white px-4 py-3 rounded-lg flex flex-row"
            >
              <span className="group group-hover:text-red-600 mr-2">Giriş Yap</span>{" "}
              <WalletIcon />
            </button>
          )}
          <button className="border border-gray-500 rounded-lg p-3">
            {" "}
            <BellIcon className="h-6 w-6 text-white" />
          </button>
          <button className="border border-gray-500 rounded-lg p-3">
            {" "}
            <ShoppingCartIcon className="h-6 w-6 text-white" />
          </button>
        </div>
      </nav>
      <div className="flex py-2 overflow-x-auto mx-12">{navbar}</div>
    </div>
  );
}

function BellIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function FlagIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
  );
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function ShoppingCartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}
function Logo(props: any) {
  return (
    <div {...props}>
      <Image width="120" height="120" src="/assets/logo.png" alt="logo" />
    </div>
  );
}

function WalletIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M6 20q-1.65 0-2.825-1.175T2 16V8q0-1.65 1.175-2.825T6 4h12q1.65 0 2.825 1.175T22 8v8q0 1.65-1.175 2.825T18 20zM6 8h12q.55 0 1.05.125t.95.4V8q0-.825-.587-1.412T18 6H6q-.825 0-1.412.588T4 8v.525q.45-.275.95-.4T6 8m-1.85 3.25l11.125 2.7q.225.05.45 0t.425-.2l3.475-2.9q-.275-.375-.7-.612T18 10H6q-.65 0-1.137.338t-.713.912"
      />
    </svg>
  );
}
