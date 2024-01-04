import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    const bottomLinks = [
        "About",
        "Index",
        "Create",
        "FAQ",
        "Who We Are?",
    ] 
    const bottom = bottomLinks.map((text) => (
        <Link href="/" key={text} className="border-b w-3/4 p-2 ml-auto hover:bg-red-600 rounded-xl">
            {text}
        </Link>
    ))
  return (
    <div className="bg-gray-800 border-t pt-6">
      <div className="flex flex-row px-16 justify-between">
        <div className="flex flex-row items-center w-1/2">
          <Logo />
          <span>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem minima
            distinctio, labore harum facilis unde dolore magnam exercitationem
            tempore fugiat culpa libero iste tempora eligendi eos accusamus! Ad,
            autem ratione!
          </span>
        </div>
       <div className="flex flex-col w-1/3 items-right ml-8">
        <h1 className=" text-2xl text-left ml-auto py-3 text-red-600 ">Quick Links</h1>
       <div className="w-full flex flex-row-reverse" >
            <div className="flex flex-col flex-1">
            {bottom}
            </div>
            <div className="flex flex-col flex-1">
            {bottom}
            </div>
        </div>
       </div>
      </div>
      <div className="bg-gray-700 py-4 text-center bottom-0 mt-8">
        <p>2024 Mugla Sıtkı Kocman University All Right Reserved</p>
      </div>
    </div>
  );
}

function Logo(props: any) {
  return (
    <div {...props}>
      <Image width="300" height="300" src="/assets/logo.png" alt="logo" />
    </div>
  );
}
