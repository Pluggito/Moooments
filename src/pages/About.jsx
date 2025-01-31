import { assets } from "../assets/asset"


const About = () => {
  return (
    <div className=" items-center mx-auto max-w-4xl p-2 my-5 sm:my-6 md:my-6 ">
        <div className="text-center w-1/2 mx-auto ">
        <h1 className="text-3xl font-bold">About <span className="text-[#c300f9]">Moooments!</span></h1>
        </div>

        <div className=" items-center justify-center sm:flex flex-col gap-4 w-full mx-auto p-3 ">
          <p className=" w-full text-gray-700 px-4 font-medium">Life is made up of moments—big celebrations, small gatherings, and everything in between. These moments connect us, bring us joy, and remind us of the love we share with those around us. At Moooments, we believe that memories aren’t just meant to be captured but shared, celebrated, and cherished together.</p>
          <img src={assets.about_img} alt="about-us" className="rounded-lg w-3/4 mt-4"/>
          <p></p>

        </div>
         
        <div>
        </div>      
    </div>
  )
}

export default About
