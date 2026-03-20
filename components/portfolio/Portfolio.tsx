import React from 'react'
import CreativePortraits from './CreativePortraits'
import Reels from '../home/Reels'
import Gallery from './Gallery'
import Port from './Port'
import Contact from '../layouts/Contact'


export default function PortfolioPage() {
  const isDarkMode = false;
  return (
   
   <>
    <div>
      {/* <CreativePortraits /> */}
      <Port isDarkMode={isDarkMode} />
      <div className="max-w-[1400px] mx-auto mt-8">
        <Reels isDarkMode={isDarkMode} />
      </div>
      {/* <Gallery /> */}
     
    </div>
     {/* <Contact isDarkMode={isDarkMode}/> */}
   </>
    
  )
}
