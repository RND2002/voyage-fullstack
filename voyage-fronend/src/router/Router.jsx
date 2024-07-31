import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Signup from "../component/Signup"
import Signin from "../component/Signin"
import MainPage from "../pages/MainPage"
import SignupEmail from "../component/SignupEmail"
import SigninEmail from "../component/SigninEmail"
import UserProfile from "../component/UserProfile"
import AuthProvider, { useAuth } from "../auth/AuthContext"
import Feeds from "../component/Feeds"
import AuthenticatedNavbar from "../component/AuthenticatedNavbar"
import PostRequest from "../component/PostRequest"
import SinglePostView from "../pages/SinglePostView"
import SavedPosts from "../component/SavedPosts"


 
const Router = () => {
  function AuthenticatedRoute({children}) {
    const authContext = useAuth()
    
    if(authContext.isAuthenticated)
        return children

    return <Navigate to="/" />
}
  return (
    <div>
      <AuthProvider>
      
        <BrowserRouter>
       <Routes>
       
        
       <Route path="/" Component={MainPage}/>
        <Route path ='/signup' Component={Signup}/>
        <Route path ='/signin' Component={Signin}/>
        <Route path ='/signup/email' Component={SignupEmail}/>
        <Route path ='/signin/email' Component={SigninEmail}/>
        <Route path ='/profile' element={<AuthenticatedRoute><UserProfile/></AuthenticatedRoute>}/>
        <Route path ='/feeds' element={<AuthenticatedRoute><Feeds/></AuthenticatedRoute>}/>
        <Route path ='/blog/write' element={<AuthenticatedRoute><PostRequest/></AuthenticatedRoute>}/>
        <Route path="/blog/:id" element={<AuthenticatedRoute><SinglePostView/></AuthenticatedRoute>}/>
        <Route path="/bookmark" element={<AuthenticatedRoute><SavedPosts/></AuthenticatedRoute>}/>
       </Routes>
       </BrowserRouter>
       </AuthProvider>
    </div>
  )
}

export default Router