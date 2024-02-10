import Image from "next/image";

export default function Card(props: any) {
  return (
    <div className="flex flex-col border text-lg w-full h-full rounded-xl shadow-xl transition ease-in-out delay-50 hover:-translate-y-3 group text-white relative">
      <div className="flex-1">
        <Image
          width={props.width}
          height={props.height}
          className="w-full rounded-xl min-h-80 max-h-80"
          src={props.src}
          alt={props.alt}
        />
        <div className="container flex-wrap justify-between p-2 w-full">
          {/* <span className="flex flex-col w-1/2">
            <span className="text-red-600 group">Name</span>
            {props.name}
          </span> */}
          {/* <span className="flex flex-col text-center">
            <span className="text-red-600 group">Price</span>
            {props.price}
          </span> */}
        </div>
      </div>
      {props.isInventory ? (
        <div></div>
      ) : (
        <button
          onClick={props.onClick}
          className="bg-red-600 text-white py-2  rounded-b-xl group-hover:bg-white group-hover:text-red-600"
        >
          Envanter'e Ekle
        </button>
      )}

    </div>
  );
}
