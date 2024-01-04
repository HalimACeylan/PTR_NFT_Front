import Image from 'next/image'

export default function Card(props:any) {

return (
    <button className="flex flex-col border  text-lg w-full h-full rounded-xl shadow-xl transition ease-in-out delay-50 hover:-translate-y-3 group hover:bg-red-600 ">
        <Image width={props.width} height={props.height} className='w-full rounded-xl' src={props.src} alt={props.alt} />
        <div className='flex flex-wrap justify-between p-2 w-full '>
        <span className='flex flex-col w-1/2'> <span className='text-red-600 group group-hover:text-white'>Collection</span> {props.name}</span>
        <span className='flex flex-col w-1/2'> <span className='text-red-500 group group-hover:text-white'>Floor</span> {props.price}</span>
        </div>
    </button>


)

}