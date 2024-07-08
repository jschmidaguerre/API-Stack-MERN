import { useNavigate } from "react-router-dom";

const Logo = () => {
    const navigate = useNavigate();
    return ( 
    <div className="logo flex justify-start w-full md:w-auto">

        <img src="images/logo.png" alt="Logo"  onClick={() => navigate("/")}
        className="cursor-pointer"/>
        
    </div>
    )
}

export default Logo;