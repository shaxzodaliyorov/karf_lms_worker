import { Button } from "@/common";

export const HomePage = () => {
  return (
    <section className="h-screen relative">
      <div className="container h-full flex justify-between">
        <div className="w-1/2 h-full pt-10 flex flex-col gap-y-4 justify-center items-start ">
          <h1 className="font-bold text-[77.67px] leading-[100%] tracking-[0%]">
            Employment management <span className="!text-[#06128f]">For</span>{" "}
            Foreigners
          </h1>
          <p className="font-normal text-base leading-6 tracking-[0%] text-gray-800">
            The maintenance industry, which is experiencing a shortage of
            manpower in sheet metal and painting work that requires skilled
            technology, is demanding the introduction of foreign professional
            technicians (E-7 visas), and the government…
          </p>
          <Button>Lorem more</Button>
          <div className="w-[480px] flex flex-col justify-between py-5 px-[26px] h-56 bg-gradient-to-br from-neutral-300/10 to-neutral-500/10 rounded-xl border-2 border-black/5 backdrop-blur-[10px]">
            <div className="w-52 h-[3px] relative rounded-[20px]">
              <div className="w-16 h-[3px] left-0 top-0 absolute bg-neutral-400 rounded-[20px]" />
              <div className="w-16 h-[3px] left-[70px] top-0 absolute bg-zinc-300 rounded-[20px]" />
              <div className="w-16 h-[3px] left-[140px] top-0 absolute bg-zinc-300 rounded-[20px]" />
            </div>
            <div className="justify-start text-black text-base font-normal font-['Inter'] leading-normal">
              {">"} 외국인 고용 사업쑤 모집 공고
              <br />• 제1기 외국인(태국 / 50) 고용 사업주 모집안내(-2025.6.30)
              <br />
              제2기 외국인(중국 / 70) 고용 사업주 모집안내(-2025.7.30) 외국인
              근로자 모집 공고
              <br />• 제1기 외국인(태국 / 50) 근로자 모집안내(-2025.6.30)
              <br />• 제2기 외국인(중국 / 70) 근로자 모집안내(-2025.7.30)
            </div>
          </div>
        </div>
      </div>
      <img
        src="/images/hero-img.png"
        className="absolute top-0 z-[-1] w-full h-full"
      />
    </section>
  );
};
