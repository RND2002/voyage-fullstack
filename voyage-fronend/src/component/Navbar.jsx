
import { useState } from 'react';
import logo from '../assets/Voyage.png'
import { CgMenuHotdog,CgClose } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import SigninEmail from './SigninEmail';
<style>

</style>
const Navbar = () => {
    const [showNav, setShowNav] = useState(false);
    const authContext=useAuth()
    const navigate=useNavigate()
    const handleNavigateToProfile = () => {
      navigate('/profile');
    };
  return (
    <nav>
    <div className='flex justify-around h-24 bg-mustard '>
        <div className='flex ml-[-40px]'>
            <img className=' top-0 left-0  md:h-24 w-32  cursor-pointer' src={logo} alt='logo'/>
           <span className='hidden md:block'> <h3 className='ml-2 mt-7 cursor-pointer text-dirtWhite font-sans font-gt-super text-4xl font-medium  '>Voyage</h3></span>
        </div>
        <div className='mt-9 block md:hidden'>
        {showNav ? (
            <CgClose 
              className='text-white text-2xl cursor-pointer block'
              size={32} 
              onClick={() => setShowNav(!showNav)}
            />
          ) : (
            <CgMenuHotdog 
              className='text-white text-2xl cursor-pointer'
              size={32} 
              onClick={() => setShowNav(!showNav)} 
            />
          )}
        </div>
        <div className={`${showNav ? 'block' : 'hidden'} md:hidden bg-blue absolute top-24 w-full z-10`}>
           <div className='flex flex-col items-center justify-center sm:items-stretch sm:justify-start'>
           <span className='m-4 text-black font-semibold cursor-pointer'>Our Story</span>
            <span className='m-4 text-black font-semibold cursor-pointer'>Membership</span>
           {authContext.authentication ?  <span className='m-4 text-black font-semibold cursor-pointer'>Write</span>:navigate(`/signin/email`)}
            <span onClick={()=>navigate('/signin')} className='m-4 text-black font-semibold cursor-pointer'>Sign in</span>
        

           </div>
        </div>
        <div className=' mt-8 hidden md:block'>
            <span className='m-4 text-black font-semibold cursor-pointer'>Our Story</span>
            <span className='m-4 text-black font-semibold cursor-pointer'>Membership</span>
            {authContext.authentication ?  <span className='m-4 text-dirtWhite font-semibold cursor-pointer'>Write</span>:navigate(`/signin/email`)}
            {authContext.authentication ? <span onClick={handleNavigateToProfile} className='m-4 text-dirtWhite font-semibold cursor-pointer'>Profile</span>:navigate(`signin/email`)}
            <span  className='m-4 ml-6 top-0 right-0  font-semibold cursor-pointer'>
  <button type='button' onClick={()=>navigate('/signin')} className='bg-white text-black  rounded-full px-4 py-2'>
    Get Started
  </button>
</span>

        </div>
    </div>
    </nav>
  )
}

export default Navbar