export default function Warn(props: any) {
  return (
    <div className="flex flex-col w-8/12 bg-gray-800 mx-auto text-white h-[70vh] text-4xl text-center items-center">
      <div className="h-full flex flex-col justify-center">
      <h1 className="mb-4">LÜTFEN İŞLEM YAPMADAN ÖNCE GİRİŞ YAPINIZ!</h1>
      <p>Sağ üste bulunan <strong className="bg-red-600 border rounded-lg p-1.5">Giriş Yap</strong> butonundan giriş yapabilirsiniz</p>
      <Logo className="mx-auto" />
      </div>
    </div>
  );
}

function Logo(props: any) {
  return (
    <svg
    {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="120"
      height="120"
      viewBox="0 0 24 24"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      >
        <path
          strokeDasharray="32"
          strokeDashoffset="32"
          d="M13 4L20 4C20.5523 4 21 4.44772 21 5V19C21 19.5523 20.5523 20 20 20H13"
        >
          <animate
            fill="freeze"
            attributeName="strokeDashoffset"
            dur="0.4s"
            values="32;0"
          ></animate>
        </path>
        <path
          strokeDasharray="12"
          strokeDashoffset="12"
          d="M3 12h11.5"
          opacity="0"
        >
          <set attributeName="opacity" begin="0.5s" to="1"></set>
          <animate
            fill="freeze"
            attributeName="strokeDashoffset"
            begin="0.5s"
            dur="0.2s"
            values="12;0"
          ></animate>
        </path>
        <path
          strokeDasharray="6"
          strokeDashoffset="6"
          d="M14.5 12l-3.5 -3.5M14.5 12l-3.5 3.5"
          opacity="0"
        >
          <set attributeName="opacity" begin="0.7s" to="1"></set>
          <animate
            fill="freeze"
            attributeName="strokeDashoffset"
            begin="0.7s"
            dur="0.2s"
            values="6;0"
          ></animate>
        </path>
      </g>
    </svg>
  );
}
