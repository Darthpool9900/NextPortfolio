'use client'
import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link'
import { GithubLogo } from 'phosphor-react';

export default function Carrousel({ Content }) {
    const carrouselRef = useRef(null); // Referência ao contêiner do carrossel
    const [isDragging, setIsDragging] = useState(false); // Estado de arraste
    const [startX, setStartX] = useState(0); // Posição inicial do mouse
    const [scrollLeft, setScrollLeft] = useState(0); // Posição inicial de rolagem

    const handleMouseDown = (e) => {
        setIsDragging(true); // Ativa o arraste
        setStartX(e.pageX - carrouselRef.current.offsetLeft); // Pega a posição inicial do mouse
        setScrollLeft(carrouselRef.current.scrollLeft); // Pega a posição inicial de rolagem
    };

    const handleMouseLeave = () => {
        setIsDragging(false); // Para o arraste se o mouse sair da área
    };

    const handleMouseUp = () => {
        setIsDragging(false); // Para o arraste quando o mouse é solto
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return; // Se não está arrastando, não faz nada
        e.preventDefault(); // Previne comportamentos padrão indesejados
        const x = e.pageX - carrouselRef.current.offsetLeft; // Posição atual do mouse
        const walk = (startX - x) * 2; // Inverte o cálculo para corrigir a direção
        carrouselRef.current.scrollLeft = scrollLeft + walk; // Ajusta a rolagem
    };

    return (
        <div 
            ref={carrouselRef} // Referência do contêiner
            onMouseDown={handleMouseDown} // Evento de pressionar o mouse
            onMouseLeave={handleMouseLeave} // Evento de sair da área
            onMouseUp={handleMouseUp} // Evento de soltar o mouse
            onMouseMove={handleMouseMove} // Evento de mover o mouse
            className="w-full h-[300px] flex items-center justify-start overflow-x-scroll overflow-y-hidden snap-x snap-mandatory cursor-grab scrollbar-hide mobile:space-y-6" // Estilo do contêiner
            style={{
                cursor: isDragging ? 'grabbing' : 'grab' // Muda o cursor durante o arraste
            }}
        >
            {Content.map((content, index) => (
                <div 
                    key={index} 
                    className="min-w-[25%] h-auto flex items-center justify-center flex-col  snap-center scrollbar-hide mobile:min-w-[100%] hover:scale-105 transition-transform" // Estilo do item
                >
                    {content.thumb!=null?
                    <Image
                        src={content.thumb} // Caminho correto da imagem
                        alt="Imagem do carrossel"
                        width={400} // Largura desejada
                        height={400} // Altura desejada
                        objectFit="cover" // Mantém o aspecto da imagem
                        className="h-[200px] selector" // Estilo da imagem
                        onContextMenu={(e) => e.preventDefault()} 
                    />
                    : 
                    <div className="w-[400px] h-[200px] flex items-center justify-center  bg-text_blue m-2 hover:drop-shadow-blue-Shadow transition-shadow">
                        <GithubLogo size={64} weight="fill" className="text-white" />
                    </div>

}
                    <a href={content.link} className={"text-2xl text-white h-[80px]"}>{content.title}</a>

                </div>
            ))}
        </div>
    );
}