import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [inputs, setInputs] = useState({
    correo: "",
    nombre: "",
    contrasena: "",
  });
  const [mensaje, setMensaje] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { nombre, contrasena, correo } = inputs;

  const HandleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (nombre !== "" && contrasena !== "" && correo !== "") {
      const Usuario = {
        nombre,
        correo,
        contrasena,
      };
      setLoading(true);
      await axios
        .post("http://localhost:3000/registrarse", Usuario)
        .then((res) => {
          const { data } = res;
          setMensaje(data.mensaje);
          setInputs({ nombre: "", contrasena: "", correo: "" });
          setTimeout(() => {
            setMensaje("");
            navigate("/login");
          }, 1500);
        })
        .catch((error) => {
          console.error(error);
          setMensaje("Hubo un error");
          setTimeout(() => {
            setMensaje("");
          }, 1500);
        });

      setLoading(false);
    }
  };

  return (
<div>
<h3 className="py-5 flex justify-center text-4xl font-bold text-blue-500">Bienvenido a la página</h3>
<h2 className="pb-5 flex justify-center text-2xl text-blue-500">De Registro!</h2>

  <form className="flex flex-col items-center p-5 space-y-5" onSubmit={(e) => onSubmit(e)}>
    <div className="flex flex-col items-center space-y-2">
      <label htmlFor="nombre">Nombre</label>
      <input
        className="border-2 border-blue-500 rounded px-3 py-1"
        onChange={(e) => HandleChange(e)}
        value={nombre}
        name="nombre"
        id="nombre"
        type="text"
        placeholder="Nombre..."
        autoComplete="off"
      />
    </div>

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
      {loading ? "Cargando..." : "Registrarme"}
    </button>

    <p className="text-blue-500">
      ¿Ya tienes una cuenta?{" "}
      <b className="cursor-pointer hover:underline" onClick={() => navigate("/login")}>Inicia Sesión!</b>
    </p>
  </form>

  {mensaje && <div className="mt-5 text-center text-blue-500">{mensaje}</div>}
</div>
  );
};

export default Register;