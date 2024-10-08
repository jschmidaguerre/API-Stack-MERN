const Footer = () => {
    return (
        <footer className="mt-auto  bg-blue-500 text-white">
            <div>
                <div className="w-full h-1 bg-blue-100 mt-10 mb-10"></div>
            </div>
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left p-4">
                <div className="py-4">
                    <h5 className="font-bold text-lg mb-2">Contacto</h5>
                    <p>WhatsApp:</p>
                    <span>+5491163981028</span>
                    <p>Email:</p>
                    <span>info@pawcare.com</span>
                </div>
                <div className="py-4">
                    <img src="/images/logo2.png" alt="LOGO" className="mx-auto rounded-xl" />
                </div>
                <div className="py-4">
                    <h5 className="font-bold text-lg mb-2">Más información</h5>
                    <p>Sobre nosotros</p>
                    <p>Ayuda</p>
                    <p>Conviértete en Sitter</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
