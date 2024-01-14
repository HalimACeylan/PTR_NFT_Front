"use client";
export default function TextField(props: any) {
  return (
    <div className="flex flex-col w-8/12 bg-gray-800 mx-auto  h-screen">
      <div className="container mx-auto my-10">
        <h1 className="text-3xl font-bold mb-5 text-white text-center">{props.header}</h1>
          <p className='w-full m-2 rounded-xl shadow-lg box-border p-2 text-white border-gray-600 bg-gray-700 text-center'>
            {props.content}
          </p>
      </div>
    </div>
  );
}
