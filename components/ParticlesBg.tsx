"use client"

import Particles from "@tsparticles/react"

export default function ParticlesBg(){

 return(

  <Particles
   options={{
    particles:{
     number:{value:50},
     move:{enable:true},
     size:{value:2}
    }
   }}
  />

 )

}