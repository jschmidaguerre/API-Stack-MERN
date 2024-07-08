import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [inputs, setInputs] = useState({ correo: "", contrasena: "" });
  const [mensaje, setMensaje] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { correo, contrasena } = inputs;

  const HandleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (correo !== "" && contrasena !== "") {
      const Usuario = {
        correo,
        contrasena,
      };
      setLoading(true);
      try {
        console.log(Usuario)
        const res = await axios.post("http://localhost:3000/login", Usuario, {
          headers: {
            "Content-type": "application/json",
          }
        });
        const { token, message } = res.data;
        localStorage.setItem('token', token);
        console.log(token)
        setMensaje(message);
        navigate('/');
      } catch (error) {
        console.error(error);
        setMensaje("Correo o contrasena incorrecta");
      }
      setInputs({ correo: "", contrasena: "" });
      setLoading(false);
    }
  };

  return (
    <>
<div>
  <h3 className="py-5 flex justify-center text-4xl font-bold text-blue-500">Bienvenido a la página</h3>
  <h2 className="pb-5 flex justify-center text-2xl text-blue-500">De Inicio de Sesión!</h2>
  
  <form className="flex flex-col items-center  p-5 space-y-5" onSubmit={(e) => onSubmit(e)}>
    <div className="flex flex-col items-center space-y-2">
      <label htmlFor="correo">Correo</label>
      <input
        className="border-2 border-blue-500 rounded px-3 py-1"
        onChange={(e) => HandleChange(e)}
        value={correo}
        name="correo"
        id="correo"
        type="email"
        placeholder="Correo..."
        autoComplete="off"
      />
    </div>

    <div className="flex flex-col items-center space-y-2">
      <label htmlFor="contrasena">Contraseña</label>
      <input
        className="border-2 border-blue-500 rounded px-3 py-1"
        onChange={(e) => HandleChange(e)}
        value={contrasena}
        name="contrasena"
        id="contrasena"
        type="password"
        placeholder="Contraseña..."
        autoComplete="off"
      />
    </div>

    <button
      className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 transition duration-300"
      type="submit"
    >
      {loading ? "Cargando..." : "Iniciar Sesión"}
    </button>

    <p className="text-blue-500">
      ¿Aún no tienes cuenta?{" "}
      <b className="cursor-pointer hover:underline" onClick={() => navigate("/registrarse")}>¡Regístrate!</b>
    </p>
  </form>

  {mensaje && <div className="mt-5 text-center text-blue-500">{mensaje}</div>}
</div>

    </>
  );
};

export default Login;