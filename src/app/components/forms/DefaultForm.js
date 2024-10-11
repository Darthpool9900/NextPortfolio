'use client';
import { useState } from "react";
import axios from "axios"; // Certifique-se de importar axios
import DefaultButton from "../buttons/DefaultButton";

export default function DefaultForm() {
    const [formData, setData] = useState({
        name: "",
        message: ""
    });

    const SendMail = async () => {
        console.log(formData); // Para depuração, se necessário
        
        // Criação do objeto FormData
        const form = new FormData();
        form.append("name", formData.name);
        form.append("message", formData.message);
        
        try {
            const result = await axios.post("/api/mailerapi", form, {
                headers: {
                    "Content-Type": "multipart/form-data" // Definindo o tipo de conteúdo
                }
            });
            console.log(result.data);
        } catch (error) {
            console.error("Error sending email:", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Impede o recarregamento da página
        SendMail(); // Chama a função para enviar o e-mail
    };

    return (
        <form className="w-full h-auto flex items-center justify-center space-y-14 flex-col text-white" onSubmit={handleSubmit}>
            <input
                type="text"
                className="w-2/4 h-16 border-2 border-b-text_blue border-transparent px-2 bg-transparent text-2xl mobile:w-4/5"
                placeholder="Your best email"
                value={formData.name}
                onChange={(e) => setData({ ...formData, name: e.target.value })}
            />
            <textarea
                className="w-2/4 h-64 border-2 border-text_blue bg-transparent px-2 text-2xl mobile:w-4/5"
                placeholder="Message"
                value={formData.message}
                onChange={(e) => setData({ ...formData, message: e.target.value })}
            />
            <DefaultButton title={"Send"} Mailer={handleSubmit} />
        </form>
    );
}
