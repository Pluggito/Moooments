import PropTypes from "prop-types";
import QRCode from "react-qr-code";

const AlbumItems = ({
  linkRef,
  handleCopyLink,
  currentUrl,
  button,
  title,
  albumId,
}) => {
  const value = `https://moooments.vercel.app/add-to-album/${albumId}`;

  return (
    <div>
      <div className="text-center space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-zinc-900">
          {title}
        </h1>
        <p className="text-zinc-700">
          Copy this link or Download the QR code below to invite attendees to
          contribute their photos.
        </p>

        <div className="mt-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-grow">
              <label
                htmlFor="album-link"
                className="absolute -top-6 left-0 text-xs text-zinc-500"
              >
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
                  Download and Share this QR code at your event for quick and
                  easy access.
                </p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="border-4 border-black p-1 bg-white inline-block">
                  <QRCode
                    value={value}
                    size={150}
                    bgColor="#ffffff"
                    fgColor="#000000"
                    level="H"
                    includeMargin={true} // <- Valid prop for 'react-qr-code'
                  />
                </div>

                <button
                  className="text-sm font-semibold px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700"
                  onClick={() => {
                    const canvas = document.querySelector("canvas");
                    const pngUrl = canvas
                      .toDataURL("image/png")
                      .replace("image/png", "image/octet-stream");
                    const downloadLink = document.createElement("a");
                    downloadLink.href = pngUrl;
                    downloadLink.download = "moooment-qr.png";
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                  }}
                >
                  Download QR Code
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

AlbumItems.propTypes = {
  title: PropTypes.string.isRequired,
  linkRef: PropTypes.object.isRequired,
  handleCopyLink: PropTypes.func.isRequired,
  currentUrl: PropTypes.string.isRequired,
  button: PropTypes.string.isRequired,
  albumId: PropTypes.string.isRequired,
};

export default AlbumItems;
