import Image from 'next/image';
import heroImg from '@/public/assets/hero_img.png';

export default function Home() {
  return (
    <main className="font-inter hero_page min-h-screen relative">
      <div className="hero_wrap min-h-screen flex flex-col w-[90vw] lg:w-[100vw] mx-auto justify-between lg:flex-row">
        <div className="left p-[0.5rem] lg:p-6 h-[50vh] lg:h-[100vh] lg:w-[50vw] flex flex-col items-start justify-center gap-[1rem]">
          <div className="hero_heading">
            <h1 className="text-3xl/8 font-extrabold p-2 text-dark_text">Accelerate your learning by learning <span className="text-pink">1 word a day</span></h1>
          </div>
          <div className=" hero_description">
            <p className="text-faint_text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut aliquam lorem.
              Fusce tempor viverra massa.
            </p>
          </div>
          <button className="bg-purple text-light_text hero_button p-2 rounded-sm font-bold text-lg">
            Start learning
          </button>
        </div>
        <div className="right p-[1rem] lg:p-4 h-[50vh] lg:h-[100vh] lg:w-[50vw] flex lg:items-center lg:justify-center">
          <div className="">
            <Image
              src={heroImg}
              alt="hero image showing books and a desktop"
              width={700}
              height={700}
            />
          </div>
        </div>
      </div>
      <div className="bg-pink w-[200px] h-[200px] lg:w-[400px] lg:h-[400px] rounded-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[-100] blur-2xl"></div>
    </main>
  );
}
