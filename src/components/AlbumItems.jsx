import PropTypes from 'prop-types';
const AlbumItems = ({linkRef, handleCopyLink, currentUrl, button, title}) => {
  return (
    <div>
      <div className="text-center space-y-6">
                    <h1 className="text-3xl md:text-4xl font-bold text-zinc-900">
                        {title}
                    </h1>
                    <p className="text-zinc-700">
                        Copy this link or Download the QR code below to invite attendees to contribute their photos.
                    </p>

                    <div className="mt-8 space-y-4">
                        <div className="flex flex-col md:flex-row gap-3">
                            <div className="relative flex-grow">
                                <label htmlFor="album-link" className="absolute -top-6 left-0 text-xs text-zinc-500">
                                    *Your Event QR Code
                                </label>
                                <input
                                    id="album-link"
                                    ref={linkRef}
                                    type="text"
                                    value={`${currentUrl}`}
                                    readOnly
                                    className="w-full px-4 py-3 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                            <button 
                                onClick={handleCopyLink} 
                                className="bg-violet-600 p-3 hover:bg-violet-700 text-white md:w-auto font-bold rounded-lg cursor-pointer"
                            >
                               {button}
                            </button>
                        </div>

                        <div className="bg-gray-100 p-6 rounded-lg mt-8">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="space-y-2 text-left">
                                    <p className="font-medium text-zinc-800">
                                        Download and Share this QR code at your event for quick and easy access.
                                    </p>
                                </div>
                                <div className="flex flex-col items-center gap-4">
                                    <div className="border-4 border-black p-1 bg-white inline-block">
                                        <img
                                            src={"/placeholder.svg?height=150&width=150"}
                                            alt="QR Code"
                                            width={150}
                                            height={150}
                                            className="h-[150px] w-[150px]"
                                        />
                                    </div>
                                    <button className="border-zinc-300">
                                        Download QR Code
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    </div>
  )
}

AlbumItems.propTypes = {
  title: PropTypes.string.isRequired,
  linkRef: PropTypes.object.isRequired,
  handleCopyLink: PropTypes.func.isRequired,
  currentUrl: PropTypes.string.isRequired, // Add validation for currentUrl
  button: PropTypes.string.isRequired,
};

export default AlbumItems
