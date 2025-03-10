import { assets } from "../assets/asset"


const About = () => {
  return (
    <section className="py-10 sm:p-0 md:py-20 lg:p-0 items-center w-full sm:w-3/4 mx-auto">
        <div className="text-center w-3/4 mx-auto ">
        <h1 className="text-2xl sm:text-3xl font-bold">About <span className="text-[#c300f9]">Moooments!</span></h1>
        </div>

        <div className=" items-center justify-center sm:flex flex-col gap-4 w-full m sm:w-3/4  mx-auto p-3 text-left">
          <p className=" text-gray-700 px-4 font-medium text-base mb-3">Life is made up of moments—big celebrations, small gatherings, and everything in between. These moments connect us, bring us joy, and remind us of the love we share with those around us. At Moooments, we believe that memories aren’t just meant to be captured but shared, celebrated, and cherished together.</p>
          
          <img src={assets.about_img} alt="about-us" className="rounded-lg sm:w-3/4 self-center border border-yellow-700 "/>
          <p></p>

        </div>
         
        <div>
        </div>      
    </section>
  )
}

export default About
