// import { FaGoogle } from "react-icons/fa";
// import { MdOutlineMailOutline } from "react-icons/md";
// const Signin = () => {
//   return (
//     <>
//       <div className="h-[100vh] bg-dirtWhite flex justify-center items-center ">
//         <div className="flex flex-col items-center  border rounded-md bg-white h-[90vh] w-[80vh]">
//           <div className="mt-6 text-3xl font-poppins font-medium">
//             <h2>Welcome Back </h2>
//           </div>
//           <div className="flex justify-around border border-black rounded-full h-10 w-[50vh]   mt-28 mx-6">
//             <div className="mt-1 " >
//               <h3 className="font-medium">Sign in with Google</h3>
//             </div>
//             <div className="mt-1"><FaGoogle size={32}/></div>
//           </div>
//           <div className="flex justify-around border border-black rounded-full h-10 w-[50vh]  mt-4 mx-36">
//             <div className="mt-1 " >
//               <h3 className="font-medium">Sign in with Email</h3>
//             </div>
//             <div className="mt-1"><MdOutlineMailOutline size={32}/></div>
//           </div>
//           <div className="mt-10"><span className="font-medium">No account? </span><span className="text-green-700 font-semibold">Create one</span>
//           </div>
//           <div className="mt-10 mx-auto">
//             <p className="text-xs font-light">Forgot email or trouble signing in? Get help.</p>
//         </div>
//         <div className="mt-10 mx-6">
//             <p className="font-normal text-xs">Click “Sign in” to agree to Voyage Terms of Service and acknowledge that Voyage Privacy Policy applies to you.</p>
//         </div>
//         </div>
        
//       </div>
//     </>
//   );
// };

// export default Signin;
import { FaGoogle } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate=useNavigate()
  return (
    <div className="min-h-screen bg-dirtWhite flex justify-center items-center">
      <div className="flex flex-col items-center border rounded-md bg-white h-[80vh] w-full max-w-md p-6 ">
        <h2 className="text-3xl font-poppins font-medium mb-6">Join Our Voyage</h2>

        <button className="flex justify-center items-center border border-black rounded-full h-10 w-full max-w-sm px-4 mb-4 mt-10">
          <span className="font-medium mr-2">Sign up with Google</span>
          <FaGoogle size={32} />
        </button>

        <button onClick={()=>navigate('/signup/email')} className="flex justify-center items-center border border-black rounded-full h-10 w-full max-w-sm px-4 mb-4">
          <span className="font-medium mr-2">Sign up with Email</span>
          <MdOutlineMailOutline size={32} />
        </button>

        <div className="mt-10">
          <span className="font-medium">Already have a account ? </span>
          <span onClick={()=>navigate('/signin')} className="text-green-700 font-semibold cursor-pointer">Sign in</span>
        </div>

        <div className="mt-8 text-xs font-light">Forgot email or trouble signing in? Get help.</div>

        <div className="mt-20 text-xs font-light">
          Click “Sign in” to agree to Voyage Terms of Service and acknowledge that Voyage Privacy Policy applies to you.
        </div>
      </div>
    </div>
  );
};

export default Signup;
