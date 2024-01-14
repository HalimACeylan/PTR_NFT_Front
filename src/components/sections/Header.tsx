/**
 * v0 by Vercel.
 * @see https://v0.dev/t/2SskX0O5eBV
 */
"use client";
import Link from "next/link";
import Image from "next/image";

export default function Header(props: any) {
  return (
    <div className="bg-gray-800">
      <nav className="flex items-center justify-between mx-16 py-2">
        <div className="flex items-center text-xl">
          <Logo />
          <div className="flex border-l pl-4 space-x-4">
            <Link
              className="text-white font-semibold hover:text-red-600"
              href="/"
            >
              Anasayfa
            </Link>
            <Link
              className="text-white font-semibold hover:text-red-600"
              href="/create-nft"
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
          {props.accountCheck ? (
            <button
              onClick={props.initializeProvider}
              className="bg-red-600 group hover:bg-gray-300 text-white px-4 py-3 rounded-lg flex flex-row items-center"
            >
              <span className="group group-hover:text-red-600 mr-2 text-lg">
                Welcome
              </span>{" "}
              <WalletIcon />
            </button>
          ) : (
            <button
              onClick={props.initializeProvider}
              className="bg-red-600 group hover:bg-gray-300 text-white px-4 py-3 rounded-lg flex flex-row items-center"
            >
              <span className="group group-hover:text-red-600 mr-2 text-lg">
                Giriş Yap
              </span>{" "}
              <WalletIcon />
            </button>
          )}

          {props.accountCheck ? (
                        <button
                        onClick={props.initializeProvider}
                        className="bg-red-600 group hover:bg-gray-300 text-white px-4 py-3 rounded-lg flex flex-row items-center"
                      >
                        <span className="group group-hover:text-red-600 mr-1 text-lg">
                          Envanter
                        </span>
                        {" "}
                        <Inventory />
                      </button>
          ) : (
            <button
              className="bg-red-600  hover:bg-gray-300 text-white px-4 py-2.5 rounded-lg flex flex-row items-center disabled:bg-gray-400"
              disabled
            >

              <span className=" mr-0.5 text-lg">
                Envanter
              </span>
              <Inventory />
            </button>
          )}
        </div>
      </nav>
    </div>
  );
}

function Inventory(props: any) {
  return (
    <svg
    {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M7.615 21q-.69 0-1.152-.462Q6 20.075 6 19.385V12q0-1.933 1.084-3.425q1.083-1.492 2.762-2.144V6q0-.904.625-1.529T12 3.846q.904 0 1.529.625T14.154 6v.43q1.679.653 2.762 2.145Q18 10.067 18 12v7.385q0 .69-.462 1.152q-.463.463-1.153.463zM15 15.5q.213 0 .357-.143q.143-.144.143-.357v-2.5h-7v1h6V15q0 .213.143.357q.144.143.357.143m-4.154-9.362q.294-.069.577-.103Q11.706 6 12 6t.577.035q.283.034.577.103V6q0-.483-.336-.818q-.335-.336-.818-.336t-.818.336q-.336.335-.336.818z"
      />
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
      <Image width="140" height="140" src="/assets/logo.png" alt="logo" />
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
