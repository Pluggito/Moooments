import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Footer from "./components/Footer"
import { Routes,Route} from "react-router-dom"
import SignUp from "./admin/SignUp"
import About from "./pages/About"
import Pricing from "./pages/Pricing"
import Blog from "./pages/Blog"
import { useState } from "react"
import EventLink from "./pages/EventLink"
import ForgetPassword from "./admin/ForgetPassword.jsx"
import CreateAlbum from "./pages/CreateAlbum.jsx"
import Preview from "./pages/Preview.jsx"
import Dashboard from "./admin/Dashboard.jsx"
import AddPhotos from "./pages/AddPhotos.jsx"
import { ToastContainer } from "react-toastify"
import Albums from "./pages/Albums.jsx"
import EventAlbumPage from "./pages/EventAlbumPage.jsx"





const App = () => {

  const [isMenu, setIsMenu] = useState(false)
  const [loading, setLoading] = useState(false);
   
  return (
    <main className={`
      container relative overflow-x-hidden mx-auto px-3 md:px-10 lg:px-[100px] 
    `}>
      <Navbar isMenu={isMenu} setIsMenu={setIsMenu} loading={loading} setLoading={setLoading}/>
      <ToastContainer/>

      <Routes>
        <Route path="/" element={<Home loading={loading} setLoading={setLoading} />} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing/>}/>
        <Route path="/blog" element={<Blog />} />
        <Route path="/eventlink" element={<EventLink loading={loading} setLoading={setLoading}/>} />
        <Route path="/forgetpassword" element={<ForgetPassword/>} />
        <Route path="/create-album" element={<CreateAlbum loading={loading} setLoading={setLoading} />} />
        <Route path="/preview" element={<Preview loading={loading} setLoading={setLoading} />} />
        <Route path="/dashboard" element={<Dashboard loading={loading} setLoading={setLoading} />} />
        <Route path='/add-to-album/:albumId' element={<AddPhotos loading={loading} setLoading={setLoading}/>}/>
        <Route path="/event-album-page" element={<EventAlbumPage loading={loading} setLoading={setLoading} />} />
        <Route path='/album/:albumId' element={<Albums loading={loading} setLoading={setLoading}/>}/>
      </Routes>
     

      <Footer /> 
     
    </main>
  )
}

export default App