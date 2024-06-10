import React from 'react'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'
import win from '@/assets/win1.gif'
import loose from '@/assets/looser2.gif'
import tie from '@/assets/tie1.gif'

 const  Congrats = ({winner}) => {
  const { width, height } = useWindowSize()
  
  return (
    <>

<div className="fixed inset-0 z-[-1] overflow-hidden ">
      <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm" />
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={winner =='X'? win : winner =='O'? loose : tie }
          alt="Background"
          width={1920}
          height={1080}
          className="w-50 h-50 max-w-none object-cover"
        />
      </div>
    </div>
    {
        winner =='X' &&
    <Confetti
      width={width}
      height={height}
    />
    }
    </>
  )
    
  
}

export default Congrats