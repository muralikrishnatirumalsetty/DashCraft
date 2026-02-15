import { useEffect } from "react";

export default function Toast({ msg, type = "success", onClose }) {

  useEffect(() => {
    const t = setTimeout(onClose, 2500);
    return () => clearTimeout(t);
  }, [onClose]);

  const color =
    type === "success"
      ? "bg-green-500"
      : "bg-red-500";

  return (
    <div className="fixed top-6 right-6 z-50 animate-slide">

      <div
        className={`${color} text-white px-5 py-3 rounded-xl shadow-xl min-w-[220px]`}
      >
        {msg}
      </div>

      <style>
        {`
          .animate-slide {
            animation: slide .3s ease;
          }
          @keyframes slide {
            from { transform: translateX(100%); opacity:0 }
            to { transform: translateX(0); opacity:1 }
          }
        `}
      </style>
    </div>
  );
}
