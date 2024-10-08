import React from 'react'
import DesktopImage from './herobanner.png'
const BannerPrincipal = () => {
  return (
<div>
  <h1 className='bg-blue-200 text-center font-bold py-2 text-blue-400'>
    ¡Bienvenido a nuestro sitio!
  </h1>
  <div
    className='bg-cover h-screen bg-center flex items-center justify-center'
    style={{ backgroundImage: `url(${DesktopImage})` }}
  >
    <h1 className='text-center font-bold text-4xl mb-64'>
      Tu tranquilidad, nuestras manos.
    </h1>
  </div>
</div>

  )
}

export default BannerPrincipal;