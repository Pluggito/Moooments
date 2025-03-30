import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Footer from "./components/Footer"
import { Routes,Route} from "react-router-dom"
import SignUp from "./admin/SignUp"
import About from "./pages/About"
import Pricing from "./pages/Pricing"
import Blog from "./pages/Blog"
//import { SideMenu } from "./components/Sidemenu.jsx"
import { useState } from "react"
import EventLink from "./pages/EventLink"
import ForgetPassword from "./admin/ForgetPassword.jsx"
import CreateAlbum from "./pages/CreateAlbum.jsx"
import Preview from "./pages/Preview.jsx"
import Dashboard from "./admin/Dashboard.jsx"
import NextPhase from "./pages/NextPhase.jsx"
import AddPhotos from "./pages/AddPhotos.jsx"
import { ToastContainer } from "react-toastify"
import Albums from "./pages/Albums.jsx"





const App = () => {

  const [isMenu, setIsMenu] = useState(false)
   
  return (
    <main className={`
      container relative overflow-x-hidden mx-auto px-3 md:px-10 lg:px-[100px] 
    `}>
      <Navbar isMenu={isMenu} setIsMenu={setIsMenu}/>
      <ToastContainer/>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing/>}/>
        <Route path="/blog" element={<Blog />} />
        <Route path="/eventlink" element={<EventLink/>} />
        <Route path="/forgetpassword" element={<ForgetPassword/>} />
        <Route path="/create-album" element={<CreateAlbum/>}/>
        <Route path="/preview" element={<Preview/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/nextphase" element={<NextPhase/>}/>
        <Route path='/add-to-album' element={<AddPhotos/>}/>
        <Route path='/album/:albumId' element={<Albums/>}/>
      </Routes>
     

      <Footer /> 
     
    </main>
  )
}

export default App
