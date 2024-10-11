'use client';
import { useState } from "react";
import axios from "axios"; // Certifique-se de importar axios
import DefaultButton from "../buttons/DefaultButton";

export default function DefaultForm() {
    const [formData, setData] = useState({
        name: "",
        message: ""
    });
    const [showErrorPopup, setShowErrorPopup] = useState(false); // Estado para gerenciar o pop-up de erro
    const [showSuccessPopup, setShowSuccessPopup] = useState(false); // Estado para gerenciar o pop-up de sucesso

    // Função para validar o e-mail
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const SendMail = async () => {
        console.log(formData); // Para depuração, se necessário

        // Validação do e-mail
        if (!validateEmail(formData.name)) {
            setShowErrorPopup(true); // Exibe o pop-up de erro se o e-mail for inválido
            setShowSuccessPopup(false); // Certifica-se de que o pop-up de sucesso não está visível
            return; // Não continua com o envio
        }
        
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
            resetForm(); // Reseta o formulário
            setShowSuccessPopup(true); // Exibe o pop-up de sucesso
            setShowErrorPopup(false); // Certifica-se de que o pop-up de erro não está visível
        } catch (error) {
            console.error("Error sending email:", error);
        }
    };

    const resetForm = () => {
        setData({ name: "", message: "" }); // Reseta os dados do formulário
        setShowErrorPopup(false); // Reseta o pop-up de erro
        setShowSuccessPopup(false); // Reseta o pop-up de sucesso
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Impede o recarregamento da página
        SendMail(); // Chama a função para enviar o e-mail
    };

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setData({ ...formData, name: newEmail });

        // Verifica se o novo e-mail é válido e oculta o pop-up de erro
        if (validateEmail(newEmail)) {
            setShowErrorPopup(false); // Oculta a mensagem de erro se o e-mail for válido
        }
    };

    return (
        <form className="w-full h-auto flex items-center justify-center space-y-14 flex-col text-white" onSubmit={handleSubmit}>
            <input
                type="text"
                className="w-2/4 h-16 border-2 border-b-text_blue border-transparent px-2 bg-transparent text-2xl tablet:w-4/5"
                placeholder="Your best email"
                value={formData.name}
                onChange={handleEmailChange} // Chama a nova função de manipulação de e-mail
            />
            <textarea
                className="w-2/4 h-64 border-2 border-text_blue bg-transparent px-2 text-2xl tablet:w-4/5"
                placeholder="Message"
                value={formData.message}
                onChange={(e) => setData({ ...formData, message: e.target.value })}
            />
            <DefaultButton title={"Send"} Mailer={true} onClick={handleSubmit} />

            {showErrorPopup && ( // Exibe o pop-up de erro se necessário
                <div className="text-red-500 mt-4">
                    Invalid email address. Please enter a valid email.
                </div>
            )}

            {showSuccessPopup && ( // Exibe o pop-up de sucesso se necessário
                <div className="text-green-500 mt-4">
                    Message sent successfully!
                </div>
            )}
        </form>
    );
}
