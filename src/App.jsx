
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Footer from "./components/Footer"
import { Routes,Route } from "react-router-dom"
import SignUp from "./admin/SignUp"
import About from "./pages/About"
import Pricing from "./pages/Pricing"
import Blog from "./pages/Blog"




const App = () => {

   
  return (
    <div className="container overflow-x-hidden m-auto">
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing/>}/>
        <Route path="/blog" element={<Blog />} />
      </Routes>
     

      <Footer />  
    </div>
  )
}

export default App
