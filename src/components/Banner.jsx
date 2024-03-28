import React from 'react'

function Banner() {
  return (
    <div className='h-[20vh] md:h-[75vh] bg-cover bg-center flex items-end ' style={{backgroundImage:'url(https://www.wallpaperflare.com/static/799/606/361/movies-hangover-part-ii-collage-three-wallpaper-preview.jpg)'}}>
        <div className='text-white text-3xl bg-gray-900/60 text-center w-full p-4'>Hangover</div>
    </div>
  )
}

export default Banner