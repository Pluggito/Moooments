



const Footer = () => {
  return (
    <div className="flex flex-col justify-center items-center text-center mx-auto absolute left-0 right-0 bottom-3 w-auto p-2">
        {/*--- first section---- */}
        <div>
            <p className="text-lg">Want to share more memories? Keep uploading!</p>
        </div>

        {/*-----second section---- */}
        <div>
            <ul className="flex flex-row items-center justify-between gap-2 text-gray-600">
                <p className="cursor-pointer">Privacy Policy</p>
                <div className="w-0.5 h-3 bg-gray-600"></div>
                <p className="cursor-pointer">Terms of Service</p>
                <div className="w-0.5 h-3 bg-gray-600"></div>
                <p className="cursor-pointer">Cookie Policy</p>
            </ul>

        </div>

        {/*----third section----- */}
        <div>
            <p className="text-gray-500">© Moooments. 2025 </p>
        </div>
      

    </div>
  )
}

export default Footer
