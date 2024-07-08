import "tailwindcss/tailwind.css";
import Inicio from "./componentes/Inicio";
import {  Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./componentes/login/Login";
import Register from "./componentes/register/Register";
import Header from "./componentes/header/Header";
import Footer from "./componentes/footer/Footer";
import CrearServicio from "./componentes/servicios/CrearServicio";
import MisServicios from './componentes/servicios/MisServicios';
import CrearMascota from "./componentes/mascotas/CrearMascota";
import MisMascotas from "./componentes/mascotas/MisMascotas";
import MiPerfil from "./componentes/miPerfil/MiPerfil";


function App() {
  return (

    <BrowserRouter>
      
        <Routes>

          <Route path="/" element={<Inicio/>} />

          <Route path="/login" element={
            <div>
              <Header/>
                <Login/>
              
              <div className="flex flex-col min-h-screen">
                <Footer/>
              </div>
            </div>
            } />


          <Route path="/registrarse" element={
            <div>
              <Header/>
                <Register/>
              <div className="flex flex-col min-h-screen">
                <Footer/>
              </div>
            </div>

          } />
        
          <Route
          path="/services"
          element={
            <div>
              <Header/>
                <CrearServicio />
              <div className="flex flex-col min-h-screen">
              <Footer/>
              </div>
            </div>
              

          }
          />
          <Route
          path="/mis-servicios"
          element={
            <div>
              <Header/>
                <MisServicios />
              <div className="flex flex-col min-h-screen">
              <Footer/>
              </div>
            </div>
              

          }
          />
          <Route
          path="/pets"
          element={
            <div>
              <Header/>
                <CrearMascota />
              <div className="flex flex-col min-h-screen">
              <Footer/>
              </div>
            </div>
              

          }
          />
          <Route
          path="/mis-mascotas"
          element={
            <div>
              <Header/>
                <MisMascotas />
              <div className="flex flex-col min-h-screen">
              <Footer/>
              </div>
            </div>
              

          }
          />
          <Route
          path="/mi-perfil"
          element={
            <div>
              <Header/>
                <MiPerfil />
              <div className="flex flex-col min-h-screen">
              <Footer/>
              </div>
            </div>
              

          }
          />
        </Routes>
      


    </BrowserRouter>
  );
}

export default App;