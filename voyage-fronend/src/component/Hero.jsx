

// const Hero = () => {
//   return (
//     <>
//     <div className="h-[1.5px] bg-white"></div>
//     <section className="h-[500px] bg-black">
//         <div className="flex justify-around mx-auto">
//             <div className="flex flex-col">
//             <div className="mt-[20vh] m-3">
//                 <h2 className="text-5xl font-normal font-gt-super font-serif text-white tracking-wider md:text-6xl">Amplify Your</h2>
                
//             </div>
//             <div className="ml-3 md:ml-24 mt-2">
//                 <h2 className="text-5xl font-normal font-Roboto font-serif tracking-wider text-white">Enthusiasm.</h2>
//             </div>
//             <div className="mt-8">
//                 <h5 className=" m-2 text-2xl tracking-wide text-neonGreen">Discover ideas and and share your thoughts with world.</h5>
//             </div>
//             </div>
//             <div>
           
           
//             </div>
//         </div>

//     </section>
//     </>
//   )
// }

// export default Hero
import React from 'react';

const Hero = () => {
  return (
    <>
      <div className="h-[1.5px] bg-white"></div>
      <section className="h-[500px] bg-dirtWhite">
        <div className="flex justify-around mx-auto">
          <div className="flex flex-col">
            <div className="mt-[20vh] m-3">
              <h2 className="text-5xl font-semibold font-poppins text-blacl tracking-wider md:text-6xl">Amplify Your</h2>
            </div>
            <div className="ml-3 md:ml-24 mt-2">
              <h2 className="text-5xl font-semibold font-poppins text-black tracking-wider">Enthusiasm.</h2>
            </div>
            <div className="mt-8">
              <h5 className="m-2 text-2xl font-normal font-poppins text-black tracking-wide">Discover ideas and share your thoughts with the world.</h5>
            </div>
          </div>
          <div>
            {/* Additional content */}
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero;
