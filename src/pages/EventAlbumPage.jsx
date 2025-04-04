import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageLoader from "../components/PageLoader";
import { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types'

const EventAlbumPage = ({ loading, setLoading }) => {
    const [currentUrl, setCurrentUrl] = useState("");
    const navigate = useNavigate();
    const linkRef = useRef(null);

    useEffect(() => {
        setCurrentUrl(window.location.href);
    }, []);

    const handleCopyLink = () => {
        if (linkRef.current) {
            navigator.clipboard.writeText(linkRef.current.value);
        }
    };

    const handleNavigation = () => {
        setLoading(true);
        setTimeout(() => {
            navigate('/dashboard');
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-white p-4 md:p-6">
            {loading && <PageLoader />}
            <div className="max-w-3xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <button onClick={() => navigate('/preview')} className="p-2 rounded-full">
                        <ArrowLeft className="h-5 w-5" />
                        <span className="sr-only">Back</span>
                    </button>
                    <button 
                        onClick={handleNavigation} 
                        className="bg-zinc-900 p-3 rounded font-bold text-white hover:bg-zinc-800"
                    >
                        Go to Dashboard
                    </button>
                </div>

                <div className="text-center space-y-6">
                    <h1 className="text-3xl md:text-4xl font-bold text-zinc-900">
                        Your event album is ready!
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
                                className="bg-violet-600 p-3 hover:bg-violet-700 text-white md:w-auto font-bold rounded-lg"
                            >
                                Copy Link
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
        </div>
    );
};


EventAlbumPage.propTypes = {
    loading: PropTypes.bool.isRequired,
    setLoading: PropTypes.func.isRequired,
  }

export default EventAlbumPage;
