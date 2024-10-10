
export default function DefaultButton({title,Mailer,onClick}){

    const SendMail = ()=>{};

    return (
        <button OnPress={Mailer} className="border-2 border-text_blue rounded-full  text-white font-bold py-2 px-4  w-80 h-16 text-2xl flex items-center justify-center transition-colors hover:bg-text_blue hover:drop-shadow-blue-Shadow mobile:w-4/5"onClick={onClick} >
            {title}
        </button>
    )
}