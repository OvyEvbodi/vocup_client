import Image from "next/image";

export default function Home() {
  return (
    <main className="font-inter hero_page min-h-screen">
      <div className="hero_wrap bg-red-300 py-[2rem] min-h-screen flex flex-col w-[90vw] lg:w-[76vw] mx-auto justify-between lg:flex-row">
        <div className="bg-blue-300 p-4 h-[45vh] lg:h-[100vh] lg:w-[45vw]">
          left
        </div>
        <div className="bg-green-300 p-4 h-[45vh] lg:h-[100vh] lg:w-[45vw]">
          right
        </div>
      </div>
    </main>
  );
}
