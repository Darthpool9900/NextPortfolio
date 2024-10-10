'use client'
import { useRef } from "react"; // Importa useRef
import Image from "next/image";
import DefaultButton from "./components/buttons/DefaultButton";
import DefaultForm from "./components/forms/DefaultForm";
import Carrousel from "./components/Carrousell/Carrousel";
import profile from "../public/profile.jpeg";
import candycity from "../public/images/Games/candycity.jpeg";
import caribeantycoon from "../public/images/Games/caribeantycoon.jpeg";
import fnaf_thumb from "../public/images/Games/fnaf_thumb.png";
import mickeybackrooms_thumbv2 from "../public/images/Games/mickeybackrooms_thumbv2.png";
import mrbeast from "../public/images/Games/mrbeast.jpeg";
import GTA_TYCOON_THUMB from "../public/images/Games/GTA_TYCOON_THUMB.png";

export default function Home() {
  const contactRef = useRef(null); // Cria uma referência para o formulário de contato

  // Função para rolar suavemente até a seção de contato
  const handleScrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full h-auto">
      {/* Seção inicial */}
      <div className="w-full h-dvh bg-blue_bg flex items-center justify-center">
        <div className="w-full h-auto flex items-center justify-center space-y-6 flex-col">
          <h1 className="text-8xl text-text_blue drop-shadow-blue-Shadow sm:text-6xl mobile:text-4xl">
            Hi I’m a developer
          </h1>
          <p className="text-center text-white text-2xl mobile:text-lg">
            Nice to meet you, please sit down and see my stories or make contact
          </p>
          {/* Adiciona a função de rolagem suave no clique */}
          <DefaultButton title={"Contact"} onClick={handleScrollToContact} />
        </div>
      </div>

      {/* Seção "Who I Am?" */}
      <div className="w-full h-auto bg-slate-200 flex items-center justify-center space-y-32 flex-col py-12">
        <div className="w-4/5 h-full flex flex-row items-center justify-center space-x-24 tablet:flex-col tablet:space-x-0 tablet:space-y-8 mobile:space-y-8 mobile:space-x-0">
          <div className="w-1/2 h-full space-y-8 tablet:w-full tablet:text-center">
            <h1 className="text-5xl text-left tablet:text-center">Who I Am?</h1>
            <p className="text-left text-2xl tablet:text-center">
              I am a computer engineering student. I started my studies and began making software in 2020. Initially, I just wrote C programs with simple algorithms, but today I can code entire systems or game engines, and I’m very proud of this.
            </p>
          </div>
          <div className="w-1/2 h-full bg-black tablet:w-full rounded-2xl flex justify-center">
            <Image
              src={profile}
              alt="Developer"
              objectFit="cover"
              className="rounded-2xl"
            ></Image>
          </div>
        </div>

        {/* Seção "A bit of my journey" */}
        <div className="w-4/5 h-full flex items-center flex-row justify-center space-x-24 tablet:flex-col tablet:space-x-0 tablet:space-y-8 mobile:space-y-8 mobile:space-x-0">
          <div className="w-1/2 h-auto flex items-center justify-center tablet:w-full">
            <Image
              src={GTA_TYCOON_THUMB}
              alt="Work"
              objectFit="cover"
              width={500}
              height={500}
            ></Image>
          </div>
          <div className="w-1/2 h-full space-y-8 tablet:w-full tablet:text-center">
            <h1 className="text-5xl text-left tablet:text-center">A bit of my journey</h1>
            <p className="text-left text-2xl tablet:text-center">
              As I said, I started my studies at university in 2020, but I got my first job as a developer at Enki Games in 2023. My first system was developed for my uncle&s storage business. But every story has a beginning, and mine is just starting.
            </p>
          </div>
        </div>
      </div>

      {/* Seção de Games */}
      <div className="w-full h-dvh bg-blue_bg flex items-center justify-center flex-col space-y-12">
        <h2 className="text-8xl text-text_blue drop-shadow-blue-Shadow sm:text-6xl mobile:text-4xl">
          Games that I work on
        </h2>
        <Carrousel
          Content={[
            { thumb: mickeybackrooms_thumbv2, link: 'https://fortnite.gg/island?code=8722-9506-6129', title: 'Mickey Backrooms' },
            { thumb: candycity, link: 'https://fortnite.gg/island?code=2686-1328-2934', title: 'Candy City tycoon' },
            { thumb: caribeantycoon, link: 'https://fortnite.gg/island?code=6782-7020-9184', title: 'Caribbean Tycoon' },
            { thumb: fnaf_thumb, link: 'https://fortnite.gg/island?code=0027-0233-8151', title: 'FNAF: Ultimate Dead by Daylight' },
            { thumb: mrbeast, link: 'https://fortnite.gg/island?code=0238-0299-7524', title: 'MrBeast Crazy Park' }
          ]}
        />
        <h2 className="text-8xl text-text_blue drop-shadow-blue-Shadow sm:text-6xl mobile:text-4xl">
          Systems that I make
        </h2>
        <Carrousel
          Content={[
            { thumb: null, link: 'https://github.com/Darthpool9900/OpenStore/tree/main', title: 'Storage System' }
          ]}
        />
      </div>

      {/* Seção de Contato */}
      <div className="w-full h-dvh bg-blue_bg flex items-center justify-center flex-col space-y-12" ref={contactRef}>
        <h2 className="text-8xl text-text_blue drop-shadow-blue-Shadow sm:text-6xl mobile:text-4xl">
          Contact me
        </h2>
        <DefaultForm />
      </div>
    </div>
  );
}
