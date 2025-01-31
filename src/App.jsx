
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Footer from "./components/Footer"
import { Routes,Route } from "react-router-dom"
import SignUp from "./admin/SignUp"
import About from "./pages/About"
import Pricing from "./pages/Pricing"
import Blog from "./pages/Blog"
//import { SideMenu } from "./components/Sidemenu.jsx"
import { useState } from "react"
import EventLink from "./pages/EventLink"
import HambugerMenu from "./components/HambugerMenu.jsx"
import ForgetPassword from "./admin/ForgetPassword.jsx"





const App = () => {

  const [isMenu, setIsMenu] = useState(false)
   
  return (
    <div className="container overflow-x-hidden m-auto min-h-screen">
      <Navbar />

      <HambugerMenu  isMenu={isMenu} setIsMenu={setIsMenu}/>
      
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing/>}/>
        <Route path="/blog" element={<Blog />} />
        <Route path="/eventlink" element={<EventLink/>} />
        <Route path="/forgetpassword" element={<ForgetPassword/>} />
      </Routes>
     

      <Footer />  
    </div>
  )
}

export default App
